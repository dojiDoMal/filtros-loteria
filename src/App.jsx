import { FILTROS, FILTROS_CONFIG_DEFAULT, filtrar } from './filtro'
import { useState, useMemo } from 'react'
import Navbar from './componentes/Navbar/Navbar'
import Filtros from './paginas/Filtros'
import Resultados from './paginas/Resultados'
import './App.css'

export default function App() {
  const [texto, setTexto] = useState('')
  const [ativos, setAtivos] = useState(new Set(FILTROS.map(f => f.id)))
  const [filtrosConfig, setFiltrosConfig] = useState(FILTROS_CONFIG_DEFAULT)
  const [tab, setTab] = useState('filtros')
  const [expandidos, setExpandidos] = useState(new Set())

  const toggleExpandido = id =>
    setExpandidos(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const toggle = id =>
    setAtivos(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const resultado = useMemo(() => filtrar(texto, ativos, filtrosConfig), [texto, ativos, filtrosConfig])

  const total = texto.trim() ? texto.trim().split('\n').filter(Boolean).length : 0
  const removidos = useMemo(() => {
    const s = new Set(resultado)
    return texto.trim().split('\n').map(j => j.trim()).filter(j => j && !s.has(j))
  }, [texto, resultado])

  return (
    <div className="container">
      <Navbar tab={tab} setTab={setTab} />

      <div className="main">
        {tab === 'filtros' && (
          <Filtros
            texto={texto}
            setTexto={setTexto}
            ativos={ativos}
            toggle={toggle}
            setAtivos={setAtivos}
            filtrosConfig={filtrosConfig}
            setFiltrosConfig={setFiltrosConfig}
            expandidos={expandidos}
            toggleExpandido={toggleExpandido}
            resultado={resultado}
            removidos={removidos}
            total={total}
            setTab={setTab}
          />
        )}

        {tab === 'resultados' && (
          <Resultados resultado={resultado} removidos={removidos} />
        )}
      </div>
    </div>
  )
}
