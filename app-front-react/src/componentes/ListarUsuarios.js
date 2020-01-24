import React, {Component} from 'react';
import './ListarUsuarios.css';

class ListarUsuarios extends Component{
    constructor(props){
        super(props);

        this.deletePost = this.deletePost.bind(this);
    }
    
    // Equivalente al ngOnInit(): El componente ha sido montado
    componentDidMount(){
        this.setState(null);
        let promesaHTTP = window.fetch("http://localhost:4000/api/usuarios");
        promesaHTTP.then((resHTTP)=>{
            let promesaJSON = resHTTP.json();

            promesaJSON.then((objColeccionUsu)=>{
                console.log(JSON.stringify(objColeccionUsu));
                // Cuando por fin recibimos la coleccion y ha sido convertida en JSON
                this.setState({
                    listaUsuarios: objColeccionUsu
                });
            });
        });
    }

    componentWillMount(){
        // Esto se ejecuta cuando se desmonte el componente
    }

    deletePost(ev) {
        let el = ev.target;
        let id = el.dataset.idusu;
        console.log(id);
        //let index = el.dataset.index

        fetch(`http://localhost:4000/api/usuarios/${id}`, {
            method: 'DELETE',
            mode: 'cors'
        })
         .catch(err => console.error(err))
         .then(res => res);

         window.location.reload();

    }

    render(){
        let objViDomJSX;
        if(this.state === null){
            objViDomJSX = (
                <div>
                    <p>Cargando...</p>
                </div>
            );
        }else{ 
            let contIds = 1;
            let filasTr = this.state.listaUsuarios.map((usu)=>{
                contIds++;
                return (<tr key={contIds}>
                            <td>{usu.nombre}</td>
                            <td>{usu.email}</td>
                            <td>{usu.edad}</td>
                            <td>
                                <button type="submit" data-idusu={usu._id} onClick={this.deletePost}>Delete</button>
                            </td>
                        </tr>);
            });
            objViDomJSX = (
                <div>
                    <h2>Listado de usuarios</h2>
                    <table className="tabla"> 
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Edad</th>
                            </tr>
                        </thead>
                        <tbody>
                            { filasTr }
                        </tbody>
                    </table>
                </div>
            );
        }

        return objViDomJSX;
    }
}

export default ListarUsuarios;