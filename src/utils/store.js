/**
 * Store - Estado global de la aplicación
 * Aquí definimos el estado inicial y el reducer que lo modifica
 */

/**
 * Estado inicial de la aplicación
 * @returns {object} - Objeto con los valores por defecto
 */
export const initialStore = () => {
    return {
        contacts: [],     // Array de contactos
        agenda: {},       // Objeto con los datos de la agenda
    };
};

/**
 * Reducer - función que actualiza el estado según la acción recibida
 * @param {object} store - Estado actual
 * @param {object} action - Acción a ejecutar {type, payload}
 * @returns {object} - Nuevo estado
 */
export default function storeReducer(store, action = {}) {
    switch (action.type) {

        // Añade un nuevo contacto al array de contactos
        case "add_contact":
            return {
                ...store,
                contacts: [...store.contacts, action.payload],
            };

        // Guarda los datos de la agenda completa
        case "set_agenda":
            return {
                ...store,
                agenda: action.payload,
            };

        // Reemplaza todos los contactos con nuevos datos (ej: desde la API)
        case "set_contacts":
            return {
                ...store,
                contacts: action.payload,
            };

        // Elimina un contacto por su ID
        case "delete_contact":
            return {
                ...store,
                contacts: store.contacts.filter((c) => c.id !== action.payload),
            };

        // Actualiza un contacto existente (busca por ID y reemplaza)
        case "edit_contact":
            return {
                ...store,
                contacts: store.contacts.map((contact) =>
                    contact.id === action.payload.id ? action.payload : contact
                ),
            };

        // Acción por defecto - lanza error si no se reconoce
        default:
            throw Error("Unknown action.");
    }
}