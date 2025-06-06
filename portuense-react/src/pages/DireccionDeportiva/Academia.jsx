// src/pages/DireccionDeportiva/AcademiaDireccion.jsx
import React from "react";
import { Container } from "react-bootstrap";
import AppHeader from "../../components/AppHeader";
import BackButton from "../../components/BackButton";

export default function AcademiaDireccion() {
  return (
    <>
      <AppHeader />
      <Container className="mt-4">
        <h2 className="mb-4">Documentación - Academia</h2>
        <BackButton to="/direccion-deportiva" label="←" />
        <p>Aquí se mostrarán las carpetas y PDFs asociados a jugadores de la academia.</p>
      </Container>
    </>
  );
}
