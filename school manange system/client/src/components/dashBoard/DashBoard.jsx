import AnalityCard from '../analityCard/AnalityCard'
import TickPlacementBars from '../TickPlacementBars';
import {  OnlinePrediction } from '@mui/icons-material'
import OnlineUserCard from '../onlineUserCard/OnlineUserCard';
import { analitycons, cadastrarIcons } from '../../assets/Icons';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';


import { AvatarGroup } from '@mui/material';
import BasicPie from '../MelhoresTurma';
import SchoolIcon from '@mui/icons-material/School';
import Groups2Icon from '@mui/icons-material/Groups2';

import './dashBoard.css';
import { useContext, useEffect, useState } from 'react';
import { fetchAPIdata } from '../../assets/api/fecthSchoolAPI';
import { SocketContext } from '../../utils/context/SocketContext';
import { GlobalContext } from '../../utils/context/GlobalContext';



const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(true);
  const [totalStudents, setTotalStudents] = useState(true);
  const [totalTeacher, setTotalTeacher] = useState(true);
  const { OnlineUsers } = useContext(SocketContext);
  const {userAuth} = useContext(GlobalContext);

  const usersOnline = OnlineUsers.filter((id) => id !== userAuth._id);

  useEffect(() => {
    const getTotal = async () => {
      const response = await fetchAPIdata('http://localhost:8080/api/v1/admin//cadastrados/total', 'GET', '');

      if(!response) return {message: 'Falha ao conseguir o total', error: true};
      setTotal(response?.total);
      setTotalStudents(response?.alunos);
      setTotalTeacher(response?.professor);
      setIsLoading(false);
    }
    getTotal();
  }, []);
  return (
    <section className='dash-board-section'>
      
        <article className='primary-dash-board-article'>
          <h3 className="sectio-tetle">
            Inicio 
          </h3>
         
          {isLoading?(
                <ul className='dash-board-anality-list'>
                    <Skeleton
                  sx={{ bgcolor: 'grey.200' }}
                  variant="rectangular"
                  animation="wave"
                  width= {205}
                  height= {71}
                />
                    <Skeleton
                  sx={{ bgcolor: 'grey.200' }}
                  variant="rectangular"
                  animation="wave"
                  width= {205}
                  height= {71}
                />
                  <Skeleton
                  sx={{ bgcolor: 'grey.200' }}
                  variant="rectangular"
                  animation="wave"
                  width= {205}
                  height= {71}
                />
                </ul>
              ): (
                <ul className='dash-board-anality-list'>
                    <AnalityCard title={'Total de Cadastrados'} Icon={Groups2Icon} total={total} />
                    <AnalityCard path={'/alunos'} title={'Alunos'} Icon={SchoolIcon} total={totalStudents} />
                    <AnalityCard path='/professors' title={'Professores'} Icon={SchoolIcon} total={totalTeacher} />
                </ul>
              )
            }
          {
            userAuth?.role === 'admin' &&(
            <h3 className="sectio-tetle">
                Adicione 
            </h3>
            )
          }
            {userAuth?.role === 'admin' &&  (
              <aside className='create-components-list'>
                <ul>
                  {
                      analitycons?.map(({Icon,name,path}, idx) => (
                          <Link key={idx} to={path == 'cadastrar'? path + '/aluno':'/cadastrar/professor'} className='box-create'>
                            <div className="icon-box">
                                <Icon />
                            </div>
                            <span>{name}</span>
                          </Link>
                        ))
                      }
                </ul>
              </aside>
            )}
          <aside className='placement-bars'>
          </aside>
        </article>
        <article className='activity-container'>
            <aside className='online-users'>
            {
                usersOnline.length >= 1 && (
                  <div className='user-oline-header'>
            
                  <h3 className="sectio-tetle">
                     online 
                  </h3>
                  <div className='icon-box'>
                    <abbr title="Professores Onlines">
                      <OnlinePrediction />
                    </abbr>
                  </div>
                </div>
                )
              }
             
              <AvatarGroup max={6} total={usersOnline.length} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                width: "100%",
              }}>
                {
                  usersOnline?.map((id) =>(
                      <OnlineUserCard userId={id} />
                  ))
                }
              </AvatarGroup>
            </aside>
            <aside className='classificacao'>
                <h3 className="sectio-tetle">
                estatística
                </h3>
              <BasicPie />
            </aside>
        </article>

    </section>
  )
}

export default DashBoard