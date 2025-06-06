import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import AppHeader from "../components/AppHeader";
import React from "react";

export default function DireccionDeportiva() {
  const navigate = useNavigate();
  const { isInGroup } = useAuth();

  return (
    <>
      <AppHeader />
      <Container className="mt-4">
        <h2 className="mb-4">Panel Dirección Deportiva</h2>

        <Row className="mt-4">
          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Primer Equipo</Card.Title>
                <Card.Text>Ver carpetas y documentos del Primer Equipo</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate("/direccion-deportiva/primer-equipo")}
                >
                  Acceder
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Academia</Card.Title>
                <Card.Text>Ver carpetas y documentos de la Academia</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate("/direccion-deportiva/academia")}
                >
                  Acceder
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
//TODO: Manejar el autorización de la dirección deportiva, tanto en el UserManager como aquí.
//TODO: 