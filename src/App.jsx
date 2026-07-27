import { useState, useMemo } from 'react'
import { FILTROS, filtrar } from './filtro'
import './App.css'

export default function App() {
  const [texto, setTexto] = useState('')
  const [ativos, setAtivos] = useState(new Set())

  const toggle = id =>
    setAtivos(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const resultado = useMemo(() => filtrar(texto, ativos), [texto, ativos])

  const total = texto.trim() ? texto.trim().split('\n').filter(Boolean).length : 0
  const removidos = useMemo(() => {
    const s = new Set(resultado)
    return texto.trim().split('\n').map(j => j.trim()).filter(j => j && !s.has(j))
  }, [texto, resultado])

  return (
    <div className="container">
      <h1>Filtra Jogos Quina</h1>

      <div className="main">
        <div className="col">
          <label>Jogos de entrada</label>
          <textarea
            value={texto}
            onChange={e => setTexto(e.target.value)}
            placeholder={'01-02-03-04-05\n06-07-08-09-10'}
            rows={20}
          />
          <span className="count">{total} jogo(s)</span>
        </div>

        <div className="col filtros">
          <label>Filtros</label>
          {FILTROS.map(f => (
            <label key={f.id} className="check">
              <input
                type="checkbox"
                checked={ativos.has(f.id)}
                onChange={() => toggle(f.id)}
              />
              {f.label}
            </label>
          ))}
        </div>

        <div className="col">
          <label>Jogos filtrados</label>
          <textarea readOnly value={resultado.join('\n')} rows={20} />
          <span className="count">{resultado.length} jogo(s)</span>
          <label style={{ marginTop: '1rem' }}>Jogos removidos</label>
          <textarea readOnly value={removidos.join('\n')} rows={10} className="removidos" />
          <span className="count">{removidos.length} jogo(s) removido(s)</span>
        </div>
      </div>
    </div>
  )
}
