import { faCopy, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FILTROS, FILTROS_CONFIG_DEFAULT } from '../filtro'
import Button, { TipoBotao } from '../componentes/Button/Button'
import Card from '../componentes/Card/Card'
import Resumo from '../componentes/Resumo/Resumo'
import NumberIcon from '../componentes/NumberIcon/NumberIcon'


export default function Filtros({ texto, setTexto, ativos, toggle, filtrosConfig, setFiltrosConfig, expandidos, toggleExpandido, resultado, removidos, total, setTab }) {
  return (
    <div className="col filtros">
      <Card
        iconBadge={<NumberIcon number={1} />}
        showButtonHint
        title="Seus jogos"
        action={<Button tipo={TipoBotao.AUXILIAR} icon={faCopy} label="Colar" onClick={async () => { const t = await navigator.clipboard.readText(); setTexto(prev => prev ? prev + '\n' + t : t) }} />}
      >
        <textarea
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder={'01-02-03-04-05\n06-07-08-09-10'}
          rows={6}
        />
        <span style={{ fontSize: '0.8rem', color: 'var(--color-white-active)' }}>
          {`${total} ${total === 1 ? 'jogo inserido' : 'jogos inseridos'}`}
        </span>
      </Card>

      <Card
        iconBadge={<NumberIcon number={2} />}
        iconClass="card-header-icon-success"
        title="Filtros"
        action={<Button tipo={TipoBotao.AUXILIAR} label="Salvar perfil" />}
      >
        <div>
          {FILTROS.map(f => (
            <div key={f.id} className="check">
              <div style={{ minHeight: '32px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                {f.label}
                <Button tipo={TipoBotao.DISCRETO_ALT} label={'?'}></Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={ativos.has(f.id)}
                    onChange={() => toggle(f.id)}
                  />
                  <span className="toggle-slider" />
                </label>
                {f.configSchema && (
                  <Button
                    tipo={TipoBotao.DISCRETO}
                    icon={expandidos.has(f.id) ? faAngleUp : faAngleDown}
                    onClick={e => { e.preventDefault(); toggleExpandido(f.id) }}
                  />
                )}
              </div>
              {f.configSchema && expandidos.has(f.id) && (
                <div className="filtro-config">
                  {f.configSchema.length === 1 && <label className="filtro-config-hidden"><span /><input type="number" /></label>}
                  {f.configSchema.map(({ campo, label, min, max }) => (
                    <label key={campo}>{label} <input
                      type="number"
                      min={campo === 'min' ? min : filtrosConfig[f.id]?.min ?? min}
                      max={campo === 'max' ? max : filtrosConfig[f.id]?.max ?? max}
                      value={filtrosConfig[f.id]?.[campo] ?? FILTROS_CONFIG_DEFAULT[f.id][campo]}
                      onChange={e => setFiltrosConfig(prev => ({ ...prev, [f.id]: { ...prev[f.id], [campo]: Number(e.target.value) } }))}
                    /></label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', marginTop: '16px' }}>
          <button className="btn-limpar" onClick={() => setAtivos(new Set())}>
            Limpar filtros
          </button>
          <Button
            tipo={TipoBotao.PRIMARIO}
            label="Aplicar filtros"
            disabled={total === 0}
            onClick={() => { if (total > 0) { setTab('resultados'); window.scrollTo(0, 0) } }}
          />
        </div>
      </Card>

      <Card
        showButtonHint
        title="Resumo"
        action={<Button tipo={TipoBotao.AUXILIAR} label="Ver detalhes" />}
      >
        <Resumo large aprovados={resultado.length} excluidos={removidos.length} total={total} />
      </Card>
    </div>
  )
}
