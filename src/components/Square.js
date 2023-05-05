export default function Square({ value, onSquareClick, winningSquare }) {
    const winningSquareStyle = {
        color: '#fff',
        backgroundColor: '#b8e387'
    }

    return (
        <button
            className='square w-9 h-9 font-bold leading-8 text-center float-left bg-white'
            style={winningSquare ? winningSquareStyle : null}
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}