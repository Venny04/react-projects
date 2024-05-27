import './logGovern.css'
import logo from '../../assets/insignia-Angola-logo-Ango-Emprego-removebg-preview.png'
const LogGovern = ({title}) => {
  return (
    <aside className='log-gove-conatiner'>
      <div className="gov-insinia">
        <img src={logo} alt="ministerio da educao de angola" />
      </div>
      <h4>REPÚBLICA DE ANGOLA</h4>
      <h3>MISTERIO DA EDUCÃO CIENCIA E COMUNCICAÇÃO</h3>
      <h3>DIREÇÃO MUNICIPAL DE EDUCAÇÃO CIENCIA E TECNOLOGIA DO HUAMBO</h3>
      <p className='school-title'>primeiro siculo <strong><q>comandante bula</q></strong> Huambo</p>

      <h2 className='log-gover-title'>
        {title}
      </h2>
    </aside>
  )
}

export default LogGovern