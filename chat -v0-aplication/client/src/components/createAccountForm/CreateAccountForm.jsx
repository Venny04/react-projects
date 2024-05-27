import Image from '@mui/icons-material/Image'
import './createAccountForm.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { storage } from '../../assets/db/firebase';
import {v4} from 'uuid'
import { fecthAPI } from '../../assets/api/fecthAPIdata';
import { UserContext } from '../../contexts/UserContext';

const CreateAccountForm = () => {
  const [usePorfilePic, setUsePorfilePic] = useState('');
  const [isUpload, setisUpload] = useState(false);
  const [avatarUrl, setavatarUrl] = useState('');
  const { login } = useContext(UserContext);

  const navigator = useNavigate();
  const handlerCreateUserAccount = async(e) => {

    e.preventDefault();

    const form = e.currentTarget;
    if(!form);

    const createUser = async (data) => {
      try {
          if(!data?.userTelNumber) return;
    
          const response = await fecthAPI('http://localhost:8080/api/v1/auth/create-account',"POST",data,'','');
    
          if(response){
            const { user_doc, token } = response;
            login(user_doc, token);
          }
      } catch (error) {
        console.log(error);
      }
    }

    const formdata = new FormData(form);
    const userAvatar = formdata.get('userAvatar');

   
    if(isUpload){
      const fileRef = ref(storage, `/userPorfile/${userAvatar?.name + v4()}`);
      uploadBytes(fileRef,userAvatar ).then(response => {
        getDownloadURL(response?.ref).then(url => {
          if(!url) return
          const data = {
            userName: formdata.get('userName').toLowerCase() || '',
            userEmail: formdata.get('userEmail').toLowerCase() || '',
            userPassword: formdata.get('userPassword') || '',
            userTelNumber: Number(formdata.get('userTelNumber')),
            userAvatar: url
          }
          if(!data?.userAvatar) return;
          createUser(data);
          alert("Conta criada com sucesso")
          navigator('/');
          return
        });
      }).catch((error) => console.log("Achei um "+ error));
      return
    }else{
      const data = {
        userName: formdata.get('userName').toLowerCase() || '',
        userEmail: formdata.get('userEmail').toLowerCase() || '',
        userPassword: formdata.get('userPassword') || '',
        userTelNumber: Number(formdata.get('userTelNumber')),
        userAvatar: ''
      }
      return createUser(data);
    }

    
    
  }
  const handlerPic = async (e) => {
    const file = e.currentTarget.files[0];
    if(!file) return;

    const img = URL.createObjectURL(file);

    if(!img) return
    setUsePorfilePic(img);
    setisUpload(true);
  }
  return (
    <form onSubmit={handlerCreateUserAccount}>
      <h2>Create a account in <strong>Feed</strong></h2>
      <div className="form-fields">
        <div className="image-field">
          <label htmlFor="userAvatar">
           <img src={usePorfilePic?usePorfilePic:'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='} alt="" />
          </label>
            <input onChange={handlerPic} type="file" name="userAvatar" id="userAvatar" accept='image/*' hidden />
        </div>
        <div className="form-input-fiels">
          <div className="input-box">
            <label htmlFor="userName">Nome de usuario</label>
            <input type="text" name='userName' required/>
          </div>
          <div className="input-box">
            <label htmlFor="userEmail">Email</label>
            <input type="text" name='userEmail' required/>
          </div>
          <div className="input-box">
            <label htmlFor="userTelNumber">Number</label>
            <input type="tel" name='userTelNumber' required/>
          </div>
          <div className="input-box">
            <label htmlFor="userPassword">Palavra Passe</label>
            <input type="password" name='userPassword'required />
          </div>
        </div>
      </div>
      <button type='submit'>create account</button>
      <Link to={'/login'}>
        login
      </Link>
    </form>
  )
}

export default CreateAccountForm