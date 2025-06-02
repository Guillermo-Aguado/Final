import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';

export default function AppHeader() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <Navbar style={{ backgroundColor: '#ff1e56' }} expand="lg" className="shadow-sm mb-4">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          ⚽ Portuense Manager
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-user" className="d-flex align-items-center gap-2">
              <span role="img" aria-label="user">👤</span> {user.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
              {/* <Dropdown.Item onClick={() => navigate('/perfil')}>Mi Perfil</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
