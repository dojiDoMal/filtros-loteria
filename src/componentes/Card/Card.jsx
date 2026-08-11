import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import Button, { TipoBotao } from '../Button/Button'
import './Card.css'

export default function Card({ icon, iconClass, iconBadge, title, subtitle, action, children, showButtonHint }) {
  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-header-info'>
          {(icon || iconBadge) && (
            <span className='card-header-icon-wrapper'>
              {icon && <span className={`card-header-icon ${iconClass ?? ''}`}><FontAwesomeIcon icon={icon} /></span>}
              {iconBadge}
            </span>
          )}
          <label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{title}</span>{showButtonHint && (<Button tipo={TipoBotao.DISCRETO_ALT} label={'?'} />)}
            </div>
            {subtitle && <span className='card-subtitle'>{subtitle}</span>}
          </label>
        </div>
        {action}
      </div>
      {children && (
        <div className='card-content'>{children}</div>
      )}
    </div>
  )
}
