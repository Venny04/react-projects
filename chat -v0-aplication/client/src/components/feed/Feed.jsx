import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import UserChat from '../userChat/UserChat'
import UserInfo from '../userInfo/UserInfo'
import './feed.css'

const Feed = () => {
  const {seletedUser}  = useContext(UserContext);
  // console.log(seletedUser?.userId)
  return (
   
    <>
      {
        seletedUser ? (
          <section className='feed-section'>
            <UserChat userid={seletedUser?.userId}/>
            <UserInfo />
          </section>
        ): (<div className='section-feed-intro'>
          <h2>bem vido ao feed message</h2>
          <span>Selecione um usuario para começar uma conversa</span>
        </div>)
      }
    </>
  )
}

export default Feed