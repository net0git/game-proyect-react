import React, { useState, useEffect } from 'react';
import './GameFormComponent.css'


const Formulario = ({onGame,idElement,onGuardarGame,onModificarGame}) => {
    // const [titulo, setTitulo] = useState(onGame.titulo);
    // const [descripcion, setDescripcion] = useState(onGame?onGame.descripcion:'');
    // const [imagen, setImagen] = useState(onGame?onGame.imagen:'');
    // const [archivo, setArchivo] = useState(onGame?onGame.archivo:'');
    // const [idgame,setIdgame]=useState(idElement?idElement:'')
    
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [archivo, setArchivo] = useState('');
    const [idgame,setIdgame]=useState('')
    
    const [nameBoton,setNameButon]=useState('guardar')
    const [color,setColor]=useState('green')
    



 
 //FUNCON EFECTO QUE SE EJECUTARA DESPUES DE ENCONTRAR DIFERENCIAS EN LOS PROP 
  useEffect(() => {
    console.log('este es el id: '+idElement)
    // Verificar si onGame existe antes de acceder a sus propiedades
    if (idElement!=='') {
      setTitulo(onGame.titulo || '');
      setDescripcion(onGame.descripcion || '');
      setImagen(onGame.imagen || '');
      setIdgame(idElement || '')
      setNameButon('modificar')
      setColor('purple')
      
    }
  }, [onGame, idElement]);

  //FUNCION PARA LIMPIAR LOS CAMPOS DEL FORMULARIO
  const handleClear = () => {
    // Establecer los estados a sus valores iniciales (cadenas vacías en este caso)
    setTitulo('');
    setDescripcion('');
    setImagen('');
    setIdgame('');
    setNameButon('guardar')
    setColor('green')
  };
  
  //FUNCION PARA EJECUTAR CON UN CLICK LA PETICION DEL FORMULARIO
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { titulo, descripcion, imagen, archivo };
    
    if(nameBoton==='guardar'){
       
        onGuardarGame(formData)
    }
    if(nameBoton==='modificar'){
        onModificarGame(idgame,formData)
    }
    handleClear();
 
   // console.log('esto viene desde las tarjetas: '+titulo +' '+ idgame)
  };
  return (
    <div className="formulario-container">
      <form className="formulario" onSubmit={handleSubmit}>
        <label>
          Name Game:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
             required
          />
        </label>
        <br />

        <label>
          Description:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
             required
          />
        </label>
        <br />

        <label>
          URL:
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
             required
          />
        </label>
        <br />

        <button type="submit" style={{ backgroundColor: color}}>{nameBoton}</button>
        <button type="button" style={{backgroundColor:'gray'}} onClick={handleClear}>Limpiar campos</button>

      </form>
    </div>
  );
};

export default Formulario;
