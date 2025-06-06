import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AppHeader from "../../components/AppHeader";
import BackButton from "../../components/BackButton";
import React from "react";

// IMPORTANTE: Este es un componente placeholder que mostraría las carpetas por jugador.
// Reemplaza `Panel` con un nuevo componente más adelante si necesitas lógica diferente.
import Panel from "../../components/Panel";

import panelData from "../../data/primerEquipoPanels.json"; // puedes usar el mismo JSON

export default function PrimerEquipoDireccion() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (!storedUser.username) {
      navigate("/");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  return (
    <>
      <AppHeader />
      <Container className="mt-4">
        <h2 className="mb-4">Documentación - Primer Equipo</h2>
        <BackButton to="/direccion-deportiva" label="←" />
        <Row>
          {panelData.map((panel, index) => (
            <Col md={6} lg={4} className="mb-4" key={index}>
              <Panel
                title={panel.title}
                text={`Documentos y PDFs del equipo ${panel.equipo}`}
                query={{ categoria: panel.categoria, equipo: panel.equipo }}
                redirect="/carpetas" // 👈 Este lo puedes conectar con tu futura vista de carpetas
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
