/**
 * useGlobalReducer - Hook personalizado para usar el estado global
 * Proporciona acceso al store y a la función dispatch desde cualquier componente
 */

import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../utils/store";

// Creamos el contexto que almacenará el estado global
const StoreContext = createContext();

/**
 * StoreProvider - Componente envoltorio que proporciona el estado global
 * Debe envolver a toda la aplicación para que los componentes hijos puedan acceder
 * @param {ReactNode} children - Componentes hijos
 */
export function StoreProvider({ children }) {
    // useReducer combina el reducer con el estado inicial
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    // Proveemos el store y dispatch a todos los hijos
    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

/**
 * Hook para usar el estado global en cualquier componente
 * @returns {object} - { store, dispatch }
 * @example
 * const { store, dispatch } = useGlobalReducer();
 * // store.contacts contiene los contactos
 * // dispatch({type: "add_contact", payload: nuevoContacto}) para actualizar
 */
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext);
    return { dispatch, store };
}