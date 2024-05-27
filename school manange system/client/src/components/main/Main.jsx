import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import DashBoard from '../dashBoard/DashBoard';


import './main.css';
import ListTable from '../listTable/ListTable';
import Porfiles from '../porfile/Porfiles';
import CadastroContainer from '../cadastroContainer/CadastroContainer';
import Cadastramento from '../cadastramento/Cadastramento';
import MyEditor from '../editor/MyEditor';
import { useContext } from 'react';
import { GlobalContext } from '../../utils/context/GlobalContext';
import CurrentUserAccount from '../currentUserAccount/CurrentUserAccount';

const Main = () => {
  const {userAuth} = useContext(GlobalContext);
  return (
    <article className='main-article'>
  <Routes>
    <Route index element={<DashBoard />} />
    <Route path="/alunos" element={<ListTable type='alunos' />} />
    <Route path="/alunos/porfile/:id" element={<Porfiles type='alunos' />} />
    <Route path="/professores/porfile/:id" element={<Porfiles type='professores' />} />
    <Route path="/professors" element={<ListTable type='professores' />} />
    <Route path="/cadastrar" element={userAuth?.role === 'admin'?<CadastroContainer />:<DashBoard />} />
    <Route path="/cadastrar/sala" element={userAuth?.role === 'admin'?<CadastroContainer />:<DashBoard />} />
    <Route path="/cadastrar/aluno" element={userAuth?.role === 'admin'?<Cadastramento type='aluno' />: <DashBoard />} />
    <Route path="/cadastrar/professor" element={userAuth?.role === 'admin'? <Cadastramento type='professor' />: <DashBoard />} />


    <Route path="/notas" element={<MyEditor type='professor' />} />
    <Route path="/account/:id" element={<CurrentUserAccount />} />


  </Routes>
</article>
  )
}

export default Main