import { useState, useMemo } from 'react'
import { FILTROS, filtrar } from './filtro'
import Navbar from './Navbar'
import './App.css'

export default function App() {
  const [texto, setTexto] = useState('')
  const [ativos, setAtivos] = useState(new Set(FILTROS.map(f => f.id)))
  const [tab, setTab] = useState('filtros')

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
      <Navbar tab={tab} setTab={setTab} />

      {tab === 'filtros' && <div className="entrada">
        <label><span>1</span>Seus jogos<button>?</button><button>📋 Colar</button></label>
        <textarea
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder={'01-02-03-04-05\n06-07-08-09-10'}
          rows={6}
        />
        <span className="count">{total} {total === 1 ? 'jogo inserido' : 'jogos inseridos'}</span>
      </div>}

      <div className="main">
        {tab === 'filtros' && (
          <div className="col filtros">
            <label><span>2</span>Filtros<button>Salvar perfil</button></label>
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
            <button
              className="btn-aplicar"
              disabled={total === 0}
              onClick={() => { if (total > 0) { setTab('resultados'); window.scrollTo(0, 0) } }}
            >
              Aplicar filtros
            </button>
            <button
              className="btn-limpar"
              onClick={() => setAtivos(new Set())}
            >
              Limpar filtros
            </button>
            <div className="resumo">
              <label>Resumo</label>
              <div className="resumo-cards">
                <div className="resumo-item aprovados"><span>Aprovados</span><span>{resultado.length}</span></div>
                <div className="resumo-item excluidos"><span>Excluídos</span><span>{removidos.length}</span></div>
                <div className="resumo-item"><span>Total</span><span>{total}</span></div>
              </div>
            </div>
          </div>
        )}
        {tab === 'resultados' && (
          <div className="col">
            <label><span>🏆</span>Aprovados<button>📋Copiar tudo</button></label>
            <ul className="lista-jogos">
              {resultado.map((j, i) => <li key={i}>{j}</li>)}
            </ul>
            <label style={{ marginTop: '1rem' }}><span>❌</span>Excluídos<button>📋Copiar tudo</button></label>
            <ul className="lista-jogos removidos">
              {removidos.map((j, i) => <li key={i}>{j}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
