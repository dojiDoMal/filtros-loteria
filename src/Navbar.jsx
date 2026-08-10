export default function Navbar({ tab, setTab }) {
  return (
    <>
      <nav className="nav-top">
        {tab === 'resultados'
          ? <button className="nav-icon" onClick={() => setTab('filtros')}>‹</button>
          : <button className="nav-icon">☰</button>
        }
        <span className="nav-title">{tab === 'resultados' ? 'Resultados' : 'Filtro de Loteria'}</span>
        <button className="nav-icon">⚙</button>
      </nav>
      <nav className="nav-bottom">
        <button className={tab === 'filtros' ? 'active' : ''} onClick={() => setTab('filtros')}>Filtros</button>
        <button className={tab === 'resultados' ? 'active' : ''} onClick={() => setTab('resultados')}>Resultados</button>
      </nav>
    </>
  )
}
