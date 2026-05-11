/**
 * Agenda - Página principal de contactos
 * Se encarga de:
 * 1. Inicializar la agenda (crear si no existe)
 * 2. Cargar los contactos
 * 3. Mostrar la lista de contactos
 * 4. Gestionar el modal de edición
 */

import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { crearAgenda, obtenerAgenda, crearContacto, obtenerContactos } from "../utils/api";
import { ContactCard } from "../components/ContactCard";
import { ModalEditContact } from "../components/ModalEditContact";

export const Agenda = () => {
    // Obtenemos el store global y dispatch
    const { store, dispatch } = useGlobalReducer();
    const { contacts } = store;

    // Estado para controlar qué contacto está siendo editado (null = ninguno)
    const [selectedContact, setSelectedContact] = useState(null);

    /**
     * handleEdit - Se ejecuta al hacer clic en el botón de editar
     * @param {object} contact - Contacto a editar
     */
    const handleEdit = (contact) => {
        setSelectedContact(contact);
    };

    /**
     * useEffect - Se ejecuta una vez al cargar la página
     * Encargado de inicializar la agenda y cargar los contactos
     */
    useEffect(() => {
        // Función asíncrona para inicializar todo
        const initAgenda = async () => {
            try {
                // === CASO 1: La agenda ya existe ===
                console.log("Intentando obtener agenda...");

                // 1. Obtenemos la agenda existente
                const miAgenda = await obtenerAgenda("albert-agenda");
                console.log("Agenda encontrada:", miAgenda);

                // 2. Guardamos la agenda en el store
                dispatch({ type: "set_agenda", payload: miAgenda });

                // 3. Obtenemos los contactos de la agenda
                const contactos = await obtenerContactos("albert-agenda");
                dispatch({ type: "set_contacts", payload: contactos.contacts });

                // 4. Si no hay contactos, creamos uno de prueba
                if (!contactos.contacts || contactos.contacts.length === 0) {
                    console.log("No hay contactos, creando contacto de prueba...");
                    const nuevoContacto = await crearContacto("albert-agenda", {
                        name: "Nombre Test",
                        email: "test@test.com",
                        phone: "123456789",
                        address: "Test Address",
                    });
                    dispatch({ type: "add_contact", payload: nuevoContacto });
                }

            } catch (error) {
                // === CASO 2: La agenda no existe (error 404) ===
                console.log("Agenda no existe, creando nueva...");

                try {
                    // 1. Creamos la agenda
                    const nuevaAgenda = await crearAgenda("albert-agenda");
                    console.log("Agenda creada:", nuevaAgenda);

                    // 2. Guardamos la agenda en el store
                    dispatch({ type: "set_agenda", payload: nuevaAgenda });

                    // 3. Creamos un contacto de prueba
                    const nuevoContacto = await crearContacto("albert-agenda", {
                        name: "Nombre Test",
                        email: "test@test.com",
                        phone: "123456789",
                        address: "Test Address",
                    });
                    dispatch({ type: "add_contact", payload: nuevoContacto });

                } catch (errorCrear) {
                    // === CASO 3: Error al crear (probablemente la agenda ya existe) ===
                    console.log("Error al crear:", errorCrear.message);

                    // 1. Intentamos obtener la agenda de nuevo
                    const agenda = await obtenerAgenda("albert-agenda");
                    dispatch({ type: "set_agenda", payload: agenda });

                    // 2. Obtenemos los contactos
                    const contactos = await obtenerContactos("albert-agenda");
                    dispatch({ type: "set_contacts", payload: contactos.contacts });

                    // 3. Si no hay contactos, creamos uno de prueba
                    if (!contactos.contacts || contactos.contacts.length === 0) {
                        const nuevoContacto = await crearContacto("albert-agenda", {
                            name: "Nombre Test",
                            email: "test@test.com",
                            phone: "123456789",
                            address: "Test Address",
                        });
                        dispatch({ type: "add_contact", payload: nuevoContacto });
                    }
                }
            }
        };

        // Ejecutamos la función de inicialización
        initAgenda();
    }, []);

    return (
        <div className="agenda-container">
            <h1>Contacts</h1>

            {/* Mapeamos cada contacto a un ContactCard */}
            {contacts.map((contact) => (
                <ContactCard
                    key={contact.id}
                    contact={contact}
                    onEdit={handleEdit}
                />
            ))}

            {/* Modal de edición - solo se muestra si hay un contacto seleccionado */}
            {selectedContact && (
                <ModalEditContact
                    contact={selectedContact}
                    onClose={() => setSelectedContact(null)}
                />
            )}
        </div>
    );
};