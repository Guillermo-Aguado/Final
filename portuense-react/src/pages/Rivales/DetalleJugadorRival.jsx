import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spinner, Container, Button } from "react-bootstrap";

import BackButton from "../../components/BackButton";

export default function DetalleJugadorRival() {
  const { jugadorId } = useParams();
  const [jugador, setJugador] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    fetch(`http://localhost:8000/api/jugadores-rivales/${jugadorId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setJugador(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [jugadorId, token]);

  if (loading) {
    return (
      <Container className="p-4">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!jugador) {
    return (
      <Container className="p-4">
        <p>Jugador no encontrado.</p>
      </Container>
    );
  }

  return (
    <>
      
      <Container className="mt-4">
        <BackButton to={-1} />
        <Card className="shadow-sm">
          <Card.Body>
            <h3>{jugador.nombre}</h3>
            <p><strong>Edad:</strong> {jugador.edad}</p>
            <p><strong>Posición:</strong> {jugador.posicion}</p>
            <p><strong>Club:</strong> {jugador.club_nombre || "N/D"}</p>
            {/* Si el backend devuelve más campos, los puedes mostrar aquí */}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
