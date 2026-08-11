import './NumberDisplay.css'

export default function NumberDisplay({ jogo, hint, variant }) {
  return (
    <div className='number-display-group'>
      <div className='number-display-numbers'>
        {jogo.split('-').map((n, i) => <span key={i} className={`number-display${variant === 'danger' ? ' danger' : ''}`}>{n}</span>)}
      </div>
      {hint && (
        <span className='number-display-help'>{hint}</span>
      )}
    </div>
  )
}
