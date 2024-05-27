import { Route, Routes } from 'react-router-dom';
import { CreateAccountForm, FormLogin } from '../../components'

import './login.css';

const Login = () => {
  return (
    <div className='login-page'>
      <Routes>
        <Route index path='/' element={<FormLogin />}/>
        <Route index path='/create-account' element={<CreateAccountForm />}/>
      </Routes>
    </div>
  )
}

export default Login