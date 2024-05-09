import { useContext, useState } from 'react';
import { fecthAPI } from '../../assets/api/fecthAPIdata';
import './formLogin.css'
import { UserContext } from '../../contexts/UserContext';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

const FormLogin = () => {
    const [handleError, setHendleError] = useState('');
    const { login } = useContext(UserContext);
    
    const navigator = useNavigate();

    const handleSubmit =async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if(!form) return;
        const formdata = new FormData(form);

        const userPassword = formdata.get('userPassword');
        const userEmail = formdata.get('userEmail');

        const data = {
            userEmail, userPassword
        }
        const result = await fecthAPI('http://localhost:8080/api/v1/auth/login','POST',data,'','');

        if(result){
            const { doc, token } = result;
            login(doc, token);
            navigator('/')
        }
    }
  return (
   <Routes>
       

        <Route path='/'>
            <Route index path='/' element={(
                <form onSubmit={handleSubmit} className='form-filde'>
                <h2>Login</h2>
                <div className="form-input-fild">
                    <label htmlFor="userEmail">Email</label>
                    <input type="email" name='userEmail' id='userEmail' />
                </div>
                <div className="form-input-fild">
                    <label htmlFor="userPassword">password</label>
                    <input type="password" name='userPassword' id='userPassword' />
                </div>
                <button type='submit'>Login</button>
                <Link to={'create-account'}>
                    criar uma conta
                </Link>
                </form>
            )} />
            <Route path='/create-account' element={<h1>google</h1>} />
        </Route>
   </Routes>
  )
}

export default FormLogin