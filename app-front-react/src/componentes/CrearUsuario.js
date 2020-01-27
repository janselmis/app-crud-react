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
            password: '',
            errors:{}
        };
    }

    handleValidation(){
        let errors = {};
        let formIsValid = true;

        //Name
        if(!this.state.nombre){
           formIsValid = false;
           errors["nombre"] = "No puede estar vacio";
        }

        if(typeof this.state.nombre !== "undefined"){
           if(!this.state.nombre.match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["nombre"] = "Solo letras";
           }        
        }

        //Email
        if(!this.state.email){
           formIsValid = false;
           errors["email"] = "No puede estar vacio";
        }

        if(typeof this.state.email !== "undefined"){
           let lastAtPos = this.state.email.lastIndexOf('@');
           let lastDotPos = this.state.email.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email no valido";
            }
        }
        
        //Edad
        if(!this.state.edad){
            formIsValid = false;
            errors["edad"] = "No puede estar vacio";
        }

        if(typeof this.state.edad !== "undefined"){
            if(this.state.edad<=12 || this.state.edad>=100){
                formIsValid = false;
                errors["edad"] = "Introduzca una edad valida";
            }
        }

        //Contraseña
        if(typeof this.state.password !== "undefined"){
            if(this.state.password.length<8){
                formIsValid = false;
                errors["password"] = "La contraseña debe tener mas de 8 carac.";
            }
        }

       this.setState({errors: errors});
       return formIsValid;
    }

    onSubmit(evt){
        evt.preventDefault();

        if(this.handleValidation()){
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
            }).then((res)=> {
                console.log(`Pues habra ido bien: ${res}`);
            })
            .catch((error)=>console.log(`Pues habra ido mal: ${error}`));

            window.location = "/";
        }else{
            alert("ERROR");
        }
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
                        <input  ref="nombre" type="text"
                                placeholder="Introduzca su nombre"
                                value={ this.state.nombre }
                                onChange = { this.onChangeNombre }
                                required/>
                        <p style={{color: "red"}}>{this.state.errors["nombre"]}</p>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input  refs="email" type="email"
                                placeholder="ejemplo@email.com"
                                value={ this.state.email }
                                onChange = { this.onChangeEmail }
                                required/>
                        <p style={{color: "red"}}>{this.state.errors["email"]}</p>
                    </div>
                    <div>
                        <label>Edad:</label>
                        <input  type="number"
                                placeholder="Mayor de edad pendejo"
                                value={ this.state.edad }
                                onChange = { this.onChangeEdad }
                                required/>
                        <p style={{color: "red"}}>{this.state.errors["edad"]}</p>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password"
                                placeholder="Min 8 caracteres"
                                value={ this.state.password }
                                onChange = { this.onChangePassword }
                                required/>
                        <p style={{color: "red"}}>{this.state.errors["password"]}</p>
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