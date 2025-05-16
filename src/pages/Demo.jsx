import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const API_BASE_URL = "https://playground.4geeks.com/contact/agendas";
  const AGENDA_SLUG = "Trini123"; 

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (id && store.contacts?.length > 0) {
      const found = store.contacts.find(c => c.id == id);
      if (found) {
        setContact({
          name: found.name || "",
          email: found.email || "",
          phone: found.phone || "",
          address: found.address || "",
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const endpoint = id 
    ? `${API_BASE_URL}/${AGENDA_SLUG}/contacts/${id}`
    : `${API_BASE_URL}/${AGENDA_SLUG}/contacts`;

    const contactToSend = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      agenda_slug: AGENDA_SLUG
    };  

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactToSend)
    });

    if (response.ok) {
      const updatedList = await fetch(`${API_BASE_URL}/${AGENDA_SLUG}/contacts`);
      const data = await updatedList.json();
      dispatch({ type: "set_contacts", payload: data });

      navigate("/");
    } else {
      console.error("Error al guardar el contacto");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Contacto" : "Agregar Contacto"}</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control my-2" name="name" value={contact.name} onChange={handleChange} placeholder="Nombre completo" />
        <input className="form-control my-2" name="email" value={contact.email} onChange={handleChange} placeholder="Email" />
        <input className="form-control my-2" name="phone" value={contact.phone} onChange={handleChange} placeholder="Teléfono" />
        <input className="form-control my-2" name="address" value={contact.address} onChange={handleChange} placeholder="Dirección" />
        <button className="btn btn-primary mt-3" type="submit">
          {id ? "Guardar Cambios" : "Agregar Contacto"}
        </button>
        <div className="mt-4">
          <Link to="/" className="text-primary text-decoration-underline">
            or get back to contacts
          </Link>
      </div>
      </form>
    </div>
  );
};
