import './App.css';
import {useState, useEffect} from 'react';
import piedra from './assets/piedra.png';
import papel from './assets/papel.png';
import tijera from './assets/tijera.png';


function App(){

  const tools = [piedra, papel, tijera]

  const [option, setOption] = useState("");
  const [response, setResponse] = useState("");
  const [gameFinished, setGameFinished] = useState(false);
  const [winner, setWinner] = useState("");
  const [points, setPoints] = useState(0);
  const [pcPoints, setPcPoints] = useState(0);
  const [round, setRounds] = useState(0);
  const [finalwinner, setFinalWinner] = useState("");

  const getRandomInt = (max) => {
    return Math.floor(Math.random()* max);
  }


  const handleOption = (e) =>{
    if (e.target.id == "Piedra"){
      setOption(piedra);
    }else if(e.target.id == "Papel"){
      setOption(papel);
    }else{
      setOption(tijera);
    }
    setResponse(tools[getRandomInt(3)]);
    setRounds(round + 1);
  }

useEffect(()=>{
  
  if(option != ""){
    if(option == piedra && response == piedra){
      setWinner("Empate");
    }else if(option == piedra && response == papel){
      setWinner("Jugador 2 Gana");
      setPcPoints(pcPoints +1);
    }else if(option == tijera && response == tijera){
      setWinner("Empate");
    }else if(option == tijera && response == piedra){
      setWinner("Jugador 2 Gana");
      setPcPoints(pcPoints +1);
    }else if(option == papel && response == papel){
      setWinner("Empate");
    }else if(option == papel && response == tijera){
      setWinner("Jugador 2 Gana");
      setPcPoints(pcPoints +1);
    }else{
      setWinner("Jugador 1 Gana");
      setPoints(points + 1);
    }
  }

  if(round == 3){
    setTimeout(() =>{
      setGameFinished(true);
    },1500)
  }else{
    setGameFinished(false);
  }


  if (points == pcPoints){
    setFinalWinner("EMPATE");
  }else if(points > pcPoints){
    setFinalWinner("Jugador 1 Gana");
  }else{
    setFinalWinner("Computadora Gana");
  }
},[round, option])




const playAgain = ()=>{
  window.location.reload();
}


if(gameFinished) return(

  <div className="App container">
      <div className='row'>
        <div className='card offset-2 col-8 mt-4 px-4 py-4'>
          <div className='row '>
            <h4 className='text-center'>{round} de 3</h4>
          </div>
          <div className='row mt-3'>
          <div className='row'>
            <div className="player player-1 col-5 align-items-center text-center px-4">
              <h3>Jugador 1</h3>
              <h4>Ha acertado {points} de 3</h4>
            </div>

            <div className='col-2 text-center'>
              <h1>Vs.</h1>
              <p className='btn btn-success'>{finalwinner}</p>
            </div>

            <div className='player player-2 col-5 text-center'>
              <h3>Computadora</h3>
              <h4>Ha acertado {pcPoints} de 3</h4>
            </div>
          </div>
          <button className='btn btn-danger mt-3' onClick={playAgain}>PLAY AGAIN</button>
          </div>
        </div>
      </div>
    </div>

)

  
 
  return (
    <div className="App container">
      <div className='row'>
        <div className='card offset-2 col-8 mt-4 px-4 py-4'>
          <div className='row '>
            <h4 className='text-end'>{round} de 3</h4>
          </div>

          <div className='row'>
            <div className="player player-1 col-5 align-items-center text-center px-4">
              <h3>Jugador 1</h3>
              <div class="option-image">
                <img src={option} />
              </div>
              <div className='d-flex justify-content-evenly'>
                <button id='Piedra' type='button' className='btn btn-primary' onClick={handleOption}>Piedra</button>
                <button id='Papel' type='button' className='btn btn-primary' onClick={handleOption} >Papel</button>
                <button id="Tijera" className='btn btn-primary' onClick={handleOption}>tijera</button>
              </div>
            </div>

            <div className='col-2 text-center'>
              <h1>Vs.</h1>
              <p>{winner}</p>
            </div>

            <div className='player player-2 col-5 text-center'>
              <h3>Computadora</h3>
              <div class="option-image">
                <img src={response} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
