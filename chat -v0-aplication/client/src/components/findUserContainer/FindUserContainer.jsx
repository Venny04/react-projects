import CloseIcon from '@mui/icons-material/Close';
import './findUserContainer.css';
import UserCard from '../userCard/UserCard';
import { useContext, useEffect, useRef, useState } from 'react';
import { fecthAPI } from '../../assets/api/fecthAPIdata';
import { UserContext } from '../../contexts/UserContext';

const FindUserContainer = () => {
    const [usersFind, setUsersFind] = useState(null);
    const [ number, setNumber] = useState('');
    const { showList, setShowList} = useContext(UserContext);
    const [findeUserError, setfindeUserError] = useState('');
    
    const handleFindUser = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if(!form);

        const formdata = new FormData(form);
        
        const usertel = Number(formdata.get('usertel'));
        console.log(usertel);
        if(!usertel) return;
        try {
            const response = await fecthAPI(`http://localhost:8080/api/v1/user/find?number=${usertel}`, 'GET', '', '', '');
            console.log(response);
            if(response){
                setUsersFind(response);
                setNumber('');
            }
        } catch (error) {
            
            setfindeUserError(error?.response?.data);
            console.log(error);
        }
    }

   const handleClose = () => {
    setShowList(false);
    setUsersFind(null);
    setNumber('');
    setfindeUserError('')
   }
  return (
    <aside className={`find-user-container ${showList ? 'show' : ''}`}>
        <h3>Novas messagens 
            <div className='close-pup-btn'>
                <abbr title="Fechar lista" onClick={handleClose}>
                    <CloseIcon />
                </abbr>
            </div>
        </h3>
        <div className='enter-user-tel'>
            <form onSubmit={handleFindUser}>
                <span>To:</span>
                <input type="tel" name='usertel' placeholder='adicione o numero do usuario' onChange={(e) => setNumber(e.currentTarget.value)} value={number} />
            </form>
        </div>
        <ul>
            {
                usersFind ? (
                    <UserCard avatar={usersFind?.userAvatar}  name={usersFind?.userName} userId={usersFind?._id} />
                ):(findeUserError && 
                        <h3 className='find-user-info'>{findeUserError}</h3>
                    )
                
            }
            
        </ul>
    </aside>
  )
}

export default FindUserContainer