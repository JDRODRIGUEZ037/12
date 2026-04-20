import React from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { FaComment, FaShareAlt } from "react-icons/fa"; // Importa iconos para comentarios y compartidos

// Asegúrate de que esta sea la ÚNICA definición de la función CardMain en este archivo
function CardMain({ imgSrc, publicationTitle, totalLikes, totalComments, totalShares }) {
  return (
    <div className="card_main">
      <img src={imgSrc} alt="Imagen de Publicación" className="card_main_img" />
      <div className="card_main_name">
        <h2>{publicationTitle}</h2>
        <div className="card_main_icon">
          {/* Likes se mantienen aquí */}
          <i>
            <BsFillHeartFill /> <span>{totalLikes}</span>
          </i>
        </div>
      </div>

      {/* SECCIÓN STAT CON COMENTARIOS Y COMPARTIDOS */}
      <div className="stat">
        <div>
          <p>
            Comentarios<span>{totalComments}</span>
          </p>
        </div>
        <div>
          <p>
            Compartidos<span>{totalShares}</span>
          </p>
        </div>
      </div>

      <div className="card_main_button">
        <a href="#" className="button btn">
          Stats
        </a>
        <a href="#" className="button2 btn">
          More
        </a>
      </div>
    </div>
  );
}

export default CardMain;