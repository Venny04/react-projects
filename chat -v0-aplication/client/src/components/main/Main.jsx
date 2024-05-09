import { Route, Routes } from 'react-router-dom';
import Feed from '../feed/Feed';

import './main.css';

const Main = () => {
  return (
    <section className='main-section'>
      <Routes>
        <Route path='/' index element={<Feed />} />
      </Routes>
    </section>
  )
}

export default Main