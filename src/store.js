const AGENDA_SLUG = "Trini123"; 
const API_BASE_URL = "https://playground.4geeks.com/contact/agendas";

export const initialStore = () => {
  return {
    contacts: [], 
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task': {
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map(todo => 
          todo.id === id ? { ...todo, background: color } : todo
        )
      };
    }

    case 'set_contacts':
      return {
        ...store,
        contacts: action.payload
      };

    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    case 'update_contact':
      return {
        ...store,
        contacts: store.contacts.map(c => 
          c.id === action.payload.id ? action.payload : c
        )
      };

    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter(c => c.id !== action.payload)
      };

    default:
      throw Error('Unknown action.');
  }
}

export const actions = (getStore, dispatch) => ({
  getContacts: async () => {
    try {
      const resp = await fetch(`${API_BASE_URL}/${AGENDA_SLUG}/contacts`);

      if (!resp.ok) {
        console.error("Error cargando contactos:", resp.statusText);
        return;
      }

      const data = await resp.json();
      console.log("Datos recibidos:", data);
      dispatch({ type: "set_contacts", payload: data.contacts });
    } catch (error) {
      console.error("Error cargando contactos:", error);
    }
  },

  deleteContact: async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${AGENDA_SLUG}/contacts/${id}`, {
        method: "DELETE"
      });
      dispatch({ type: "delete_contact", payload: id });
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  },

  createContact: async (contact) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/${AGENDA_SLUG}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, agenda_slug: AGENDA_SLUG })
      });
      const data = await resp.json();
      dispatch({ type: "add_contact", payload: data });
    } catch (error) {
      console.error("Error creating contact", error);
    }
  },

  updateContact: async (id, contact) => {
    try {
      const resp = await fetch(`${API_BASE_URL}/${AGENDA_SLUG}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, agenda_slug: AGENDA_SLUG })
      });
      const data = await resp.json();
      dispatch({ type: "update_contact", payload: data });
    } catch (error) {
      console.error("Error updating contact", error);
    }
  }
});
