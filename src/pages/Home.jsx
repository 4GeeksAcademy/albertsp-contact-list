/**
 * Home - Página de inicio de la aplicación
 * Muestra un mensaje de bienvenida y accesos rápidos
 */

import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
    // Hook para acceder al estado global (actualmente no se usa, pero disponible)
    const { store, dispatch } = useGlobalReducer();

    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Agenda Management</h1>
                <p className="home-subtitle">Manage your contacts easily</p>
                <p className="home-info">
                    First time? Click "Generate Agenda" in the navbar to create your agenda and a test contact.
                </p>
                <div className="home-buttons">
                    {/* Botón para ir a la página de contactos */}
                    <Link to="/agenda" className="home-btn home-btn-primary">
                        View Contacts
                    </Link>
                    {/* Botón para ir al formulario de nuevo contacto */}
                    <Link to="/contactform" className="home-btn home-btn-secondary">
                        Add Contact
                    </Link>
                </div>
            </div>
        </div>
    );
};