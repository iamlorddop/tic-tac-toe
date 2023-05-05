import Square from './Square'

export default function Board({ xIsNext, squares, onPlay }) {
    const winner = calculateWinner(squares)
    let status

    if (winner) {
        status = 'Winner: ' + winner.winner
    } else if(!squares.includes(null)) {
        status = 'Nobody won'
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
        let winningSquare = winner && winner.winningSquares.includes(i) ? true : false

        return (
            <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                winningSquare={winningSquare} />
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
                return {
                    winner: squares[a],
                    winningSquares: lines[i]
                }
            }
        }
        return null
    }

    return (
        <>
            <div className='mb-2.5'>{status}</div>
            < BoardRow />
        </>
    )
}