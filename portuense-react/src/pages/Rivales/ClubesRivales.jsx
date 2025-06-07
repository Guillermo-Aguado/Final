// src/pages/DireccionDeportiva/ClubesRivales.jsx
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
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://localhost:8000/api/clubes-rivales/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setClubes)
      .catch((err) => console.error("Error al cargar clubes:", err));
  }, [token]);
  const navigate = useNavigate();

  const buscar = async () => {
  setCargando(true);
  const nuevosConteos = {};

  // Recorremos cada club individualmente
  for (const club of clubes) {
    const params = new URLSearchParams({ club: club.id });
    Object.entries(filtros).forEach(([key, val]) => {
      if (val) params.append(key, val);
    });

    try {
      const res = await fetch(
        `http://localhost:8000/api/jugadores-rivales/?${params.toString()}`,
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

  return (
    <>
      <AppHeader />
      <Container className="mt-4">
        <BackButton to="/direccion-deportiva" />
        <h2 className="mb-4">Clubes Rivales</h2>

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
      <ModalJugadoresCoinciden
        show={modalClubId !== null}
        onHide={() => setModalClubId(null)}
        clubId={modalClubId}
        filtros={filtros}
      />
    </>
  );
}
