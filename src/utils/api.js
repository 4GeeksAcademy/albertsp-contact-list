/**
 * API de contactos - Conexión con 4Geeks Playground API
 * Todas las funciones usan fetch para comunicarse con el servidor externo
 */

const API_URL = "https://playground.4geeks.com/contact/agendas";

/**
 * Crea una nueva agenda en la API
 * @param {string} slug - Identificador único de la agenda (ej: "albert-agenda")
 * @returns {object} - La agenda creada
 */
export const crearAgenda = async (slug) => {
    try {
        const response = await fetch(`${API_URL}/${slug}`, {
            method: "POST",
            headers: {
                "accept": "application/json",
            },
            body: JSON.stringify({ name: slug }),
        });

        const data = await response.json();

        // Si la respuesta no es ok y no tiene datos, lanzamos error
        if (!response.ok && !data) {
            throw new Error(`Error al crear agenda: ${response.status}`);
        }

        return data;

    } catch (error) {
        console.error("Error en crearAgenda:", error);
        throw error;
    }
};

/**
 * Obtiene una agenda existente de la API
 * @param {string} slug - Identificador de la agenda
 * @returns {object} - Los datos de la agenda
 */
export const obtenerAgenda = async (slug) => {
    try {
        const response = await fetch(`${API_URL}/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener agenda: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error en obtenerAgenda:", error);
        throw error;
    }
};

/**
 * Crea un nuevo contacto en una agenda específica
 * @param {string} slug - Identificador de la agenda
 * @param {object} contacto - Objeto con los datos del contacto {name, email, phone, address}
 * @returns {object} - El contacto creado
 */

export const crearContacto = async (slug, contacto) => {
    try {
        const response = await fetch(`${API_URL}/${slug}/contacts`, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contacto),
        });

        if (!response.ok) {
            throw new Error(`Error al crear contacto: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log("Error en crearContacto:", error);
        throw error;
    }
};

/**
 * Obtiene todos los contactos de una agenda
 * @param {string} slug - Identificador de la agenda
 * @returns {object} - Objeto con la propiedad "contacts" que contiene el array de contactos
 */

export const obtenerContactos = async (slug) => {
    try {
        const response = await fetch(`${API_URL}/${slug}/contacts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener contactos: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error en obtenerContactos:", error);
        throw error;
    }
};

/**
 * Elimina un contacto de la agenda
 * @param {string} slug - Identificador de la agenda
 * @param {number} id - ID del contacto a eliminar
 * @returns {boolean} - true si se eliminó correctamente
 */
export const borrarContacto = async (slug, id) => {
    try {
        const response = await fetch(`${API_URL}/${slug}/contacts/${id}`, {
            method: "DELETE",
            headers: {
                "accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error al borrar contacto: ${response.status}`);
        }

        return true;

    } catch (error) {
        console.error("Error en borrarContacto:", error);
        throw error;
    }
};

/**
 * Actualiza un contacto existente (usa método PUT)
 * @param {string} slug - Identificador de la agenda
 * @param {number} id - ID del contacto a actualizar
 * @param {object} contacto - Objeto con los nuevos datos del contacto
 * @returns {object} - El contacto actualizado
 */
export const editarContacto = async (slug, id, contacto) => {
    try {
        const response = await fetch(`${API_URL}/${slug}/contacts/${id}`, {
            method: "PUT",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contacto),
        });

        if (!response.ok) {
            throw new Error(`Error al editar contacto: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error en editarContacto:", error);
        throw error;
    }
};