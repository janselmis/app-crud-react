import React, {Component }from 'react'



class ListarUsuarios extends /*React.*/ Component {

    constructor(props) {
        super(props)

        this.deletePost = this.deletePost.bind(this);
        }



    //Equivalente al ngOnInit(): El componente ha sido montado.
    componentWillMount(){
        this.setState(null);       //Aunque es redundante.
        let promesaHTTP = window.fetch('http://127.0.0.1:4000/api/usuarios/');    //El documento HTTP ya sabe que es un THEN
       promesaHTTP.then( (resHTTP) => {
            let promesaJSON = resHTTP.json();

        
            promesaJSON.then( (objColeccionUsu) => {
                console.log( JSON.stringify(objColeccionUsu) );
                //Cuando por fin recibimos una coleecion y ha sido convertido en JSON
                this.setState({
                    listaUsuarios: objColeccionUsu
                })
            });
        
       });
    }
    componentWillUnmount() {
        //Esto se ejecuta cuando se desmonta el componente. 
    }

    deletePost(ev) {
        let el = ev.target
        let id = el.dataset.idusu
    //let index = el.dataset.index

        fetch(`https://http://127.0.0.1:4000/api/usuarios/delete/${id}`, {
            method: 'DELETE'
        })
         .catch(err => console.error(err))
         .then((deleteUsu) => {
        //let posts = this.state.posts
        // posts.splice(index, 1)
            this.setState({ deleteUsu })
         })
    }

    render() { 
        let objViDomJSX;

        if(this.state === null) {
         objViDomJSX = (<p>Cargando...</p>);
         } else { 
            
            let contIds = 1;
            let filasTr =this.state.listaUsuarios.map((usu) =>{
                contIds++;
                return(<tr key={usu._id}>
                         <td>{usu.nombre}</td>

                        <td>{usu.email}</td>

                        <td>{usu.edad}</td>
                        <button onClick={() => this.deletePost(usu._id)} className="button muted-button">Delete</button>
                     </tr>);
            });
            
             objViDomJSX = ( 
                <div>
                    <h2 > Lista de usuarios</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>

                                 <th>Email</th>
                                 
                                 <th>Edad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filasTr}
                        </tbody>
                    </table>
                    </div>
            );
        }

        return objViDomJSX
    }
}

export default ListarUsuarios;