import './userMassage.css'

const UserMessage = ({type, content}) => {
  return (
    <aside className={`user-message-content-container ${type}`}>
       <div className="message-content">
         {content}
       </div>
    </aside>
  )
}

export default UserMessage