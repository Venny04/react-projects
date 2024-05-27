import { Link } from 'react-router-dom';
import './analityCard.css';

const AnalityCard = ({total, Icon, title, path}) => {
  return (
    <li className='Anality-card'>
      <div className="details">
        <span className='total'>{total}</span>
        <Link to={path}>{title}</Link>
      </div>
      <div className="svg-icon-box">
        {<Icon />}
      </div>
    </li>
  )
}

export default AnalityCard