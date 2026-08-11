import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Button.css'

export const TipoBotao = {
  DISCRETO: 'discreto',
  AUXILIAR: 'auxiliar',
}

export default function Button({ tipo = TipoBotao.AUXILIAR, icon, label, ...props }) {
  return (
    <button className={`btn-${tipo}`} {...props}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {label && <span>{label}</span>}
    </button>
  )
}
