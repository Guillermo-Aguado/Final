import { useEffect, useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CrearEventoModal from "../components/CrearEventoModal";
import EditarEventoModal from "../components/EditarEventoModal";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Button } from "react-bootstrap";
import BackButton from "../components/BackButton";
import AppHeader from "../components/AppHeader";
import '../assets/styles/calendar.css';
import React from 'react';

const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function Calendario() {
  const [eventos, setEventos] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [slotInfo, setSlotInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nuevoTipo, setNuevoTipo] = useState(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [mostrarEditar, setMostrarEditar] = useState(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const isAdmin = user.groups?.includes("admin");

  const fetchEventos = useCallback(() => {
    fetch("http://localhost:8000/api/eventos/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const eventosFormateados = data.map((ev) => ({
          id: ev.id,
          title:
            ev.categoria === "Partido"
              ? `⚽ ${ev.equipo1} vs ${ev.equipo2}`
              : `🏋️ Entrenamiento (${ev.equipo1})`,
          start: new Date(ev.fecha),
          end: new Date(new Date(ev.fecha).getTime() + 2 * 60 * 60 * 1000),
        }));
        setEventos(eventosFormateados);
      });
  }, [token]);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    } else {
      fetchEventos();
    }
  }, [isAdmin, navigate, token, fetchEventos]);

  // const handleContextMenu = (e, slot) => {
  //   e.preventDefault();
  //   setSlotInfo(slot);
  //   setContextMenu({ x: e.clientX, y: e.clientY });
  // };

  const handleSelectEventType = (tipo) => {
    setContextMenu(null);
    setNuevoTipo(tipo);
    setShowModal(true);
  };

  const calendarMessages = useMemo(
    () => ({
      allDay: "Todo el día",
      previous: "<",
      next: ">",
      today: "Hoy",
      month: "Mes",
      week: "Semana",
      day: "Día",
      agenda: "Agenda",
      date: "Fecha",
      time: "Hora",
      event: "Evento",
      noEventsInRange: "No hay eventos en este rango",
    }),
    []
  );

  return (
    <>
    <AppHeader />
    <div className="p-4" onClick={() => setContextMenu(null)}>
      <h2 className="mb-4">Calendario de Eventos</h2>
      <BackButton to="/dashboard" label="←"/>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 600 }}
        messages={calendarMessages}
        // onSelectSlot={(slot) => {
        //   document.addEventListener(
        //     "contextmenu",
        //     (e) => handleContextMenu(e, slot),
        //     {
        //       once: true,
        //     }
        //   );
        // }}
        onSelectEvent={(event) => {
          setEventoSeleccionado(event);
          setMostrarEditar(true);
        }}
      />
      <Button
        variant="success"
        className="mb-3"
        onClick={() => {
          setSlotInfo(null); // sin datos
          setNuevoTipo("Entrenamiento"); // por defecto
          setShowModal(true);
        }}
      >
        + Crear nuevo evento
      </Button>

      {contextMenu && (
        <ul
          className="context-menu"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            position: "absolute",
            zIndex: 9999,
          }}
        >
          <li onClick={() => handleSelectEventType("Partido")}>
            Crear Partido
          </li>
          <li onClick={() => handleSelectEventType("Entrenamiento")}>
            Crear Entrenamiento
          </li>
        </ul>
      )}

      <CrearEventoModal
        show={showModal}
        onClose={(refresh) => {
          setShowModal(false);
          if (refresh) fetchEventos();
        }}
        fecha={slotInfo?.start}
        tipo={nuevoTipo}
      />
      <EditarEventoModal
        show={mostrarEditar}
        evento={eventoSeleccionado}
        onClose={(refresh) => {
          setMostrarEditar(false);
          if (refresh) fetchEventos();
        }}
      />
    </div>
    </>
  );
}
