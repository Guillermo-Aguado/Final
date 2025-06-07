import { Modal, Button } from "react-bootstrap";
import React from "react";

export default function DetallesEventoModal({ show, evento, onClose, onEditar, onEliminar }) {
  if (!evento) return null;
   

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Tipo:</strong> {evento.tipo}</p>
        <p><strong>Fecha:</strong> {new Date(evento.start).toLocaleString()}</p>
        <p><strong>Descripción:</strong> {evento.title}</p>
        {evento.localizacion && <p><strong>Ubicación:</strong> {evento.localizacion}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        <Button variant="warning" onClick={onEditar}>Editar</Button>
        <Button variant="danger" onClick={onEliminar}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
}
