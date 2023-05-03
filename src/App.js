import { useState } from 'react'

function Square({ value, onSquareClick }) {
  return (
      <button
          className='square w-9 h-9 font-bold leading-8 text-center float-left bg-white'
          onClick={onSquareClick}
      >
        {value}
      </button>
  )
}

export function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares)
  let status

  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    const nextSquares = squares.slice()

    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }

    onPlay(nextSquares)
  }

  function renderSquare(i) {
    return (
        <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
    )
  }

  function BoardRow() {
    let boardSquares = []

    for (let row = 0; row < 3; row++) {
      let boardRow = []
      for (let col = 0; col < 3; col++) {
        boardRow.push(renderSquare((row * 3) + col))
      }
      boardSquares.push(<div key={row}>{boardRow}</div>)
    }

    return (
        <>
          {boardSquares}
        </>
    )
  }

  return (
      <>
        <div className='mb-2.5'>{status}</div>
        < BoardRow />
      </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
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
            <li><button className='btn' onClick={() => console.log(moves)}>Sort moves</button></li>
            {moves}
          </ol>
        </div>
      </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
