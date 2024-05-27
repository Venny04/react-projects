import { Avatar, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import './currentUserAccount.css'
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAPIdata } from '../../assets/api/fecthSchoolAPI';
import { GlobalContext } from '../../utils/context/GlobalContext';
const CurrentUserAccount = () => {
  const { id } = useParams();
  const naviagte = useNavigate();
  const [user, setUser] = useState(null);
  const {logout} = useContext(GlobalContext);

  if(!id) return naviagte('/') ;
  // nomeCompleto,
  //       genero,
  //       imagemDoUsuario,
  //       residencia,
  //       numeroDoTelefone,
  //       numeroDoBI,
  //       cidade,
  //       municipio,
  //       provincia,
  //       dataDeNascimento,
  //       nomeDoPai,
  //       nomeDaMae,
  //       nomeDoEncarregado,
  //       nivelAcademico,
  //       turma,
  //       turno,
  //       nivelDeParentesco,
  //       cargo,
  //       profissao,
  //       localDeTrabalho

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetchAPIdata(`http://localhost:8080/api/v1/admin/${id}?entidade=professores`, 'GET', '', '');

      if(!response) return;
      setUser(response.data);
    }
    getUserData();
  }, [id]);

  const handleLogOut = () => {
    logout()
    naviagte('/');
    console.log(logout());
  }
  return (
    <section className="current-user-account">
      <article className='current-user-painel'>
        <div className='user-image'>
          <Avatar style={{
            width: '100px',
            height: '100px'
          }} src='' alt={user?.nomeCompleto} />
        </div>
        <aside className='current-user-info'> 
            <div>
              <label htmlFor="nomeCompleto">Nome:</label>
              <input type="text" id='nomeCompleto' value={user?.nomeCompleto} name='nomeCompleto' disabled />
            </div>
            <div>
              <label htmlFor="numeroDoTelefone">Telefone:</label>
              <input disabled type="tel" value={user?.numeroDoTelefone} id='numeroDoTelefone' name='numeroDoTelefone' />
            </div>
            <div>
              <label htmlFor="email">email:</label>
              <input disabled type="email" value={user?.email} id='email' name='email' style={{textTransform: 'lowercase'}} />
            </div>

            <div>
              <label htmlFor="numeroDoBI">BI:</label>
              <input disabled type="text" value={user?.numeroDoBI} id='numeroDoBI' name='numeroDoBI' />
            </div>
            <div>
              <label htmlFor="turma">Turma:</label>
              <input disabled type="text" value={user?.turma} id='turma' name='turma' />
            </div>
            <div>
              <label htmlFor="cargo">Disciplinas:</label>
              <input disabled type="text" value={user?.cargo} id='cargo' name='cargo' />
            </div>
            {/* <div>
              <label htmlFor="cidade">cidade:</label>
              <input disabled type="text" id='cidade' name='cidade' />
            </div>
            <div>
              <label htmlFor="dataDeNascimento">data de nescimento:</label>
              <input disabled type="text" id='dataDeNascimento' name='dataDeNascimento' />
            </div> */}
        </aside>
        <Button className='log-out' onClick={handleLogOut}>
          <span>sair </span>

          <LogoutIcon />
        </Button>
      </article>
    </section>
  )
}

export default CurrentUserAccount