import { useContext } from 'react'
import { Home, Login } from './pages'
import { GlobalContext } from './utils/context/GlobalContext'

const App = () => {
  const { userAuth } = useContext(GlobalContext);
  return (
    <section className='container'>
      {
        userAuth ? (
          <Home />
        ): (<Login /> )
      }
      
    </section>
  )
}

export default App