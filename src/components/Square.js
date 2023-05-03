export default function Square({ value, onSquareClick }) {
    return (
        <button
            className='square w-9 h-9 font-bold leading-8 text-center float-left bg-white'
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}