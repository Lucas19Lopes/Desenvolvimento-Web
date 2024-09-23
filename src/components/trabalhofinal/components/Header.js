// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../components/css/Header.css'; // Importa o arquivo CSS

function Header() {
  return (
    <header>
      <nav>
        <ul className="left">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/schedule">Agendar Horário</Link>
          </li>
          <li>
            <Link to="/agendados">Agendados</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
