import { Hearder, Main, Sidbar } from '../../components';
import './home.css';
import ChatContainer from '../../components/chatContainer/ChatContainer';
import { UseGlobalContext } from '../../utils/context/GlobalContext';

const Home = () => {
  const {showChat} = UseGlobalContext();

  return (
    <section className='home-section'>
      <Hearder />
      <article className='primary-section'>
        <Sidbar />
        <Main />
      </article>
      <ChatContainer /> 
    </section>
  )
}

export default Home