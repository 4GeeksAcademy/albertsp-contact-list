/**
 * ModalEditContact - Modal para editar un contacto existente
 * @param {object} contact - Contacto a editar
 * @param {function} onClose - Función para cerrar el modal
 */

import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { editarContacto } from "../utils/api";

export const ModalEditContact = ({ contact, onClose }) => {
    // Dispatch para actualizar el estado
    const { dispatch } = useGlobalReducer();

    // Estado local con los datos del formulario
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    /**
     * useEffect - Se ejecuta cuando cambia el contacto a editar
     * Precarga los datos del contacto en el formulario
     */
    useEffect(() => {
        if (contact) {
            setFormData({
                name: contact.name || "",
                email: contact.email || "",
                phone: contact.phone || "",
                address: contact.address || "",
            });
        }
    }, [contact]);

    /**
     * handleChange - Actualiza el estado cuando el usuario escribe en un input
     * @param {object} e - Evento del input
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * handleSubmit - Envía los datos editados a la API
     * @param {object} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Llamamos a la API con PUT para actualizar
            const updated = await editarContacto("albert-agenda", contact.id, formData);
            // Actualizamos el estado global
            dispatch({ type: "edit_contact", payload: updated });
            // Cerramos el modal
            onClose();
        } catch (error) {
            console.error("Error al editar:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Contact</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                    />
                    <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />
                    <div className="modal-buttons">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};