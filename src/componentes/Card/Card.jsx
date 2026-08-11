import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Card.css'

export default function Card({ icon, iconClass, title, subtitle, action, children }) {
  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-header-info'>
          {icon && <span className={`card-header-icon ${iconClass ?? ''}`}><FontAwesomeIcon icon={icon} /></span>}
          <label>
            <span>{title}</span>
            {subtitle && <span className='card-subtitle'>{subtitle}</span>}
          </label>
        </div>
        {action}
      </div>
      <div className='card-content'>{children}</div>
    </div>
  )
}
