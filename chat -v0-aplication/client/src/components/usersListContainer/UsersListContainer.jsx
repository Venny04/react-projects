import { useContext } from 'react';
import UserCard from '../userCard/UserCard';

import './usersListContainer.css';
import { UserContext } from '../../contexts/UserContext';

const UsersListContainer = ({title}) => {
  const {userChatList, setUserChatList} = useContext(UserContext);

  return (
    <aside className='users-list'>
        <ul>
            {
             userChatList?.length < 1 ? (<h2 className='list-title'>Voce não tem nenhuma messagem <span>comesse uma nova conversa</span></h2>): (
              userChatList?.map(({userName, _id}) => (
                <UserCard name={userName} userId={_id} key={_id} />
              ))
             )
            }
        </ul>
    </aside>
  )
}

export default UsersListContainer