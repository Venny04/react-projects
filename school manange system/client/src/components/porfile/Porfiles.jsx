import './porfile.css';


import LogGovern from '../logGovern/LogGovern'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchAPIdata } from '../../assets/api/fecthSchoolAPI';
import { GlobalContext } from '../../utils/context/GlobalContext';
import axios from 'axios';


const Porfiles = ({ type }) => {
  const [notasDoaluno, setNotasDoAluno] = useState([
    {nome:"L. Portuguesa", notas:[0,0,0]},
    {nome:"Biologia", notas:[0,0,0]},
    {nome:"L. Ingles", notas:[0,0,0]},
    {nome:"Quimica", notas:[0,0,0]},
    {nome:"E.V.P", notas:[0,0,0]},
    {nome:"Geografia", notas:[0,0,0]},
    {nome: "E.M.C", notas:[0,0,0]},
    {nome:"Ed. Laboral", notas:[0,0,0]},
    {nome:"Matemática", notas:[0,0,0]},
    {nome:"História", notas:[0,0,0]},
    {nome:"Empreededorismo", notas:[0,0,0]},
    {nome:"Fisica", notas:[0,0,0]}
  ]);
  const {userAuth} = useContext(GlobalContext);
  const token = userAuth?.token;
  const {id} = useParams();
  const exelPoiter = useRef(null);
  const tbodyContainer = useRef(null);
  const [aproveitamento, setAproveitamento] = useState({});
  const [userBoletim, setUserBoletim] = useState([]);
  const [userAge, setUserAge] = useState(0);
  const [userData, setUserData] = useState({ 
  
  });


  const container = useRef(null);

  const removeAttribute = (target) => {
    if(userAuth?.role !== 'admin') return;
    target.removeAttribute('disabled');
    target.focus();
  }

  
  const handleTdFocusFnc = (e) => {
    if(!exelPoiter.current) return;
    const cellRect = e.target.getBoundingClientRect();
    const { width, height, top, left } = cellRect;

    exelPoiter.current.style.position = 'absolute';
    exelPoiter.current.style.width = width + 'px';
    exelPoiter.current.style.height = height + 'px';
    exelPoiter.current.style.top = top + 'px';
    exelPoiter.current.style.left = left + 'px';

    exelPoiter.current.style.border = '2.5px solid rgb(10, 214, 214)';
  }
  function calcularIdade(mesNascimento, anoNascimento) {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1; // O método getMonth() retorna um valor de 0 a 11, então adicionamos 1 para obter o mês atual corretamente
    const anoAtual = dataAtual.getFullYear();
  
    let idade = anoAtual - anoNascimento;
  
    // Verificar se o mês atual é menor que o mês de nascimento
    if (mesAtual < mesNascimento) {
      idade--;
    }
  
    setUserAge(idade);

  }
  const updateUserData = async(e) => {
    const property = e.target.id;
    if(!property) return;

    setUserData(data => ({...data, [property]: e.target.value}));
    // console.log(userData);
  }
  const handleUpdate = async (e) => {
    const target = e.target;
    if(!target || !token) return;
    const value = target.value.trim();
    const property = target.id.trim();

    setTimeout( async () => {
      try {

        let headersList = {
          "Accept": "*/*",
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Authorization": `Bearer ${token}` 
         }
         
        
         if(!id) return;
         
         let reqOptions = {
          url: `http://localhost:8080/api/v1/admin/user/${id}?entidade=${type}`,
          method: "PUT",
          headers: headersList,
          data:  {[property]: value},      
        }
         
         let response = await axios.request(reqOptions);
         console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }, 100);
  }
  useEffect(() => {
    if (!id || !type) return;
  
    const getUserData = async () => {
      try {
        const response = await fetchAPIdata(`http://localhost:8080/api/v1/admin/${id}?entidade=${type}`, "GET", '');
  
        if (!response) return;
  
        const {
          nomeCompleto,
          genero,
          imagemDoUsuario,
          residencia,
          numeroDoTelefone,
          numeroDoBI,
          cidade,
          municipio,
          provincia,
          dataDeNascimento,
          nomeDoPai,
          nomeDaMae,
          nomeDoEncarregado,
          nivelAcademico,
          turma,
          turno,
          nivelDeParentesco,
          cargo,
          profissao,
          localDeTrabalho
        } = response.data;
  
        const formattedDataDeNascimento = new Date(dataDeNascimento).toLocaleDateString('en-CA');
  
        setUserData({
          nomeCompleto,
          genero,
          imagemDoUsuario,
          residencia,
          numeroDoTelefone,
          numeroDoBI,
          cidade,
          municipio,
          provincia,
          dataDeNascimento: formattedDataDeNascimento,
          cargo,
          nomeDoPai,
          nomeDaMae,
          nomeDoEncarregado,
          nivelAcademico,
          turma,
          turno,
          nivelDeParentesco,
          profissao,
          localDeTrabalho,
        });
  
        calcularIdade(new Date(dataDeNascimento).getMonth(), new Date(dataDeNascimento).getFullYear());
      } catch (error) {
        console.error(error);
      }
    };
  
    getUserData();
  }, [id, type]);

  const getAlunoStatist = async () => {
    let notasTrimestre1 = 0;
    let notasTrimestre2 = 0;
    let notasTrimestre3 = 0;
    
    const sumeNotes = async () => {
      if (!tbodyContainer.current) return;
    
      const T1 = [];
      const T2 = [];
      const T3 = [];
    
      Array.from(tbodyContainer.current.children).forEach((tr) => {
        const valor_1 = parseFloat(tr.children[2].textContent);
        const valor_2 = parseFloat(tr.children[3].textContent);
        const valor_3 = parseFloat(tr.children[4].textContent);
        // Verificar se o valor é um número válido
        if (!isNaN(valor_1) && !isNaN(valor_2) && !isNaN(valor_3)) {
          T1.push(valor_1);
          T2.push(valor_2);
          T3.push(valor_3);
        }
      });
    
      notasTrimestre1 = T1.reduce((prev, current) => prev + current, 0) / T1.length;
      notasTrimestre2 = T2.reduce((prev, current) => prev + current, 0) / T2.length;
      notasTrimestre3 = T3.reduce((prev, current) => prev + current, 0) / T3.length;
    };
    
    await sumeNotes();
    
    const mediaTrimestre1 = notasTrimestre1;
    const mediaTrimestre2 = notasTrimestre2;
    const mediaTrimestre3 = notasTrimestre3;
    
    const tabelaDados = [
      { trimestre: '1º Trimestre', nota: mediaTrimestre1 },
      { trimestre: '2º Trimestre', nota: mediaTrimestre2 },
      { trimestre: '3º Trimestre', nota: mediaTrimestre3 },
    ];
    
    sumeNotes();
    
    
  
    

    setAproveitamento(tabelaDados)
  }
  useEffect(() => {
    if(!container.current) return;

    getAlunoStatist();
    

    if(!container.current) return;
    const inputs = container.current.querySelectorAll('input.edit-box');

    inputs.forEach(input => {
      input.setAttribute('disabled', true);
    });

    const getUserBoletim = async () => {
        try {
          if(type !== 'alunos') return;

          const response = await fetchAPIdata(`http://localhost:8080/api/v1/boletim/${id}`, 'GET', '');
  
          if(!response) return;
          setUserBoletim(response?.data?.disciplinas);
        } catch (error) {
          console.log(error);
        }
    }
    getUserBoletim();
  }, []);
  
  const handleNotas = async (e, isblur) => {
    let boletimNotes = {};
    const td = e.currentTarget
    let value = Number(td.textContent);
    
    if (value > 20) {
      value = 20;
    } else if (value < 0) {
      value = 0;
    }
    
    td.textContent = value;

    const parent = td.parentElement;
  
    const nome = parent?.children[1]?.textContent?.trim();
    const notas = [
      parent.children[2]?.textContent?.trim(),
      parent.children[3]?.textContent?.trim(),
      parent.children[4]?.textContent?.trim()
    ];
    boletimNotes = { nome, notas };
  
    try {
      const response = await fetchAPIdata(`http://localhost:8080/api/v1/boletim/${id}`, "PUT", boletimNotes);
      if (response) {
        console.log(response);
        getAlunoStatist();
      }
    } catch (error) {
      console.log(error);
    }
    td.contentEditable = isblur;
  };
  
  const handleTdClick = (e, value) => {
    const td = e.currentTarget;
    const parent = td.parentElement;
    const nome = parent?.children[1]?.textContent?.trim();

    if (!td) return;
    if (userAuth?.role === 'admin' || userAuth?.turma === userData?.turma && userAuth?.cargo?.includes(nome)) {
      if (value) {
        // Array.from(tbodyContainer.current.children).forEach(tr => {
        //   Array.from(tr?.children).forEach(td => {
        //     if (td.className.includes('th-data')) {
        //       td.contentEditable = value;
        //     }
        //   });
        // });
        td.contentEditable = value;
      }
      handleNotas(e, true);
    } else {
      return;
    }
  };
 
 
  const  handelChangeTextColor = (e) => {
    const td = e.currentTarget;

    if (!td) return;
    
    let value = Number(td.textContent);
   
    
    td.style.color = value >= 10 ? 'green' : 'red';
  }
  return (
    <article  className='porfile-container' ref={container}>
    
      <LogGovern title={`informações do ${type}`} />
      <section className='porfolio-info'>
        {type === 'alunos' &&
        <div className='classe-school'><input value={userData?.nivelAcademico }/>classe</div>
        }
    
        <div>Nome completo: 
        <input type="text" className='edit-box nomecompleto' name='nomeCompleto'  id='nomeCompleto' value={userData?.nomeCompleto} onChange={updateUserData}
        onBlur={handleUpdate} />
         {userAuth?.role == 'admin' && (
           <button onClick={() => removeAttribute(nomeCompleto) }>
              <EditIcon />
            </button>
          )
         }
        </div>
        
        <div>genero: <input style={{
          width: '80px'
        }} value={userData?.genero} className='edit-box' name='genero' id='genero' onBlur={handleUpdate} onChange={updateUserData} />
        {userAuth?.role == 'admin' && (
            <button onClick={() => removeAttribute(genero) }>
              <EditIcon />
            </button>
          )
         }
       
        </div>

        <div>local de residencia: <span className='edit-box'>luanda</span></div>

   
        <div>nº do telefone: <input className='edit-box' onBlur={handleUpdate} value={userData?.numeroDoTelefone} onChange={updateUserData} style={{
          width: '210px'
        }} name='numeroDoTelefone' id='numeroDoTelefone' />

          {userAuth?.role == 'admin' && (
           <button onClick={() => removeAttribute(numeroDoTelefone) }>
            <EditIcon />
          </button>
          )
         }
        </div>
        <div>local de nascimento: <input className='edit-box' onBlur={handleUpdate} value={userData?.cidade} onChange={updateUserData} style={{
          width: '210px'
        }} name='cidade' id='cidade' />

          {userAuth?.role == 'admin' && (
           <button onClick={() => removeAttribute(cidade) }>
            <EditIcon />
          </button>
          )
         }
        </div>

        <div>municipio: <input className='edit-box'
          value={userData?.municipio} 
          onBlur={handleUpdate}
          style={{
            width: '180px'
          }}
          onChange={updateUserData}
            name='municipio' id='municipio'
         />
        

          {userAuth?.role == 'admin' && (
            <button onClick={() => removeAttribute(municipio) }>
            <EditIcon />
          </button>
          )
         }
         </div>


        <div>provincia: 
          <input className='edit-box' 
          onBlur={handleUpdate}
            value={userData?.provincia}
            style={{
          width: '200px'

            }}
            onChange={updateUserData}
            id='provincia' name='provincia'
          />
            
        
        {userAuth?.role == 'admin' && (
          <button onClick={() => removeAttribute(provincia) }>
            <EditIcon />
          </button>
          )
         }
        </div>


        <div>data de nascimento: <input onBlur={handleUpdate} className='edit-box'
          value={userData?.dataDeNascimento} name='dataDeNascimento' type='date' id='dataDeNascimento' 
          onChange={(e) => {
            updateUserData(e)
            calcularIdade(new Date(e.target.value).getMonth(),new Date(e.target.value).getFullYear())
            }}  />

          
        {userAuth?.role == 'admin' && (
          <button onClick={() => removeAttribute(dataDeNascimento) }>
            <EditIcon />
          </button>
          )
         }
        </div>


        <div>idade: <span className='edit-box'>{userAge || 0}</span></div>

            {
              type !== 'aluno' && userData?.cargo && (
                <div>{userData?.genero == "M" ? 'professor de' : 'professora de'}: (
                    <input onBlur={handleUpdate} className='edit-box' 
                      value={[...userData?.cargo]?.map(cargo => ' ' + cargo)}
                      onChange={updateUserData}
                      id='cargo' name='cargo'
                    />
                  )
                </div>
                
              )
            }
        {
          type === 'alunos' && (
          <div>nome do pai: <input onBlur={handleUpdate} className='edit-box' 
            value={userData?.nomeDoPai}
            onChange={updateUserData}
              id='nomeDoPai' name='nomeDoPai'
           />
          
            {userAuth?.role == 'admin' && (
             <button onClick={() => removeAttribute(nomeDoPai) }>
              <EditIcon />
            </button>
            )
          }
           </div>
          )
        }

        {
          type === 'alunos' && (<div>nome da mãe: 
            <input className='edit-box' value={userData?.nomeDaMae}
            onChange={updateUserData}
            name='nomeDaMae' id='nomeDaMae'
            />
             {userAuth?.role == 'admin' && (
              <button onClick={() => removeAttribute(nomeDaMae) }>
                <EditIcon />
              </button>
          )
         }
         
          </div>)
        }
       
       {
          type === 'alunos' && 
          (<div>nome do encarregado de educação: <input onBlur={handleUpdate} className='edit-box' 
            value={userData?.nomeDoEncarregado}
            onChange={updateUserData}

            id='nomeDoEncarregado' name='nomeDoEncarregado'
            />
           

            {userAuth?.role == 'admin' && (
            <button onClick={() => removeAttribute(nomeDoEncarregado) }>
              <EditIcon />
            </button>
          )
         }
          </div>
          )
        }

        {
          type === 'alunos' && 
          (
            <div>grau de parentesco: <input onBlur={handleUpdate} className='edit-box' value={userData?.nivelDeParentesco}
            onChange={updateUserData}

            id='nivelDeParentesco' name='nivelDeParentesco'
            />

            

            {userAuth?.role == 'admin' && (
            <button onClick={() => removeAttribute(nivelDeParentesco) }>
                <EditIcon />
              </button>
            )
         }
            </div>
          )
        }

        {
          userData?.numeroDoBI && (
          <div>número do BI: <input onBlur={handleUpdate} className='edit-box' value={userData?.numeroDoBI}
          onChange={updateUserData}
          name='numeroDoBI' id='numeroDoBI'
          />
          
            {userAuth?.role == 'admin' && (
              <button onClick={() => removeAttribute(numeroDoBI) }>
                <EditIcon />
              </button>
            )
         }
          </div>

          )
        }
        
        <div>turma: <input className='edit-box' 
          value={userData?.turma}
          onBlur={handleUpdate}
          onChange={updateUserData}

          id='turma' name='turma'
        />
        
          {userAuth?.role == 'admin' && (
            <button onClick={() => removeAttribute(turma) }>
              <EditIcon />
          </button>
          )
         }
        </div>




        <div>turno: <input className='edit-box' 
          value={userData?.turno}
          onBlur={handleUpdate}
          onChange={updateUserData} 

          name='turno' id='turno'
        />
         
          {userAuth?.role == 'admin' && (
          <button onClick={() => removeAttribute(turno) }>
              <EditIcon />
          </button>
          )
         }
        </div>

      </section>
      {
        type === 'alunos'&&
        (
          <section className='boletim-do-aluno-section'>
          <h3>
           estatistica academica do aluno 
          </h3>
      <article>
      <table>
          <thead>
            <tr>
              <th>Nº</th>
            <th>disciplinas</th>
            <th>Media T1</th>
            <th>Media T2</th>
            <th>Meida T3</th>
            </tr>
          </thead>
          <tbody ref={tbodyContainer}>
      
            {
              userBoletim?.map(({nome, notas}, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{nome}</td>
                {notas?.map((nota, index) => (
                 <td 
                    className='th-data' 
                    style={{color: Number(nota) >= 10? 'green' : 'red', position: 'relative'}} 
                    onDoubleClick={e => handleTdClick(e, true)} 
                    onBlur={e => handleNotas(e, false)} 
                    onFocus={handleTdFocusFnc} 
                    onKeyUp={handelChangeTextColor}
                    key={index}>{nota}</td>
                ))}
              
              </tr>
              ))
            }
          </tbody>
        </table>
          <BarChart width={400} height={340} data={aproveitamento}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="trimestre" domain={[0, 100]} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="nota" fill="rgb(13, 163, 174)" />
        </BarChart>
          </article>
      </section>
        )
      }
      
    </article>
  )
}

export default Porfiles