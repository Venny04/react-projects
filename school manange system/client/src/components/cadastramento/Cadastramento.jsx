import './cadastramento.css'
import LogGovern from '../logGovern/LogGovern'
import CadastroForm from '../cadastroForm/CadastroForm'

const Cadastramento = ({type}) => {
  return (
    <div className='cadastramento-container'>
        <LogGovern title={'cadastrar ' + type} />
        <CadastroForm type= {type} />
    </div>
  )
}

export default Cadastramento