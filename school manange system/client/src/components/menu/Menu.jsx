import { Link } from 'react-router-dom';

import './menu.css';
import { useContext } from 'react';
import { GlobalContext } from '../../utils/context/GlobalContext';

const Menu = ({ title, iconsList }) => {
  const {userAuth} = useContext(GlobalContext);
  return (
    <menu className='menu-section-list'>
      <h2>{title}</h2>
      <ul>
        {
          iconsList.map(({Icon,name,path}) => (
            (userAuth?.role !== 'admin' && name === 'Cadastrar') ? null : (

            <li key={name}>
              <Link to={path == '/account' ? path + '/' + userAuth?._id : path}>
                <div className='svg-icon-box'>
                  {<Icon />}
                </div>
                <span>{name}</span>
              </Link>
            </li>
            )
          ))
        }
      </ul>
    </menu>
  )
}

export default Menu