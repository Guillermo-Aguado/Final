import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import React from 'react';


export default function CrearEventoModal({ show, onClose, fecha, tipo: tipoInicial }) {
  const [descripcion, setDescripcion] = useState('');
  const [equipo2, setEquipo2] = useState('');
  const [localizacion, setLocalizacion] = useState('');
  const [tipo, setTipo] = useState(tipoInicial || 'Entrenamiento');
  const [fechaInput, setFechaInput] = useState('');

  const token = sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (show) {
      setDescripcion('');
      setEquipo2('');
      setLocalizacion('');
      setTipo(tipoInicial || 'Entrenamiento');

      // Si viene fecha del calendario, precargar
      if (fecha) {
        const localDate = new Date(fecha);
        const isoString = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16); // formato "YYYY-MM-DDTHH:mm"
        setFechaInput(isoString);
      } else {
        setFechaInput('');
      }
    }
  }, [show, tipoInicial, fecha]);

  const handleSubmit = async () => {
    const evento = {
      descripcion,
      fecha: new Date(fechaInput).toISOString(),
      categoria: tipo,
      equipo1: 'Portuense F.C.',
      equipo2: tipo === 'Partido' ? equipo2 : '',
      localizacion,
    };

    const res = await fetch('http://localhost:8000/api/eventos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(evento),
    });

    if (res.ok) {
      onClose(true);
    } else {
      console.error('Error al crear evento');
    }
  };

  return (
    <Modal show={show} onHide={() => onClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Evento</Modal.Title>
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
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </Form.Group>

          {tipo === 'Partido' && (
            <Form.Group className="mt-3">
              <Form.Label>Equipo contrario</Form.Label>
              <Form.Control
                type="text"
                value={equipo2}
                onChange={(e) => setEquipo2(e.target.value)}
                required
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
        <Button variant="secondary" onClick={() => onClose(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Crear
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
