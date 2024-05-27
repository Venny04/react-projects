import { sidbarIconsPrimary, sidbarIconsSecond } from '../../assets/Icons';
import Menu from '../menu/Menu';
import './sidbar.css';

const Sidbar = () => {
  return (
    <article className='sidbar-article'>
      <Menu  title={'DashBoard'} iconsList={sidbarIconsPrimary}/>
      <Menu  title={'Atividades'} iconsList={sidbarIconsSecond}/>
    </article>
  )
}

export default Sidbar