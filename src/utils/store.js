export const initialStore=()=>{
  return{
    contacts: [],
    agenda: {},
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){

    case 'add_contact':
      return{
        ...store,
        contacts: [...store.contacts,action.payload]
      };
    
    case 'set_agenda':
      return{
        ...store,
        agenda: action.payload

      };
    
    case 'set_contacts':
      return{
        ...store,
        contacts: action.payload
      };

    default:
      throw Error('Unknown action.');
  }    
}
