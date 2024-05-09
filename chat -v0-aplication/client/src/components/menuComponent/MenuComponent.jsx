import SearchIcon from '@mui/icons-material/Search';

import './menuComponent.css';

const MenuComponent = ({ placeholder, list_btns }) => {
  return (
    <aside className='menuComponent'>
      <article className="search-section">
        <div className='search-icon'>
          <SearchIcon />
        </div>
        <input type="text" name='search' placeholder='pequise por menssagem '/>
      </article>
      <article className='filter-btns-container'>
          <ul>
            <li>
              <button>todos</button>
            </li>
            <li>
              <button>não lidas</button>
            </li>
            <li>
              <button>online</button>
            </li>
          </ul>
      </article>
    </aside>
  )
}

export default MenuComponent