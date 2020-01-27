import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class CrearUsuario extends Component{
    // this.props es objeto con datos publicos de React
    // this.state objeto con datos privados de React, es decir,
    // el estado interno del componente. Como en Angular
    // las variables miembro de la clase privadas

    constructor(props){
        super(props);   // Invocamos al constructor del padre
                        // pasandole las propiedades publicas

        // Para evitar el problema del this con JS
        // Con bind() hacemos que en el futuro,
        // cuando se invoque al metodo,
        // this sea realmente this, es decir, el objeto instanciado
        // basado en clase, en este caso, cada uno de los componentes
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeEdad = this.onChangeEdad.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        
        // this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            nombre: '',
            email: '',
            edad: '',
            password: '',
            redirect: null
        };
    }

    componentDidMount() {
        // get & set user we are going to update
        let id = this.props.match.params.id;
        console.log('ENTRAMOS CDM: ', id)

        window.fetch(`http://localhost:4000/api/usuarios/getUser/${id}`)
            .then(res => res.json())
            .then(result => this.setState({
                nombre: result.nombre,
                email: result.email,
                edad: result.edad,
                password: result.password
            }))

        
    }

    onSubmit(evt){
        evt.preventDefault();
        let id = this.props.match.params.id;

        console.log('ONSUBMIT')

        console.log('ID: ', id)

        // Invocamos al servicio cliente HTTP, Ajax, fetch...
        window.fetch(`http://localhost:4000/api/usuarios/edit/${id}`, {
            method: 'put',
            body: JSON.stringify({
                nombre: this.state.nombre,
                email: this.state.email,
                edad: this.state.edad,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res)=> {
            console.log(`Pues habra ido bien: ${res}`);
        })
        .catch((error)=>console.log(`Pues habra ido mal: ${error}`));

        window.location = '/';
        console.log(`Datos: ${this.state.nombre}, ${this.state.edad} , ${this.state.email} , ${this.state.password}`);
    }

    // Metodo invocado por React cada vez que se cambia el valor del <INPUT>
    // Se envia un objeto con la informacion del evento
    onChangeNombre (evt){
        this.setState({
            nombre: evt.target.value
        });
    }

    onChangeEmail (evt){
        this.setState({
            email: evt.target.value
        });
    }

    onChangeEdad (evt){
        this.setState({
            edad: evt.target.value
        });
    }

    onChangePassword (evt){
        this.setState({
            password: evt.target.value
        });
    }

    render(){
        return (
            <div>
                <h2>Formulario editar usuario</h2>
                <form>
                    <div>
                        <label>Nombre:</label>
                        <input  type="text"
                                placeholder="Introduzca su nombre"
                                value={ this.state.nombre }
                                onChange = { this.onChangeNombre }/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input  type="email"
                                placeholder="ejemplo@email.com"
                                value={ this.state.email }
                                onChange = { this.onChangeEmail }/>
                    </div>
                    <div>
                        <label>Edad:</label>
                        <input  type="number"
                                placeholder="Mayor de edad pendejo"
                                value={ this.state.edad }
                                onChange = { this.onChangeEdad }/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password"
                                placeholder="Max 8 carac"
                                value={ this.state.password }
                                onChange = { this.onChangePassword }/>
                    </div>
                    <div>
                        <input type="button" onClick={(e) => this.onSubmit(e)} value="Actualizar"/>
                    </div>
                </form>
            </div>
        );
        
    }
}

export default CrearUsuario;