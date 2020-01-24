// Componente Raiz del proyecto

import React from 'react';  // importamos mod React
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import logo from '../logo.svg'; // importamos el fich
import './App.css';
import CrearUsuario from'./CrearUsuario';
import ListarUsuarios from './ListarUsuarios';

function App() {
    let estiloLogo = {
        width:"10em",
        height:"10em"
    }
    return (
        <Router>
        <div className="App">
            <header className="App-header">
                <img src={ logo } className="App-logo" alt="logo" />
            <h1>Operaciones Crud Usuarios</h1>
            </header>
            <nav>
            <Link to="/">Listado</Link>
            <Link to='/registro'>Crear Usuarios</Link>
            </nav>
            <Route path='/' exact component={ListarUsuarios}></Route>
            <Route path='/registro' component={CrearUsuario}></Route>
        </div>
        </Router>
          
    );
}
export default App;
