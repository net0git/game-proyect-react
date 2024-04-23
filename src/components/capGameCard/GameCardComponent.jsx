// src/components/GameCard.js
import React from 'react';
import './GameCardComponent.css'; 
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const GameCard = ({ id, titulo, descripcion, imagen,onDelete,onIdElemento }) => {



    const eliminarElemento = () => {
        // Llamada a la función onDelete pasando el ID del juego
        onDelete(id);
      };
    
    const obtenerIdElemento=()=>{
        onIdElemento(id)
    }


     // Definición del header
 const header = (
  <img src={imagen} className="card-img-top" alt='card' />
);
<h1>texto de prueba</h1>
// Definición del footer
const footer = (
  <span>
  <Button label="Modificar" icon="pi pi-check" onClick={obtenerIdElemento}/>
  {/* <Button label="eliminar" icon="pi pi-times" className="boton-eliminar " onClick={eliminarElemento}/> */}
  <Button label="eliminar" severity="danger" icon="pi pi-times" className="boton-eliminar " onClick={eliminarElemento} />
</span>
);

  return (
    <div  >

      <Card title={titulo}  footer={footer} header={header} className="card">
              <p className="m-0">
                {descripcion}
              </p>
          </Card>
    </div>
    
    // <div className="card" >
    //   <img src={imagen} className="card-img-top" alt={titulo} />
    //   <div className="card-body">
    //     <h5 className="card-title">{titulo}</h5>
       

    //     <button  type="button" onClick={obtenerIdElemento} >  Ir a Morificar </button>
    //     <button type="button" className='boton-eliminar' onClick={eliminarElemento}>  Eliminar  </button>
        
      
        
    //   </div>
    // </div>
  );
};

export default GameCard;