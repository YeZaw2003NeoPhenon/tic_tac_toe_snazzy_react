import { useState } from 'react'
import { Board } from './Board.jsx'
import './App.css'
import {ClipLoader} from 'react-spinners'
function App() {
  const [history , setHistory ] = useState([Array(9).fill(null)])
  const[isNext , setIsNext ] = useState(true)
  const[currentMove , setCurrentMove ] = useState(0)
  const currentSquares = history[currentMove]
  const[winningLine , setWinningLine ] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const[ players , setPlayers ] = useState({
    playerX : 'Player X',
    playerO : 'Player O'
  })

  const[scores , setScores ] = useState({
    playerX : 0 ,
    playerO : 0 ,
  })

  const updateScores = (winner) => {
    if( winner === 'X' ){
      setScores((prevScores) => (
        {...prevScores , playerX : scores.playerX + 1 }
      ))
    }
    else if(winner === 'O'){
      setScores((prevScores) => (
        {...prevScores , playerO : scores.playerO + 1 }
      ))
    }
  }
  const handlePlay = (newSquares) =>{
    const newHistory = [...history.slice(0 , currentMove + 1 ) , newSquares] // slice is hallaciously same with substring 
    setHistory(newHistory)
    setCurrentMove(newHistory.length - 1)
    setIsNext(!isNext)

    const winningInfo = handleWinner(newSquares)
    
    if(winningInfo.winner){
      setWinningLine(winningInfo.winningPath)
    }
    else{
      setWinningLine([])
    }
  }

  const jumpUpNext = (move) => {
    setCurrentMove(move)
    setIsNext(move % 2 === 0 )

    const winningInfo = handleWinner(history[move])

    if(winningInfo.winner){
      setWinningLine(winningInfo.winningPath)
    }
    else{
      setWinningLine([])
    }
  }

  const handleWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], winningPath: [a, b, c] };
      }
    }
    return { winner: null, winningPath: [] };
  };

  const resetGame = () => {
    setIsLoading(true)
    setTimeout(() => {
      setHistory([Array(9).fill(null)])
      setIsNext(true)
      setCurrentMove(0)
      setWinningLine([])
      setPlayers({
        playerX : 'Player X',
        playerO : 'Player O',
      })
      setScores({
        playerX : 0 ,
       playerO : 0 ,
      })
      setIsLoading(false)
    } , 1500)
  }

  const handlePlayerChange = (player , newName) => {
     setPlayers((prevPlayers) => (
      {
        ...prevPlayers , 
        [player] : newName ,
      }
     ))
  }

   const moves = history.map((squares, move) => {
    let description ;
     description = move > 0 ? 'go to move' + move : 'go to start over game!'
    return(
      <li key={move}>
        <button onClick={() => jumpUpNext(move)} className = "jump-btn">{description}</button>
      </li>
    )
  })

  return (
    <div className = "board">
      <div className="game-board">
      {isLoading ? (
        <div className = "spinner">
          <ClipLoader color='#000' loading = {isLoading} size = {50}/>
        </div>
      ) : (
        <Board squares = {currentSquares}
        isNext = {isNext} onPlay = {handlePlay}
        winningLine = {winningLine} 
        players = {players}
        scores = {scores}
        updateScores = {updateScores}/>
      )}

      </div>
      <div className = "game-info">
      <article className = "player_customization">

        <div className = "input-group">
        <label>
          Player X Name:
          <input type = "text" value = {players.playerX} onChange={ (e) => handlePlayerChange('playerX' , e.target.value )}/>
         </label>
        </div>
        <div>
        <label>
          Player O Name:
          <input type = "text" value = {players.playerO} onChange={ (e) => handlePlayerChange('playerO' , e.target.value )}/>
         </label>
        </div>
      </article>
        <ol className = "game-orderList">
          <button onClick={resetGame} className = "reset-btn">Reset Game</button>
          {moves}
        </ol>
      </div>
    </div>
  )
}

export default App
