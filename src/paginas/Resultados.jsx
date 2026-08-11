import { faCopy, faTrophy, faXmark } from '@fortawesome/free-solid-svg-icons'
import Button, { TipoBotao } from '../componentes/Button/Button'
import Card from '../componentes/Card/Card'
import ListaJogos from '../componentes/ListaJogos/ListaJogos'
import Resumo from '../componentes/Resumo/Resumo'

export default function Resultados({ resultado, removidos }) {
  return (
    <div className="col">
      <Resumo aprovados={resultado.length} excluidos={removidos.length} />

      <Card
        icon={faTrophy}
        iconClass="card-header-icon-success"
        title="Aprovados"
        subtitle="Jogos que passaram nos filtros"
        action={
          <Button
            tipo={TipoBotao.AUXILIAR}
            icon={faCopy}
            disabled={resultado.length === 0}
            label="Copiar tudo"
            onClick={() => navigator.clipboard.writeText(resultado.join('\n'))}
          />
        }
      >
        {resultado.length > 0 && <ListaJogos jogos={resultado} />}
      </Card>

      <Card
        icon={faXmark}
        iconClass="card-header-icon-danger"
        title="Excluídos"
        subtitle="Jogos que não passaram nos filtros"
        action={
          <Button
            tipo={TipoBotao.AUXILIAR}
            disabled={removidos.length === 0}
            icon={faCopy}
            label="Copiar tudo"
          />
        }
      >
        {removidos.length > 0 && <ListaJogos jogos={removidos} />}
      </Card>
    </div>
  )
}
