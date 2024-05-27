import { Icons } from '../../assets/Icons';
import './header.css';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
// import { useLocation } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { UseGlobalContext } from '../../utils/context/GlobalContext';
const Hearder = () => {
  // const location = useLocation();
  // const pathname = location.pathname;
  const {showChat, setShowChat } = UseGlobalContext();
  const handleIconClick = (name) => {
    if(name === 'Menssagens'){
      return setShowChat(!showChat);
    }
  }
  return (
    <header className='header-section'>
        <a href="#">
          <AutoStoriesIcon />
          Bula Admin
        </a>
     
      <nav>
        <ul>
          {
            Icons?.map(({Icon,name,path,title}) => (
              <li key={name} onClick={e => handleIconClick(name)}>
                <Box sx={{ color: 'action.active' }}>
                  <Badge color="secondary" variant="dot">
                    <Tooltip title={name}>
                      <IconButton>
                        <Icon />
                      </IconButton>
                    </Tooltip>
                  </Badge>
                </Box>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}

export default Hearder