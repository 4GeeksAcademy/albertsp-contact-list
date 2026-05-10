
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import { crearAgenda, obtenerAgenda, crearContacto, obtenerContactos } from "../utils/api";
import { ContactCard } from "../components/ContactCard";


export const Agenda = () =>{

    const { store, dispatch } = useGlobalReducer();
    const {contacts} = store;

useEffect(() => {

    const initAgenda = async () =>{
        try{
            // 1. Intentar obtener agenda existente
            console.log("Intentando obtener agenda...");
            const miAgenda = await obtenerAgenda("albert-agenda");
            console.log("Agenda encontrada:", miAgenda);
            // 2. Si existe, guardar en reducer
            dispatch({type: "set_agenda", payload: miAgenda})

            const contactos = await obtenerContactos("albert-agenda");
            dispatch({ type: "set_contacts", payload: contactos.contacts})
        } catch(error){
            // 3. Si no existe (error 404), creamos una nueva
            console.log("Agenda no existe, creando nueva...");
            try{
                const nuevaAgenda = await crearAgenda("albert-agenda");
                console.log("Agenda creada:", nuevaAgenda);
                dispatch({ type: "set_agenda", payload: nuevaAgenda});

                const nuevoContacto = await crearContacto("albert-agenda",{
                    name: "Nombre Test",
                    email : "test@test.com",
                    phone: "123456789",
                    address: "Test Address"
                });
                dispatch({type: 'add_contact', payload: nuevoContacto});

            } catch(errorCrear){
                // si da error 400, agenda ya existe, intentamos obtener de nuevo
                console.log("Error al crear:", errorCrear.message);
                const agenda = await obtenerAgenda("albert-agenda");
                dispatch({type: "set_agenda", payload: agenda});
                
            }
        }
    };
    initAgenda();
}, [])


    return(
        <div className="agenda-container">
            <h1>Contacts</h1>
            {contacts.map( contact => (
                <ContactCard key={contact.id} contact={contact}/>
            )

            )}
        </div>
    )

};