import { Square } from "./Square"
import './Board.css'
import { useEffect, useState } from "react"

export const Board = ({ squares , isNext , onPlay , winningLine , players , scores , updateScores}) => {

  const[status , setStatus ] = useState(`Next Player: ${players.playerX}`)

    const handleClick = (current_index) => {
        if(squares[current_index] || handleWinner(squares).winner){
            return ;
        }

      const newSquares = squares.slice()
      newSquares[current_index] = isNext ? 'X' : 'O'
      onPlay(newSquares)
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

       const hasWinner = lines.some(([a,b,c]) => {
           return squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
        })

        if( hasWinner ){
          const winningLine = lines.find(([a,b,c])=> {
            return (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
          })
          return { winner : squares[winningLine[0]] , winningPath : winningLine};
        }
        return { winner : null , winningPath : [] }
      }

      useEffect(() => {
        const winner = handleWinner(squares).winner
      if(winner){
        const winnerName = winner === 'X' ? players.playerX : players.playerO;
         if( status !== `Winner ${winnerName}`){
            setStatus(`Winner ${winnerName}`)  // triggers and impeccably rerendered out here
            updateScores(winner)
         }
      }
      else if(isDraw(squares)){
        setStatus('It is a draw!!')
      }
      else{
        const nextPlayer = isNext ? players.playerX : players.playerO;
        if( status !== `Next Player : ${nextPlayer}`){
          setStatus(`Next Player : ${nextPlayer}`)
        }
      }
      },[ squares , isNext, status , players ])

      const isDraw = (squares) => {
        return !handleWinner(squares).winner && squares.every((square) => square !== null)
      }

      const renderedSquare = (i) => {
        let square_class = 'square'
        square_class += winningLine.includes(i) ? ' winning_square' : ''

        if( squares[i] === 'X' ){
          square_class += ' x'
        }
        else if(squares[i] === 'O'){
            square_class += ' o'
        }
        return (
          <Square 
          className = {square_class}
          key ={i} values = {squares[i]} 
          handleClick ={() => handleClick(i)}/>
        )
      }
    return(
        <>
        <section className = "board-container"> 
          <div className = "board-scores">
          <div>{players.playerX} : <span>{scores.playerX}</span></div>
          <div>{players.playerO} : <span>{scores.playerO}</span></div>
          </div>
        <div className = "status">{status}</div>
        <div className = "board-row">
          {renderedSquare(0)}
          {renderedSquare(1)}
          {renderedSquare(2)}
        </div>
        <div className = "board-row">
         {renderedSquare(3)}
         {renderedSquare(4)}
         {renderedSquare(5)}
        </div>
        <div className = "board-row">
        {renderedSquare(6)}
        {renderedSquare(7)}
        {renderedSquare(8)}
        </div>
        </section>
        </>
    )
}
