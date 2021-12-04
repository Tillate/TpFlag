import React from "react";
import Logo from "../components/Logo";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>Erreur 404</h1>
      <Link to="/">Back to Home page</Link>
    </div>

  );
};

export default NotFound;