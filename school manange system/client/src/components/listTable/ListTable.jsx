import { useContext, useEffect, useState } from 'react';
import LogGovern from '../logGovern/LogGovern'
import toast, { Toaster } from 'react-hot-toast';

import OpenIconSpeedDial from '../ButtonCreate';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { fetchAPIdata } from '../../assets/api/fecthSchoolAPI';

import './listTable.css';
import { GlobalContext } from '../../utils/context/GlobalContext';
import axios from 'axios';






 

const ListTable = ({type}) => {
  const {userAuth} = useContext(GlobalContext);
  const token = userAuth?.token;
  const columns = [
    { field: 'numero', headerName: 'Nº', width: 30 },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'numeroDoBI', headerName: 'Nº do BI', width: 170 },
    { field: 'genero', headerName: 'Gênero', width: 80 },
    { field: 'numeroDoTelefone', headerName: 'Nº do Telafone', width: 170 },
    { field: 'age', headerName: type == 'alunos'?'Idade':'Professor/a de', width: type == 'alunos' ? 50 : 170 },
    { field: 'options', headerName: 'Opções', width: userAuth?.role === 'admin'? 80: 70 },
  ];
  const [turma, setTurma] = useState(null); 
  const [turno, setTurno] = useState(null); 
  const [nivel, setNivel] = useState(null); 
  const [allTurmas, setAllTurmas] = useState([]);
  const [choice, setChoice] = useState('7.1');
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event) => {
    setChoice(event.target.value);
  };
  
  function calcularIdade(mesNascimento, anoNascimento) {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1; // O método getMonth() retorna um valor de 0 a 11, então adicionamos 1 para obter o mês atual corretamente
    const anoAtual = dataAtual.getFullYear();
  
    let idade = anoAtual - anoNascimento;
  
    // Verificar se o mês atual é menor que o mês de nascimento
    if (mesAtual < mesNascimento) {
      idade--;
    }
  
    return idade;
  }
  const getUsersData = async () => {
    try {
     if(!type) return;
     
     const turmas = await fetchAPIdata('http://localhost:8080/api/v1/admin/turmas', "GET", '');

     if(!turmas) return;
     setAllTurmas(turmas?.turmas);
    

     const response = await fetchAPIdata(`http://localhost:8080/api/v1/admin/turma?nome=${choice}`, 'GET');
     if(!response) return;
     setRows(type == 'alunos'? response?.turma?.alunos: response?.turma?.professores);
    
     setTurma(response?.turma.nome);
     setTurno(response?.turma.turno);
     setNivel(response?.turma.nivelAcademinco || response?.turma.nome[0]);
     

     setIsLoading(false);
    } catch (error) {
       console.log(error);
    }  
   }
  const search = async (e) => {

    const search = e.target.value.trim();
    if(!search) return  getUsersData();

   try {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)" 
     }
    let reqOptions = {
      url: `http://localhost:8080/api/v1/aluno/get/search?entidade=${type}&query=${search.toLowerCase()}`,
      method: "GET",
      headers: headersList,
    }
    
    let response = await axios.request(reqOptions);
    if(response.data?.data?.length >= 1)
  console.log(rows[0]?.cargo)

    setRows(response.data.data);
   } catch (error) {
      console.log(error);
   }
  }
  useEffect(() => {
   
    getUsersData();
  }, [ choice, type, setRows]);

  const deleteUser = async (id) => {
    if(!id || !token) return;

    if(!confirm('Tem serteza que quer apgar esse ' + type)) return;

    try {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": `Bearer ${token}` 
       }
       
       let reqOptions = {
         url: `http://localhost:8080/api/v1/admin/del/${id}?entidade=${type}`,
         method: "DELETE",
         headers: headersList,
       }
       
      let response = await axios.request(reqOptions);
      console.log(response.data);
      const notify = () => toast.success(response.data?.message);
      setTimeout(() => {
        notify();
      }, 100);
      getUsersData();
    } catch (error) {
      const notify = () => toast.error(error?.response?.data?.message);
      notify();
      console.log(error);
    }
  }
  return (
    <section id='tableList' className='list-table-container'>
      <Toaster />
    <input
          id="standard-search"
          type="search"
          placeholder='pesquise pelo nome do aluno'
          onChange={search}
          />
        <aside className='choice-rooms-list'>
          <div>turma:  
        <input
          type="text"
          id="turmas"
          list="tumas-list"
          value={choice}
          onChange={handleChange}
        />
        <datalist id="tumas-list">          
          {allTurmas.map(({nome}) => (
            <option key={nome} value={nome} /> 
          ))}
        </datalist>
        </div>
            
          </aside>
            <div className="btns-options">
               <OpenIconSpeedDial />
            </div>
         <LogGovern title={`lista de ${type}`} />
            <div  className='detais-ovtble'>
              <div>
                Turma: <strong>{turma}</strong>
              </div>
              <div>
                turno: <strong>{turno}</strong>
              </div>
              <div>
                classe: <strong>{nivel}º</strong>
              </div>
            </div>
        <article className="table-list">
          <table id="school-list" className="display nowrap">
            <thead>
                {columns?.map(({headerName, width, column}) => (
                    
                <th key={headerName} style={{width}} rowSpan={column}>
                  {headerName}
                </th> ))
                }
            </thead>
            <tbody>
              {isLoading?('loanding'): 
                rows?.map(({cargo, nomeCompleto,genero, numeroDoBI,numeroDoTelefone, _id:id, dataDeNascimento}, idx) => (
                  <tr key={id}>
                    <td style={{width: '30px'}}>
                      {idx + 1}
                    </td>
                  

                    <td>
                      {nomeCompleto?.split(' ')[0]+' '+ nomeCompleto?.split(' ')[nomeCompleto?.split(' ').length - 1]}
                    </td>
                    <td>
                      {numeroDoBI}
                    </td>
                    <td>
                      {genero}
                    </td>
                    <td>
                      {numeroDoTelefone}
                    </td>
                    {
                      type !== 'alunos' ? (
                      <td>
                        {cargo}
                      </td>
                      ): (
                        <td>
                        {calcularIdade(new Date(dataDeNascimento).getMonth(),new Date(dataDeNascimento).getFullYear())}
                      </td>
                      )
                    }
                  
                    <td className='options-btn-section'>
                      <Link to={`/${type}/porfile/${id}`} className='icon-box blue'>
                      {<RemoveRedEyeOutlinedIcon />}
                      </Link>
                      {userAuth?.role === 'admin' && (
                        <div className='icon-box color' onClick={() => deleteUser(id)}>
                            {<DeleteIcon />}
                        </div>)
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

       
        </article>   
        
    </section>
  )
}

export default ListTable