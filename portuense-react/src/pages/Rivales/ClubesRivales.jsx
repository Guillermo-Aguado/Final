import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalJugadoresCoinciden from "../../components/ModalJugadoresCoinciden";
import {
  Table,
  Button,
  Image,
  Container,
  Form,
  Row,
  Col,
  Spinner,
  Modal,
} from "react-bootstrap";
import AppHeader from "../../components/AppHeader";
import BackButton from "../../components/BackButton";

export default function ClubesRivales() {
  const [clubes, setClubes] = useState([]);
  const [conteos, setConteos] = useState({});
  const [filtros, setFiltros] = useState({
    edad_min: "",
    edad_max: "",
    posicion: "",
  });
  const [modalClubId, setModalClubId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [nuevoClub, setNuevoClub] = useState({
    nombre: "",
    ciudad: "",
    imagen: null,
  });

  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://portuense-manager.ddns.net:8000/api/clubes-rivales/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setClubes)
      .catch((err) => console.error("Error al cargar clubes:", err));
  }, [token]);

  const buscar = async () => {
    setCargando(true);
    const nuevosConteos = {};

    for (const club of clubes) {
      const params = new URLSearchParams({ club: club.id });
      Object.entries(filtros).forEach(([key, val]) => {
        if (val) params.append(key, val);
      });

      try {
        const res = await fetch(
          `http://portuense-manager.ddns.net:8000/api/jugadores-rivales/?${params.toString()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        nuevosConteos[club.id] = data.length;
      } catch (err) {
        console.error(`Error al contar jugadores del club ${club.nombre}`, err);
      }
    }

    setConteos(nuevosConteos);
    setCargando(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateClub = async () => {
    const formData = new FormData();
    formData.append("nombre", nuevoClub.nombre);
    formData.append("ciudad", nuevoClub.ciudad);
    if (nuevoClub.imagen) {
      formData.append("imagen", nuevoClub.imagen);
    }

    try {
      await fetch("http://portuense-manager.ddns.net:8000/api/clubes-rivales/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      setShowCreateModal(false);
      setNuevoClub({ nombre: "", ciudad: "", imagen: null });
      // recargar clubes
      const res = await fetch("http://portuense-manager.ddns.net:8000/api/clubes-rivales/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setClubes(data);
    } catch (err) {
      console.error("Error al crear club:", err);
    }
  };

  return (
    <>
      <AppHeader />
      <Container className="mt-4">
        <BackButton to="/dashboard" />
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Clubes Rivales</h2>
          <Button variant="success" onClick={() => setShowCreateModal(true)}>
            + Crear Club
          </Button>
        </div>

        {/* Filtros */}
        <Form className="mb-4">
          <Row>
            <Col md={2}>
              <Form.Control
                name="edad_min"
                placeholder="Edad mínima"
                type="number"
                value={filtros.edad_min}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Control
                name="edad_max"
                placeholder="Edad máxima"
                type="number"
                value={filtros.edad_max}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                name="posicion"
                placeholder="Posición"
                value={filtros.posicion}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Button onClick={buscar} disabled={cargando}>
                {cargando ? <Spinner size="sm" animation="border" /> : "Buscar"}
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Tabla de clubes */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Escudo</th>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Jugadores que coinciden</th>
              <th>Ver todos</th>
            </tr>
          </thead>
          <tbody>
            {clubes.map((club) => (
              <tr key={club.id}>
                <td>
                  {club.imagen ? (
                    <Image src={club.imagen} width={50} height={50} rounded />
                  ) : (
                    <span>Sin imagen</span>
                  )}
                </td>
                <td>{club.nombre}</td>
                <td>{club.ciudad}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>{conteos[club.id] || 0}</span>
                    {conteos[club.id] > 0 && (
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => setModalClubId(club.id)}
                        className="ms-2"
                      >
                        Mostrar
                      </Button>
                    )}
                  </div>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() =>
                      navigate(`/clubes-rivales/${club.id}/jugadores`)
                    }
                  >
                    Ver Jugadores
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal de creación de club */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo Club</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nuevoClub.nombre}
                onChange={(e) =>
                  setNuevoClub({ ...nuevoClub, nombre: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                value={nuevoClub.ciudad}
                onChange={(e) =>
                  setNuevoClub({ ...nuevoClub, ciudad: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Escudo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNuevoClub({ ...nuevoClub, imagen: e.target.files[0] })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateClub}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalJugadoresCoinciden
        show={modalClubId !== null}
        onHide={() => setModalClubId(null)}
        clubId={modalClubId}
        filtros={filtros}
      />
    </>
  );
}
