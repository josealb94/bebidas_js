import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el Context
export const CategoriasContext = createContext();

// Provider es donde se encuentran las funciones y state
const CategoriasProvider = (props) => {

    // State del context
    const [categorias, guardarCategorias] = useState([]);

    // Ejecutar llamado al API
    useEffect(() => {
        console.log('Escribiendo....');
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            
            const resultado = await axios.get(url);
            guardarCategorias(resultado.data.drinks);
        }
        obtenerCategorias();
    }, [])

    return(
        <CategoriasContext.Provider 
        value={{
            categorias
        }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );

}

export default CategoriasProvider;