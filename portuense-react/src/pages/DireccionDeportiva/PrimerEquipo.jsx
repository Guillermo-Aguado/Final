// src/pages/DireccionDeportiva/PrimerEquipoDireccion.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AppHeader from "../../components/AppHeader";
import BackButton from "../../components/BackButton";
import React from "react";
import Panel from "../../components/Panel";
import panelData from "../../data/primerEquipoPanels.json";
// import { BackButton } from "../../components/BackButton"
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
          {panelData.map((panel, idx) => (
            <Col md={6} lg={4} className="mb-4" key={idx}>
              <Panel
                title={panel.title}
                text={`Documentos y PDFs del equipo ${panel.equipo}`}
                // ahora redirigimos a DocsyExcel, con categoría y equipo en la ruta
                redirect={`/direccion-deportiva/primer-equipo/${panel.categoria}/${panel.equipo}`}
                buttonText="Ver Documentos"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
