/**
 * ContactForm - Página para crear un nuevo contacto
 * Muestra un formulario y al enviarlo llama a la API para guardar
 */

import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { crearContacto } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

export const ContactForm = () => {
    // Dispatch para actualizar el estado global
    const { dispatch } = useGlobalReducer();

    // Hook para navegar programáticamente después de guardar
    const navigate = useNavigate();

    // Estado local con los datos del formulario
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    /**
     * handleChange - Actualiza el estado cuando el usuario escribe
     * @param {object} e - Evento del input
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * handleSubmit - Envía el formulario a la API
     * @param {object} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Llamamos a la API para crear el contacto
            await crearContacto("albert-agenda", contact);

            // 2. Actualizamos el estado global
            dispatch({ type: "add_contact", payload: contact });

            // 3. Navegamos de vuelta a la lista de contactos
            navigate("/agenda");
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    return (
        <div className="contact-form-container">
            <div className="contact-form-wrapper">
                <h1 className="contact-form-title">Add a new contact</h1>

                <form onSubmit={handleSubmit} className="contact-form">
                    {/* Campo: Nombre completo */}
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            name="name"
                            value={contact.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Full Name"
                            className="form-input"
                        />
                    </div>

                    {/* Campo: Email */}
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Enter email"
                            className="form-input"
                        />
                    </div>

                    {/* Campo: Teléfono */}
                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                            name="phone"
                            value={contact.phone}
                            onChange={handleChange}
                            type="tel"
                            placeholder="Enter phone"
                            className="form-input"
                        />
                    </div>

                    {/* Campo: Dirección */}
                    <div className="form-group">
                        <label className="form-label">Address</label>
                        <input
                            name="address"
                            value={contact.address}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter address"
                            className="form-input"
                        />
                    </div>

                    {/* Botón de enviar */}
                    <button type="submit" className="form-button">
                        Save Contact
                    </button>
                </form>

                {/* Enlace para volver a la lista */}
                <div className="contact-form-footer">
                    <Link to="/agenda" className="contact-form-link">
                        or get back to contacts
                    </Link>
                </div>
            </div>
        </div>
    );
};