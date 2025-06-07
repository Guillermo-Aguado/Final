import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { Container, Card, Button, Spinner, Row, Col } from "react-bootstrap";
import AppHeader from "../../components/AppHeader";
import BackButton from "../../components/BackButton";

export default function JugadoresDelClub() {
  const { clubId } = useParams();
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    fetch(`http://localhost:8000/api/jugadores-rivales/?club=${clubId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setJugadores(data);
        setLoading(false);
      });
  }, [clubId, token]);

  return (
    <>
      <AppHeader />
      <Container className="mt-4">
        <BackButton to="/clubes-rivales" />
        <h3 className="mb-4">Jugadores del Club</h3>

        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Row>
            {jugadores.map((jugador) => (
              <Col md={4} key={jugador.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{jugador.nombre}</Card.Title>
                    <Card.Text>
                      <strong>Posición:</strong> {jugador.posicion} <br />
                      <strong>Edad:</strong> {jugador.edad}
                    </Card.Text>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => navigate(`${jugador.id}`)} // navegación relativa
                    >
                      Ver Detalle
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Renderiza el componente DetalleJugadorRival si está en la ruta */}
        <Outlet />
      </Container>
    </>
  );
}
