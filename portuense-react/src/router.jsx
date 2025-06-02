import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import React from 'react';

import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Jugadores from './pages/Jugadores';
import PrimerEquipoDashboard from './pages/PrimerEquipoDashboard';
import Calendario from './pages/Calendario'
import DetalleJugador from './pages/DetalleJugador';
import ContratoJugador from './pages/ContratoJugador';
import AcademiaDashboard from './pages/AcademiaDashboard';
import UserManager from './pages/UserManager';
// import AcademiaDashboard from './pages/AcademiaDashboard';
// import CategoriaOpciones from './pages/CategoriaOpciones';
// import CategoriaDetalle from './pages/CategoriaDetalle';

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
        <Route path="/jugadores/:id" element={<DetalleJugador/>}/>
        <Route path="/jugadores/:id/contrato" element={<ContratoJugador />} />
        <Route path="/academia" element={<AcademiaDashboard />} />
        <Route path="/usuarios" element={<UserManager />} />
             
      </Routes>
    </BrowserRouter>
  );
}