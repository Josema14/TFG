import "./Item.css"
import { Button } from "@mui/material"
const Item = (prop) => {
    const item = prop.prop
    return(
        <div className="item__container">
            <div className="itemImage__container">
                <img src={item.imagen} alt=""/>
            </div>

            <div className="itemInfo__container">
                <div className="itemDetails__container">
                <h3>{prop.prop.nombre}</h3>
                <div >
                <span>Fecha: {item.fechaInicio}</span>
                <span>Duración: {item.duracion} días</span>
                <span>Precio: 200€</span>

                </div>
                </div>
                <div className= "itemDButton__container">

                <div className="itemDescription">
                <h3>Descripción</h3>
                <p>{item.descripcion}</p>
                </div>

                <div className="itemButtons">
                    <Button>
                        Comprar
                    </Button>
                </div>

                </div>

            </div>



        </div>

    )



}

export default Item