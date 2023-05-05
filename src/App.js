import { useState } from 'react'
import Board from './components/Board'

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [ascending, setAscending] = useState(true)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description = move
    ? 'Go to move #' + move
    : 'Go to game start'

    return (
        <li key={move}>
          <button className='btn' onClick={() => jumpTo(move)}>{description}</button>
        </li>
    )
  })

  return (
      <div className='container mx-auto flex flex-row justify-center'>
        <div>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className='ml-5'>

          <ol>
            <li className='list-item'>You are at move #{currentMove}</li>
            <li>
                <button
                    className='btn'
                    onClick={() => setAscending(!ascending)}>
                    {ascending ? 'Sort descending' : 'Sort ascending'}
                </button>
            </li>
            {ascending ? moves : moves.reverse()}
          </ol>
        </div>
      </div>
  )
}
