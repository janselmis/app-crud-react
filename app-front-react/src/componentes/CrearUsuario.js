import React, { Component } from "react"

class CrearUsuario extends /*React.*/ Component {
    //this.props es objeto con datos publicos.
    //this.state objeto con datos privados, es decir.
    //El estado interno del  componente, Como en Angular
    //Las variables miembro de la clase privadas.

    constructor(props) {
        super(props);       //Invocamos el contructor del padre
                            //Pasandole las propiedades publicas.

        //Para evitar el problema del this con JS 
        //Con bind() hacenis que en el futuro,
        //cuando se invoque al metodo
        //this sea realmente this.

        this.state = { 
            nombre: 'Bichitochito',
            email:'unemail@gmail.com',
            password: '1234',
            edad:"Mayr/Mnr"
        }

        this.onChangeNombre = this.onChangeNombre.bind((this));
        this.onChangePassword = this.onChangePassword.bind((this));  
        this.onChangeEmail = this.onChangeEmail.bind((this)); 
        this.onChangeEdad = this.onChangeEdad.bind((this));                                                 //This es el objeto instanciado de la clase componente.
        this.onSubmit = this.onSubmit.bind((this));
    }

    onSubmit (evt) {
        evt.preventDefault();


        //Invocamos al servicio cliente HTTP, Ajax, fetch....

        console.log(`Datos: ${this.state.nombre}, ${this.state.email}, ${this.state.password}`)
        window.fetch('http://127.0.0.1:4000/api/usuarios/registro',{
            method:'post',
            body: JSON.stringify ({
                "nombre":this.state.nombre,
                "email":this.state.email,
                "password":this.state.password,
                "edad":this.state.edad
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((res) => alert("Pues habra ido tuttoo benne"))
        .catch((vacas) => "Pues habra ido mal");
    }

    //Metodo invocado por React cada vez que se cambia el valor de <INPUT>
    //Se envia un objetivo con la informacion del evento.
    onChangeNombre(evt){
        this.setState({
            nombre: evt.target.value
        });

    }
    onChangeEmail(evt) {
        this.setState({
            email: evt.target.value
        })
    }


    onChangePassword(evt) {
        this.setState({
            password: evt.target.value
        })
    }
    onChangeEdad(evt){
        this.setState({
            edad: evt.target.value
        });

    }

    //Comentario para probar GIT kraken

    render(){
        return (
            <div>
                
                <h2>Formulario crear Usuario</h2>
                <form onSubmit={ this.onSubmit }>
                <div>
                        <label>nombre:</label>
                        <input type="text"
                                placeholder="bichito"
                                onChange = { this.onChangeNombre}
                                value= { this.state.nombre}></input>
                                
                        </div>
                    <div>
                        <label>Email:</label>
                        <input type="email"
                                placeholder="ejemplo@email.com"
                                onChange = { this.onChangeEmail}
                                value= { this.state.email}></input>
                                
                        </div>
                    <div>
                        <label>Password:</label>
                        <input type="password"
                                placeholder="Letras y Num3r02"
                                onChange = {this.onChangePassword}
                                value= { this.state.password}></input>
                    </div>
                    <div>
                        <label>Edad:</label>
                        <input type="edad"
                                placeholder="Mayr/Menr"
                                onChange = { this.onChangeEdad}
                                value= { this.state.edad}></input>
                                
                        </div>
                    <div>
                        <input type="submit" value="Registar"/>
                        
                    </div>
                </form>
            </div>
        )
    }
}
export default CrearUsuario;