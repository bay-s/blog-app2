import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import './css/bulma.min.css'
import './css/animasi.css'
import './css/main.min.css'
import './css/bulma-accordion.min.css'
import App from './App'
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'react-quill/dist/quill.snow.css';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
