// src/pages/DireccionDeportiva/Academia.jsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppHeader from "../../components/AppHeader";
import BackButton from "../../components/BackButton";
import Panel from "../../components/Panel";
import academiaPanels from "../../data/academiaPanels.json";
import { useNavigate } from "react-router-dom";

export default function AcademiaDireccion() {
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
        <h2 className="mb-4">Documentación - Academia</h2>
        <BackButton to="/direccion-deportiva" label="←" />
        <Row>
          {academiaPanels.map((panel, index) => (
            <Col md={6} lg={4} className="mb-4" key={index}>
              <Panel
                title={panel.title}
                text={`Documentos y Excel del ${panel.title}`}
                query={{ categoria: panel.categoria, equipo: panel.equipo }}
                redirect={`/direccion-deportiva/academia/${panel.categoria}/${panel.equipo}`}
                buttonText="Mostrar Documentos"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
