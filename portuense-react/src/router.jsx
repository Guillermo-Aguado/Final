import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import React from "react";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Jugadores from "./pages/Jugadores";
import PrimerEquipoDashboard from "./pages/PrimerEquipoDashboard";
import Calendario from "./pages/Calendario";
import DetalleJugador from "./pages/DetalleJugador";
import ContratoJugador from "./pages/ContratoJugador";
import AcademiaDashboard from "./pages/AcademiaDashboard";
import UserManager from "./pages/UserManager";
import PaginaCuotas from "./pages/Cuota";
import AcademiaCategoria from "./pages/AcademiaCategoria";
import DireccionDeportiva from "./pages/DireccionDeportiva";
import PrimerEquipoDireccion from "./pages/DireccionDeportiva/PrimerEquipo";
import AcademiaDireccion from "./pages/DireccionDeportiva/Academia";
import NuevoComentario from "./pages/NuevoComentario";
import DocsyExcel from "./pages/DireccionDeportiva/DocsyExcel";
import ExcelGrid from "./components/ExcelGrid";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/primer-equipo" element={<PrimerEquipoDashboard />} />
        {/* <Route path="/academia" element={<AcademiaDashboard />}/> */}
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/jugadores/:id" element={<DetalleJugador />} />
        <Route
          path="/jugadores/:id/comentario-nuevo"
          element={<NuevoComentario />}
        />
        <Route path="/jugadores/:id/contrato" element={<ContratoJugador />} />
        <Route path="/academia" element={<AcademiaDashboard />} />
        <Route path="/academia/:categoria" element={<AcademiaCategoria />} />
        <Route
          path="/direccion-deportiva/academia"
          element={<AcademiaDireccion />}
        />
        <Route path="/usuarios" element={<UserManager />} />
        <Route path="/cuotas" element={<PaginaCuotas />} />
        <Route path="/direccion-deportiva" element={<DireccionDeportiva />} />
        <Route
          path="/direccion-deportiva/primer-equipo"
          element={<PrimerEquipoDireccion />}
        />
        <Route
          path="/direccion-deportiva/primer-equipo/:categoria/:equipo"
          element={<DocsyExcel />}
        />
        <Route
          path="/direccion-deportiva/primer-equipo/:categoria/:equipo/excel"
          element={<ExcelGrid />}
        />
        <Route
          path="/direccion-deportiva/academia/:categoria/:equipo"
          element={<DocsyExcel />}
        />
        <Route
          path="/direccion-deportiva/academia/:categoria/:equipo/excel"
          element={<ExcelGrid />}
        />
      </Routes>
    </BrowserRouter>
  );
}
