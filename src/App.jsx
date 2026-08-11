import { faCopy, faTrophy, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FILTROS, filtrar } from './filtro'
import { useState, useMemo } from 'react'
import SwipeableTabs from './componentes/SwipeableTabs/SwipeableTabs'
import Button, { TipoBotao } from './componentes/Button/Button'
import Card from './componentes/Card/Card'
import ListaJogos from './componentes/ListaJogos/ListaJogos'
import Navbar from './componentes/Navbar/Navbar'
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

  const tabs = ['filtros', 'resultados']
  const activeIndex = tabs.indexOf(tab)

  return (
    <div className="container">
      <Navbar tab={tab} setTab={setTab} />

      <SwipeableTabs tabs={tabs} activeIndex={activeIndex} onTabChange={i => setTab(tabs[i])}>
        <div className="col filtros">
          <div className="entrada">
            <label><span>1</span>Seus jogos<button>?</button><button>📋 Colar</button></label>
            <textarea
              value={texto}
              onChange={e => setTexto(e.target.value)}
              placeholder={'01-02-03-04-05\n06-07-08-09-10'}
              rows={6}
            />
            <span className="count">{total} {total === 1 ? 'jogo inserido' : 'jogos inseridos'}</span>
          </div>
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

        <div className="col">
          <Card
            icon={faTrophy}
            iconClass="card-header-icon-success"
            title="Aprovados"
            subtitle="Jogos que passaram nos filtros"
            action={<Button tipo={TipoBotao.AUXILIAR} icon={faCopy} label="Copiar tudo" />}
          >
            <ListaJogos jogos={resultado} />
          </Card>

          <Card
            icon={faXmark}
            iconClass="card-header-icon-danger"
            title="Excluídos"
            subtitle="Jogos que não passaram nos filtros"
            action={<Button tipo={TipoBotao.AUXILIAR} icon={faCopy} label="Copiar tudo" />}
          >
            <ListaJogos jogos={removidos} variant="danger" />
          </Card>
        </div>
      </SwipeableTabs>
    </div>
  )
}
