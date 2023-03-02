import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // import du composant Link

function AccountItem({ accountTitle, accountAmount, accountBalance }) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{accountTitle}</h3>
        <p className="account-amount">{accountAmount}</p>
        <p className="account-amount-description">{accountBalance}</p>
      </div>
      <div className="account-content-wrapper cta">
        <Link to="/transactions">
          {" "}
          {/* Utilisation du composant Link pour la redirection */}
          <button
            className={`transaction-button ${
              isButtonClicked ? "transaction-button-clicked" : ""
            }`}
            onClick={handleButtonClick}
          >
            View transactions
          </button>
        </Link>
      </div>
    </section>
  );
}

export default AccountItem;
