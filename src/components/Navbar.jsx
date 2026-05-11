/**
 * Navbar - Barra de navegación superior
 * Contiene los enlaces principales de la aplicación
 */

import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark" style={{ backgroundColor: "#16213e", borderBottom: "1px solid #0f3460" }}>
            <div className="container">
                {/* Logo / Título que lleva al inicio */}
                <Link to="/">
                    <span className="navbar-brand mb-0 h1" style={{ color: "#ffffff" }}>
                        Contact List
                    </span>
                </Link>

                {/* Botones de navegación */}
                <div className="buttons-container-navbar">
                    {/* Botón para generar/ver agenda - lleva a la página de contactos */}
                    <Link to="/agenda">
                        <button className="btn" style={{ backgroundColor: "#4a90d9", color: "white", border: "none" }}>
                            Generate Agenda
                        </button>
                    </Link>

                    {/* Botón para añadir nuevo contacto */}
                    <Link to="/contactform">
                        <button className="btn" style={{ backgroundColor: "#4a90d9", color: "white", border: "none" }}>
                            Add new contact
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};