import { Link } from 'react-router-dom';
import './cadastroContainer.css';
import { cadastrarIcons } from '../../assets/Icons';

const CadastroContainer = () => {
  return (
    <article className='cadastrar-container'>
        <ul>
          {cadastrarIcons.map(({Icon,desc,name,path}, idx) => (
            <li key={idx}>
              <Link to={path}>
                <div className="icon-box">
                  <Icon />
                </div>
                <div>
                  <span>{name}</span>
                  <p>{desc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
    </article>
  )
}

export default CadastroContainer