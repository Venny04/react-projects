import { useContext } from 'react';
import { fetchAPIdata } from '../../assets/api/fecthSchoolAPI';
import './login.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import axios from "axios";
import { GlobalContext } from '../../utils/context/GlobalContext';

import toast from 'react-hot-toast';

const Login = () => {


  const {login} = useContext(GlobalContext);

  
  const handlerSubmit = async (e) => {
      e.preventDefault();

    

    const form = e.currentTarget;
    if(!form) return;
    const formdata = new FormData(form);
    const email = formdata.get('email');
    const senha = formdata.get('senha');
    if(!email || !senha) return 'Erro no cadastro';

    const data = {
      email, senha
    }
    if(!data) return '';
    console.log(email, senha);
  try {

        let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNiNDBiMDRiMzRmM2YzOTI2ZWI0ZWYiLCJpYXQiOjE3MTUxNTkyMTZ9.cHRn4hDT-aNBA__wRjKQmHZcPFLEtON05p0SBHHGOhY",
        "Content-Type": "application/json" 
        }

        let bodyContent = JSON.stringify({
          "email": email.trim(),
          "senha": senha.trim()
        });

        let reqOptions = {
          url: "http://localhost:8080/api/v1/professor/auth/login",
          method: "POST",
          headers: headersList,
          data: bodyContent,
        }

      let response = await axios.request(reqOptions);
      login(response.data.user,response.data.token);

       toast.success('login sucedido');
    } catch (error) {
       toast.error(error.response?.data?.message);
    
      console.log(error.response?.data?.message)
    }
      
  }
  return (
    <section className='container-login'>
      <div className="school-desin-name">
        bula admin
      </div>
        <form onSubmit={handlerSubmit} className='form-container'>
          <h3> <MenuBookIcon/> Login</h3>
          <div>
            <label htmlFor="email">Emali</label>
            <input type="email" style={{textTransform: 'lowercase'}} id='email' name='email' placeholder='adicione um email valido' />
          </div>
          <div>
            <label htmlFor="senha">senha</label>
            <input type="password" style={{textTransform: 'lowercase'}} id='senha' name='senha' placeholder='adicone uma palavra passe'/>
          </div>
          <button>Login</button>
        </form>
    </section>
  )
}

export default Login