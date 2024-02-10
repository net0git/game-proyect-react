// src/components/GameCard.js
import React from 'react';
import './GameCardComponent.css'; 

const GameCard = ({ id, titulo, descripcion, imagen,onDelete,onIdElemento }) => {

    const eliminarElemento = () => {
        // Llamada a la función onDelete pasando el ID del juego
        onDelete(id);
      };
    
    const obtenerIdElemento=()=>{
        onIdElemento(id)
    }
  return (
    <div className="card" >
      <img src={imagen} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
       

        <button  type="button" onClick={obtenerIdElemento} >  Ir a Morificar </button>
        <button type="button" className='boton-eliminar' onClick={eliminarElemento}>  Eliminar  </button>
        
      
        
      </div>
    </div>
  );
};

export default GameCard;