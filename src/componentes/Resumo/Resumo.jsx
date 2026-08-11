import { faCircleCheck, faCircleDot, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Resumo.css'

export default function Resumo({ aprovados, excluidos, total, large }) {
  if (large) return (
    <div className="resumo">
      <div className="resumo-cards">
        <div className="resumo-item-lg">
          <FontAwesomeIcon className="resumo-icon success" icon={faCircleCheck} />
          <span className="resumo-item-qtd-lg">{aprovados}</span>
          <span className="resumo-label success">Aprovados</span>
        </div>
        <div className="resumo-item-lg">
          <FontAwesomeIcon className="resumo-icon danger" icon={faCircleXmark} />
          <span className="resumo-item-qtd-lg">{excluidos}</span>
          <span className="resumo-label danger">Excluídos</span>
        </div>
        <div className="resumo-item-lg">
          <FontAwesomeIcon className="resumo-icon info" icon={faCircleDot} />
          <span className="resumo-item-qtd-lg">{total}</span>
          <span className="resumo-label info">Total</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="resumo">
      <div className="resumo-cards">
        <div className="resumo-item aprovados"><span>Aprovados</span><span className="resumo-item-qtd">{aprovados}</span></div>
        <div className="resumo-item excluidos"><span>Excluídos</span><span className="resumo-item-qtd danger">{excluidos}</span></div>
      </div>
    </div>
  )
}
