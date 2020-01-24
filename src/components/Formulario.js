import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

    const [ datos, guardarDatos ] = useState({
        ingrediente: '',
        categoria: ''
    });

    const { ingrediente, categoria } = datos;

    const leerDatos = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    return ( 
        <form
            className="col-12"
            onSubmit={ e => {
                e.preventDefault();
                guardarConsultar(true);
                buscarRecetas(datos);
            }}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por categoría o ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        type="text" 
                        className="form-control"
                        name="ingrediente"
                        placeholder="Buscar por ingrediente"
                        onChange={leerDatos}
                        value={ingrediente}
                    />
                </div>
                <div className="col-md-4">
                    <select 
                        name="categoria" 
                        className="form-control"
                        onChange={leerDatos}
                        value={categoria}
                    >
                        <option 
                            value=""
                            onChange={leerDatos}
                        >-- Selecciona Categoria --</option>
                        {categorias.map(categoria => (
                            <option 
                                key={categoria.strCategory} 
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;