import './userMessage.css'

const UserMessage = ({ type, content }) => {
  return (
    <li className={`user-message ${type}`}>
      <div className="message-content">
        {content}
      </div>
    </li>
  )
}

export default UserMessage