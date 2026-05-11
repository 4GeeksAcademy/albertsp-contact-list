/**
 * ContactCard - Componente que muestra un contacto individual
 * @param {object} contact - Objeto con los datos del contacto
 * @param {function} onEdit - Función callback para editar el contacto
 */

import { borrarContacto } from "../utils/api";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactCard = ({ contact, onEdit }) => {
    // Obtenemos dispatch para actualizar el estado global
    const { dispatch } = useGlobalReducer();

    /**
     * handleDelete - Elimina el contacto de la API y del estado
     * Llama a la API, si es exitoso actualiza el store
     */
    const handleDelete = async () => {
        try {
            // Llamamos a la API para borrar
            await borrarContacto("albert-agenda", contact.id);
            // Actualizamos el estado global usando dispatch
            dispatch({ type: "delete_contact", payload: contact.id });
        } catch (error) {
            console.error("Error al borrar:", error);
        }
    };

    return (
        <div className="contact-card">
            {/* Sección con la información del contacto */}
            <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-field">✉️ {contact.email}</div>
                <div className="contact-field">📱 {contact.phone}</div>
                <div className="contact-field">📍 {contact.address}</div>
            </div>

            {/* Sección con los botones de acción */}
            <div className="contact-actions">
                {/* Botón para editar - llama a onEdit con el contacto */}
                <button onClick={() => onEdit(contact)}>✏️</button>
                {/* Botón para eliminar */}
                <button onClick={handleDelete}>🗑️</button>
            </div>
        </div>
    );
};