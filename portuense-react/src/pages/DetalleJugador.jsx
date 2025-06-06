import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import AppHeader from "../components/AppHeader";
import React from "react";
import ModalCarpetasPDFs from "../components/ModalCarpetasPDFs";

export default function DetalleJugador() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jugador, setJugador] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { isInGroup } = useAuth();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    // Obtener jugador
    fetch(`http://portuense-manager.ddns.net:8000/api/jugadores/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJugador(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Obtener comentarios
    fetch(`http://portuense-manager.ddns.net:8000/api/comentarios-jugador/jugador/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setComentarios(data))
      .catch((err) => console.error("Error al obtener comentarios:", err));
  }, [id]);

  if (loading) return <p className="p-4">Cargando datos del jugador...</p>;
  if (!jugador) return <p className="p-4">Jugador no encontrado</p>;

  const nombreCompleto = `${jugador.nombre} ${jugador.p_apellido || ""} ${
    jugador.s_apellido || ""
  }`;
  const esAdmin = isInGroup("admin");
  const esPrimerEquipo = jugador.categoria === "SEN";

  return (
    <>
      <AppHeader />
      <div className="p-4">
        <Button
          variant="outline-secondary"
          size="sm"
          className="mb-3"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </Button>

        <Card
          className="shadow mx-auto"
          style={{ width: "700px", height: "auto" }}
        >
          <Card.Body>
            <div className="d-flex align-items-center mb-4">
              {jugador.imagen ? (
                <img
                  src={jugador.imagen}
                  alt={nombreCompleto}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginRight: "1rem",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundColor: "#eee",
                    borderRadius: "50%",
                    marginRight: "1rem",
                  }}
                />
              )}

              <div>
                <h3 className="mb-1">{nombreCompleto}</h3>
                <p className="mb-0 text-muted">
                  {jugador.categoria} {jugador.subcategoria} - {jugador.equipo}
                </p>
              </div>
            </div>

            {esAdmin && esPrimerEquipo && (
              <Button
                variant="info"
                size="sm"
                className="mb-3"
                onClick={() => navigate(`/jugadores/${jugador.id}/contrato`)}
              >
                Ver Contrato
              </Button>
            )}
            <Button
              variant="dark"
              size="sm"
              onClick={() => setShowModal(true)}
              className="ms-2"
            >
              Ver Documentación
            </Button>

            <p>
              <strong>Posición:</strong> {jugador.posicion}
            </p>
            <p>
              <strong>Edad:</strong> {jugador.edad} años
            </p>

            {jugador.descripcion && (
              <div className="mt-4">
                <h5>Observaciones</h5>
                <p style={{ whiteSpace: "pre-wrap" }}>{jugador.descripcion}</p>
              </div>
            )}

            <hr className="my-4" />

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Comentarios</h5>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() =>
                  navigate(`/jugadores/${jugador.id}/comentario-nuevo`)
                }
              >
                Añadir Comentario
              </Button>
            </div>

            {comentarios.length === 0 ? (
              <p className="text-muted">No hay comentarios todavía.</p>
            ) : (
              comentarios.map((comentario) => (
                <div
                  key={comentario.id}
                  className="mb-3 p-3"
                  style={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #ff1e5630",
                    borderRadius: "8px",
                  }}
                >
                  <h6 className="mb-1" style={{ color: "#ff1e56" }}>
                    {comentario.titulo}
                  </h6>
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {comentario.contenido}
                  </p>
                  <div className="d-flex justify-content-between mt-2">
                    <small style={{ color: "#ff1e56" }}>
                      {new Date(comentario.fecha_creacion).toLocaleString()}
                    </small>
                    <small>
                      <strong>{comentario.autor.username}</strong>
                    </small>
                  </div>
                </div>
              ))
            )}
          </Card.Body>
        </Card>
      </div>
      <ModalCarpetasPDFs
        show={showModal}
        onHide={() => setShowModal(false)}
        jugadorId={jugador.id}
      />
    </>
  );
}
