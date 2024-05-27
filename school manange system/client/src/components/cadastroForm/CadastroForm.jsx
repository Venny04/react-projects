import './cadastroForm.css';
import { useContext, useEffect, useState } from 'react';
import {  useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { fetchAPIdata } from '../../assets/api/fecthSchoolAPI';
import { GlobalContext } from '../../utils/context/GlobalContext';

const CadastroForm = ({type}) => {
  const [sexo, setSexo] = useState('');
  const [provincias, setProvincias] = useState('');
  const [turma, setTurma] = useState('');
  const [turno, setTurno] = useState('');
  const [nivelAcademico, setNivelAcademico] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [cargo, setCargo] = useState('');
  const {userAuth} = useContext(GlobalContext);
  const token = userAuth?.token;
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate()
  const handleChange = (event) => {
    setSexo(event.target.value);
  };

  const handleCargo = (event) => {
    setCargo(event.target.value);
  }
  const handlePrrovincias = (event) => {
    setProvincias(event.target.value);
  };
  const handleTurma = (event) => {
    setTurma(event.target.value);
  };
  const handlenivelAcademico =(event) => {
    setNivelAcademico(event.target.value)
  }
  const handleTurno =(event) => {
    setTurno(event.target.value)
  }
 
  const cadastrar = async e => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    if(!form) return;
    const formdata = new FormData(form);

    const nomeCompleto = formdata.get('nomeCompleto').toLowerCase()
    const genero = sexo
    const localDeResidencia = formdata.get('localDeResidencia')
    const numeroDoTelefone = formdata.get('numeroDoTelefone')
    const numeroDoBI = formdata.get('numeroDoBI')
    const cidade = formdata.get('cidade')
    const municipio = formdata.get('municipio')
    const PROVICIA = provincias
    const dataDeNascimento =  new Date(formdata.get('dataDeNascimento')).toLocaleDateString('en-CA')
    const nomeDoPai = formdata.get('nomeDoPai')
    const nomeDaMae = formdata.get('nomeDaMae')
    const nomeDoEncarregado = formdata.get('nomeDoEncarregado')
    const email = formdata.get('email')
    // const cargo = formdata.get('cargo')
    const NIVELACDEMICO = nivelAcademico
    const TURMA = turma
    const TURNO = turno
    const nivelDeParentesco = formdata.get('nivelDeParentesco')
    const profissao = formdata.get('profissao')
    const localDeTrabalho = formdata.get('localDeTrabalho')
    
 
    const data = {
      nomeCompleto,
      genero,
      localDeResidencia,
      numeroDoTelefone,
      numeroDoBI,
      cidade,
      municipio,
      provincia: PROVICIA,
      dataDeNascimento,
      turma: TURMA,
      turno: TURNO
    };
    
    if (type === 'aluno') {
      data.nomeDoPai = nomeDoPai;
      data.nomeDaMae = nomeDaMae;
      data.nomeDoEncarregado = nomeDoEncarregado;
      data.nivelAcademico = NIVELACDEMICO;
      data.nivelDeParentesco = nivelDeParentesco;
      data.profissao = profissao;
      data.localDeTrabalho = localDeTrabalho;
    } else {
      data.email = email;
      data.cargo = cargo.split(',');
    }
   try {
    if(!data || !type || !token) return;
    
    const response = await fetchAPIdata(`http://localhost:8080/api/v1/admin/${type}/create`, 'POST', data, token);

    if(!response) return;
    const notify = () => toast.success(`${type} cadastrado  com successo.`);

    notify();
    setTimeout(() => {
      navigateTo(`/${type}s`);
      setIsLoading(false);
    }, 2300);

   } catch (error) {
    const notify = () => toast.error(error?.response?.data?.message);
    notify();
    console.log(error)
   }
  }
  // const handleSubmit = async (event) => {
  //   setIsLoading(true);
  //   event.preventDefault();
  
  //   const headersList = {
  //     "Accept": "*/*",
  //     "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  //     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQzZDQzN2QyMzg2NWY1NTYwZDE3OTUiLCJpYXQiOjE3MTU5NzEyNDh9.KxM7BMp5oDIEivDg9pT1BlXvhW_s6VWGnLc70ieWkHw" 
  //   };
  
  //   const formData = new FormData(event.target);
  //   formData.append("genero", sexo);
  //   formData.append("provincia", provincias);
  //   formData.append("turma", turma);
  //   formData.append("nivelAcademico", nivelAcademico);
    
  //   try {
  //     const response = await axios.post("http://localhost:8080/api/v1/admin/aluno/create", formData, {
  //       headers: headersList,
  //     });
  
  //     if(!response) return;
  //     const notify = () => toast.success('Aluno criado com successo.');
  
  //     notify();
  //     setIsLoading(false);
  //     setTimeout(() => {
  //     navigateTo('/');
  //     }, 2300);
  //   } catch (error) {
  //     const notify = () => toast.error(error?.response?.data?.message);
  //     notify();
  //   }
  // };

  useEffect(() => {
    const getTurmas = async () => {
     const response = await fetchAPIdata('http://localhost:8080/api/v1/admin/turmas',"GET", '');


     if(!response ) return;
     setTurmas(response?.turmas);
     console.log(response?.turmas);
    }
    getTurmas();
  }, [])
  
  return (
    <form onSubmit={cadastrar} autoComplete='off'>
       <Toaster />
         <div className='nomecompleto'>Nome completo: <input type="text" name='nomeCompleto' id='nomeCompleto' required /></div>
        <div>genero:  
        <input
          type="text"
          id="genero"
          list="generos"
          value={sexo}
          onChange={handleChange}
          required
        />
        <datalist id="generos">
          <option value="M" />
          <option value="F" />
        </datalist>
        </div>
        <div>local de residencia: <input required type="text" name='localDeResidencia' id='localDeResidencia' style={{width: '175px'}} /></div>

        <div>nº do telefone: <input required  type="tel" name='numeroDoTelefone' id='numeroDoTelefone'/>
        </div>

        <div>local de nascimento: <input required type="text" name='cidade' id='cidade' /></div>
        <div>municipio de: <input required type="text" name='municipio' id='municipio' /></div>
        <div>provincia: 
        <input
          type="text"
          id="provincia"
          list="provincias"
          onChange={handlePrrovincias}
          value={provincias}
          required
        />
        <datalist id="provincias">
          <optgroup label="As 18 provincias de angola">
            <option value="Bengo" />
            <option value="Benguela" />
            <option value="Bié" />
            <option value="Cabinda" />
            <option value="Cuando Cubango" />
            <option value="Cuanza Norte" />
            <option value="Cuanza Sul" />
            <option value="Cunene" />
            <option value="Huambo" />
            <option value="Huíla" />
            <option value="Luanda" />
            <option value="Lunda Norte" />
            <option value="Lunda Sul" />
            <option value="Malanje" />
            <option value="Moxico" />
            <option value="Namibe" />
            <option value="Uíge" />
            <option value="Zaire" />
          </optgroup>
        </datalist>
        </div>
        <div>data de nascimento: <input required type="date" name="dataDeNascimento" id="dataDeNascimento" /></div>
     
       
        {type === 'aluno' && 
          <div>nome do pai: <input required type="text" name="nomeDoPai" id="nomeDoPai" /></div>
        }
     
        {type === 'aluno' && 
           <div>nome da mae: <input required type="text" name="nomeDaMae" id="nomeDaMae" /></div>
        }
        {type === 'aluno' && 
          <div> encarregado de educação: <input required type="text" name="nomeDoEncarregado" id="nomeDoEncarregado" /></div>
        }
     
        {type === 'aluno' && 
          <div>grau de parentesco: <input required type="text" name="nivelDeParentesco" id="nivelDeParentesco" />
          </div>
        }
     
        {type === 'aluno' && 
            <div>profissao: <input required type="text" name="profissao" id="profissao" />
            </div>
        }
           {type === 'aluno' && 
             <div>local de trabalho: <input required type="text" name="localDeTrabalho" id="localDeTrabalho" />
             </div>
        }
     
       

        <div>número do BI: <input type="text" name="numeroDoBI" id="numeroDoBI" /></div>
       

        {type === 'aluno' && 
          <div>nivel  academico:

          <input
            type="text"
            id="nivelAcademico"
            list="classes"
            required
            onChange={handlenivelAcademico}
            value={nivelAcademico}
          />
          <datalist id="classes">
            <option value="7" />
            <option value="8" />
            <option value="9" />
          </datalist>
          </div>
        }
        {type !== 'aluno' && 
        <div>{sexo == 'M'?'porfessor de':"professora de"}: 
          <input
            type="text"
            id="cargo"
            name="cargo"
            list="cargos"
            required
            onChange={handleCargo}
            value={cargo}
          />
          <datalist id="cargos">
            <option value="L. Portuguesa" />
            <option value="Biologia" />
            <option value="L. Ingles" />
            <option value="Quimica" />
            <option value="E.V.P" />
            <option value="Geografia" />
            <option value="E.M.C" />
            <option value="Ed. Laboral" />
            <option value="Matemática" />
            <option value="História" />
            <option value="Empreededorismo" />
            <option value="Fisica" />
          </datalist>

          </div>
        }
        {type !== 'aluno' && 
        <div>email: 
          <input
            type="email"
            id="email"
            name="email"
            style={{textTransform: 'lowercase'}}
            required
            // onChange={handleTurma}
            // value={turma}
          />
          </div>
        }

        <div>turma: 
          <input
            type="text"
            id="turma"
            list="turmas"
            required
            onChange={handleTurma}
            value={turma}
          />
          
        <datalist id="turmas">
          {
            turmas.map(({nome}) => (
              <option key={nome} value={nome} />
            ))
          }
        </datalist>
        </div>
        <div>turno: 
          <input
            type="text"
            id="turno"
            list="turnos"
            required
            onChange={handleTurno}
            value={turno}
          />
          <datalist id="turnos">
            <option value="manha" />
            <option value="tarde" />
          </datalist>
        </div>
        <button type='submit' disabled={isLoading}>Cadastrar</button>
    </form>
  )
}

export default CadastroForm