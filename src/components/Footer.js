import React from "react";
import '../App.css';

export const Footer = ({className=''}) => {
  return (
    <div className="footer">
      <footer className={`footer` + {className}}>
        <div className="copyright">&copy; 2024 FarmaGestor. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
};