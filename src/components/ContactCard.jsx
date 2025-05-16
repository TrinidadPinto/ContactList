import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ContactCard = ({ contact }) => {
  const { actions } = useGlobalReducer();

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${contact.name}?`)) {
      actions.deleteContact(contact.id);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body d-flex align-items-center">
        <img
          src="https://dummyimage.com/100x100/000/fff.png&text=User"
          alt="Foto de contacto"
          className="rounded-circle me-3"
        />

        <div className="flex-grow-1">
          <h5 className="mb-1">{contact.name}</h5>
          <p className="mb-1 text-muted">
            <i className="fas fa-map-marker-alt me-2"></i>
            {contact.address}
          </p>
          <p className="mb-1 text-muted">
            <i className="fas fa-phone me-2"></i>
            {contact.phone}
          </p>
          <p className="mb-0 text-muted">
            <i className="fas fa-envelope me-2"></i>
            {contact.email}
          </p>
        </div>

        <div className="ms-3 d-flex flex-column align-items-end">
          <Link to={`/edit/${contact.id}`} className="btn btn-link text-dark p-1">
            <i className="fas fa-pen"></i>
          </Link>
          <button className="btn btn-link text-danger p-1" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactCard;
