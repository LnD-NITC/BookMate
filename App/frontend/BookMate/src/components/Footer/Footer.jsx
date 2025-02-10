import React from "react";
import githubLogo from "../../assets/icons8-github.svg";
import lndLogo from "../../assets/lndlogo.png";
import web from "../../assets/web.png";
import instagram from "../../assets/instagram.svg";
import arunnats from "../../assets/Logo_arunnats.png";
import linkedinLogo from "../../assets/icons8-linkedin.svg";

const Footer = () => {
  return (
    <footer className="footer items-center p-2 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
        <p>Book Mate - By LnD NITC</p>
        <a
          href="https://github.com/arunnats/"
          className="btn btn-ghost text-xl"
        >
          <img className=" h-8 max-w-lg" src={githubLogo} alt="Logo" />
        </a>
      </div>
      <nav className="grid-flow-col md:place-self-center md:justify-self-end">
        <a href="https://lndnitc.org/" className="btn btn-ghost text-xl">
          <img className=" h-8 max-w-lg" src={web} alt="Logo" />
        </a>
        <a
          href="https://www.instagram.com/donttellthewarden/"
          className="btn btn-ghost text-xl"
        >
          <img className=" h-8 max-w-lg" src={instagram} alt="Logo" />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
