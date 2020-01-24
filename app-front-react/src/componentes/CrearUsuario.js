import React, {Component} from 'react';

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
        
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            nombre: '',
            email: '',
            edad: '',
            password: ''
        };
    }

    onSubmit(evt){
        evt.preventDefault();

        // Invocamos al servicio cliente HTTP, Ajax, fetch...
        window.fetch("http://localhost:4000/api/usuarios/registro", {
            method: 'post',
            body: JSON.stringify({
                "nombre": this.state.nombre,
                "email": this.state.email,
                "edad": this.state.edad,
                "password": this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res)=>alert("Pues habra ido bien"))
        .catch((vacas)=>alert("Pues habra ido mal"));

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
                <h2>Formulario crear usuario</h2>
                <form onSubmit={this.onSubmit}>
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
                        <input type="submit" value="Registrar"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default CrearUsuario;