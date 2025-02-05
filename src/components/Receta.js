import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 350,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    // Configuracion del modal de material-ui
    const [ modalStyle ] = useState(getModalStyle);
    const [ open, setOpen ] = useState(false);
    const classes = useStyles();
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const { informacion, guardarIdReceta, guardarInformacion } = useContext(ModalContext);
    const { idDrink, strDrink, strDrinkThumb } = receta;

    //Muestra y formatea los ingredientes
    const mostrarIngredientes = () => {
        let ingredientes = [];
        for(let i = 1; i<16; i++){
            if(informacion[`strIngredient${i}`]) {
                ingredientes.push(
                    <li>{ informacion[`strIngredient${i}`] } { informacion[`strMeasure${i}`] }</li>
                )
            }
        }
        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-header">{strDrink}</div>
                <img src={strDrinkThumb} alt={`Imagen de ${strDrink}`} className="card-img-top"/>
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            guardarIdReceta(idDrink);
                            handleOpen();

                        }}
                    >
                        Ver receta
                    </button>
                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null);
                            guardarInformacion({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{informacion.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {informacion.strInstructions}
                            </p>
                            <img src={informacion.strDrinkThumb} alt={`Imagen para ${informacion.strDrink}`} className="img-fluid my-4"/>
                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                { mostrarIngredientes(informacion) }
                            </ul>
                        </div>

                    </Modal>
                </div>
            </div>
            
        </div>
     );
}
 
export default Receta;