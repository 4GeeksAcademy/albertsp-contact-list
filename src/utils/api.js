
const API_URL = 'https://playground.4geeks.com/contact/agendas';

export const crearAgenda = async(slug) => {
    try{
        const response = await fetch(`${API_URL}/${slug}`, {
            method: 'POST',
            headers: {
                'accept':'application/json',
            },
            body: JSON.stringify({name: slug})
        });
        
        const data = await response.json();

        if (!response.ok && !data) {
            throw new Error(`Error al crear agenda: ${response.status}`);
        }

        return data;

    } catch(error) {
        console.error('Error en crearAgenda:', error);
        throw error;
    }
};

export const obtenerAgenda = async(slug) => {
    try{
        const response = await fetch(`${API_URL}/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            },
        });

        if(!response.ok) {
            throw new Error(`Error al obtener agenda: ${response.status}`);
        }
        
        const data = await response.json();
        return data;

    } catch(error){
        console.error('Error en obtenerAgenda', error);
        throw error;
    }
};

export const crearContacto = async(slug, contacto) =>{
    try{
        const response = await fetch(`${API_URL}/${slug}/contacts`,{
            method: 'POST',
            headers :{
                'accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(contacto)
        });

        if (!response.ok){
            throw new Error (`Error al crear contacto: ${response.status}`)
        }

        const data = await response.json();
        return data;

    } catch (error){
        console.log('Error en crearContacto:', error);
        throw error;

    }
}

export const obtenerContactos = async (slug) =>{
    try{
        const response = await fetch(`${API_URL}/${slug}/contacts`,{
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json'
            }
        })

        if (!response.ok){
            throw new Error(`Error al obtener contactos: ${response.status}`);
            
        }

        return await response.json();

    } catch (error){
        console.error('Error en obtenerContactos:', error);
        throw error;
    }
}