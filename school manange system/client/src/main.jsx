import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './utils/context/GlobalContext.jsx';
import { SocketProvider } from './utils/context/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
    <BrowserRouter>
    <SocketProvider>
      <App />
    </SocketProvider>
    </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>,
)
