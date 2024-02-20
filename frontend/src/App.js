// App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import styles from './styles/global.module.css';
import { toast, ToastContainer } from 'react-toastify'
import CadastrarUsuario from "./pages/CadastrarUsuario.js";
 
function App() {

  return (
    <div className={styles.body}>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<CadastrarUsuario />}/>

        </Routes>
        {/* <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;