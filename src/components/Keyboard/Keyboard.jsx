import './Keyboard.css';

export default function Keyboard({ keyValidation }) {
  const firstRow = ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const secondRow = ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'];
  const thirdRow = ['W', 'X', 'C', 'V', 'B', 'N'];

  return (
    <div className='keyboard'>
      <div className='key-row'>
        {firstRow.map((letter, index) => {
          return <div className={`key`} key={index}>{letter}</div>
        })}
      </div>
      <div className='key-row'>
        {secondRow.map((letter, index) => {
          return <div className={`key`} key={index}>{letter}</div>
        })}
      </div>
      <div className='key-row'>
        {thirdRow.map((letter, index) => {
          return <div className={`key`} key={index}>{letter}</div>
        })}
      </div>
    </div>
  )
}