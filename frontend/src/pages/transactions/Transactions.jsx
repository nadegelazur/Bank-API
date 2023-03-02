import React from "react";
import { Link } from "react-router-dom";
import "./transactions.css";

const Transaction = () => {
  return (
    <div className="pageContainer_maintenance">
      <h1 className="maintenance">Page en cours de maintenance</h1>
      <p>
        Nous sommes en train de mettre à jour notre Page transactions. Nous
        serons de retour bientôt.
      </p>
      <p>Merci pour votre patience.</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
};

export default Transaction;
