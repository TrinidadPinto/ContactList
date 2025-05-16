import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard"; 

export const Home = () => {
  const { store, actions } = useGlobalReducer();
  
  useEffect(() => {
    console.log("Ejecutando getContacts()");
    actions.getContacts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Contactos</h2>
        <Link to="/add">
          <button className="btn btn-success">Agregar contacto</button>
        </Link>
      </div>

      <div className="row">
        {store.contacts && store.contacts.length > 0 ? (
          store.contacts.map((contact) => (
            <ContactCard
            key={contact.id} 
            contact={contact}
            onDelete={actions.deleteContact}
            />
          ))
        ) : (
          <p>No hay contactos disponibles.</p>
        )}
      </div>
    </div>
  );
};
