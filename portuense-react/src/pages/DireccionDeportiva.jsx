import React from "react";
import AppHeader from "../components/AppHeader";
import { Container } from "react-bootstrap";

export default function DireccionDeportiva() {
  return (
    <>
      <AppHeader />
      <Container className="mt-4">
        <h2>Dirección Deportiva</h2>
        <p>Hola mundo. Este es el inicio del módulo de Dirección Deportiva.</p>
      </Container>
    </>
  );
}
