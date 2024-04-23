
import React, { useEffect, useState } from 'react';




import './App.css';
import GameCard from './components/capGameCard/GameCardComponent';
import Formulario from './components/carGameForm/GameFormComponent';

function App() {
  const [games, setGames] = useState([]);
  const [game, setGame]=useState({});
  const [idgame,setIdgame]=useState('');

  //el siguiente efecto se ejecutara solo una vez al iniciar la pagina
  useEffect(() => {
    // Llamada a la API para obtener datos
    fetch('https://us-central1-tarjetero-b90eb.cloudfunctions.net/app/api/games')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error fetching data:', error));
  });

  //el siguiente efecto se ejecutara cada vez que idgame cambie de valor y sea diferende de ''
  useEffect(()=>{
    if (idgame !== '') {
      // Llamada a la API para obtener datos
      fetch(`https://us-central1-tarjetero-b90eb.cloudfunctions.net/app/api/games/${idgame}`)
        .then(response => response.json())
        .then(data => setGame(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  },[idgame])

  //este efecto se ejecutara cada vez que game cambie de valores, entonces la pasamos al formulario para su modificacion 
  useEffect(()=>{
    console.log(game)
  },[game])

  //FUNCION PARA ELIMINAR UN ELEMENTO 
  const handleDelete = async (id) => {
    try {
      // Realizar la llamada a la API DELETE para eliminar el juego
      const response = await fetch(`https://us-central1-tarjetero-b90eb.cloudfunctions.net/app/api/games/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Si la eliminación en la API es exitosa, actualizar el estado local
        setGames(prevGames => prevGames.filter(game => game.id !== id));
        console.log(`Juego con ID ${id} eliminado correctamente.`);
      } else {
        console.error(`Error al eliminar el juego con ID ${id}.`);
      }
    } catch (error) {
      console.error('Error al realizar la eliminación:', error);
    }
   
  };

   //FUNCION PARA GUARDAR UN ELEMENTO 
   const handleGuardar = async (formData) => {
          try {
            
            const response = await fetch('https://us-central1-tarjetero-b90eb.cloudfunctions.net/app/api/games', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
        
      
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
        
        
            // Verificar si hay contenido en el cuerpo de la respuesta antes de intentar analizarlo
          const responseBody = await response.text();
          const responseData = responseBody ? JSON.parse(responseBody) : null;
      

          console.log('Respuesta de la API:', responseData);
          } catch (error) {
            console.error('Error al enviar los datos a la API:', error.message);
          }
   
  };
  //FUNCION DE MODIFICAR ELEMENTO
  const handeModificar = async (id,formData) => {
    try {
      
      const response = await fetch(`https://us-central1-tarjetero-b90eb.cloudfunctions.net/app/api/games/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
  
      // Verificar si hay contenido en el cuerpo de la respuesta antes de intentar analizarlo
    const responseBody = await response.text();
    const responseData = responseBody ? JSON.parse(responseBody) : null;


    console.log('Respuesta de la API:', responseData);
    } catch (error) {
      console.error('Error al modificar los datos a la API:', error.message);
    }

};
 //FUNCION PARA OBTENER EL ID DE UN ELEMENTO 
 const handleObtenerElementoPorId = async (id) => {
      setIdgame(id)
};

  return (
    <div className="App">  
      <header className="App-header">
      
      <br></br>
            <Formulario onGame={game} idElement={idgame} onGuardarGame={handleGuardar} onModificarGame={handeModificar}/>
              <div className='centered-container'>
                {games.map(game => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    titulo={game.titulo}
                    imagen={game.imagen}
                    descripcion={game.descripcion}
                    onDelete={handleDelete}
                    onIdElemento={handleObtenerElementoPorId}
                  />
                ))}
              </div>   
              
              <div>
              
    </div>
      </header>
     
    </div>
  );
}

export default App;
