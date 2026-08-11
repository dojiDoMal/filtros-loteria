import NumberDisplay from '../NumberDisplay/NumberDisplay'
import Button, { TipoBotao } from '../Button/Button'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import './ListaJogos.css'

export default function ListaJogos({ jogos, variant }) {
  return (
    <ol className="lista-jogos">
      {jogos.map((j, i) => (
        <li key={i}>
          <NumberDisplay jogo={j} variant={variant} />
          <Button tipo={TipoBotao.DISCRETO} icon={faEllipsisVertical} />
        </li>
      ))}
    </ol>
  )
}
