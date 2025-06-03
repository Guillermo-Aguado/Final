import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth"
import AppHeader from "../components/AppHeader";
import React from 'react';

export default function DetalleJugador() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jugador, setJugador] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isInGroup } = useAuth();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

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
  }, [id]);

  if (loading) return <p className="p-4">Cargando datos del jugador...</p>;
  if (!jugador) return <p className="p-4">Jugador no encontrado</p>;

  const nombreCompleto = `${jugador.nombre} ${jugador.p_apellido || ""} ${jugador.s_apellido || ""}`;
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

      <Card className="shadow mx-auto" style={{ width: "700px", height: "750px" }}>
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
        </Card.Body>
      </Card>
    </div>
    </>
  );
}
