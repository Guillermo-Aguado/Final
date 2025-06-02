import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import React from 'react';

export default function EditarEventoModal({ show, onClose, evento }) {
  const [descripcion, setDescripcion] = useState('');
  const [equipo2, setEquipo2] = useState('');
  const [localizacion, setLocalizacion] = useState('');
  const [fechaInput, setFechaInput] = useState('');
  const [tipo, setTipo] = useState('Entrenamiento');

  const token = sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (evento && show) {
      setDescripcion(evento.descripcion || '');
      setEquipo2(evento.equipo2 || '');
      setLocalizacion(evento.localizacion || '');
      setTipo(evento.categoria || 'Entrenamiento');

      const date = new Date(evento.start);
      const iso = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setFechaInput(iso);
    }
  }, [evento, show]);

  const handleUpdate = async () => {
    const body = {
      descripcion,
      fecha: new Date(fechaInput).toISOString(),
      categoria: tipo,
      equipo1: evento.equipo1 || 'Portuense F.C.',
      equipo2: tipo === 'Partido' ? equipo2 : '',
      localizacion,
    };

    const res = await fetch(`http://localhost:8000/api/eventos/${evento.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      onClose(true);
    } else {
      console.error('Error al editar evento');
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este evento?');
    if (!confirmed) return;

    const res = await fetch(`http://localhost:8000/api/eventos/${evento.id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      onClose(true); // refrescar lista
    } else {
      alert('Error al eliminar el evento');
    }
  };

  return (
    <Modal show={show} onHide={() => onClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tipo de evento</Form.Label>
            <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="Entrenamiento">Entrenamiento</option>
              <option value="Partido">Partido</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Fecha y hora</Form.Label>
            <Form.Control
              type="datetime-local"
              value={fechaInput}
              onChange={(e) => setFechaInput(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>

          {tipo === 'Partido' && (
            <Form.Group className="mt-3">
              <Form.Label>Equipo contrario</Form.Label>
              <Form.Control
                type="text"
                value={equipo2}
                onChange={(e) => setEquipo2(e.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group className="mt-3">
            <Form.Label>Localización</Form.Label>
            <Form.Control
              type="text"
              value={localizacion}
              onChange={(e) => setLocalizacion(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
        <Button variant="secondary" onClick={() => onClose(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
