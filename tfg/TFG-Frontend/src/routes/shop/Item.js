import "./Item.css"
import { useNavigate, useLocation} from "react-router-dom";
import { Button } from "@mui/material"
const Item = (prop) => {

    const item = prop.prop
    const navigate = useNavigate();
    //Función para realizar la compra
   async function handlePurchase(e){
    e.preventDefault();
    

    //Realizamos el post para añadir un usuario
    await fetch("http://localhost:5000/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
 
      
      navigate("/inventory");
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }


    function formatDate(date) {
        var start = new Date(date)
        return [
          start.getFullYear(),
          padTo2Digits(start.getMonth() + 1),
          padTo2Digits(start.getDate()),
        ].join('-');
      }


    return(
        <div className="item__container">
            <div className="itemImage__container">
                <img src={item.imagen} alt=""/>
            </div>

            <div className="itemInfo__container">
                <div className="itemDetails__container">
                <h3>{prop.prop.nombre}</h3>
                <div >
                <span>Fecha: {formatDate(item.fechaInicio)}</span>
                
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
                    <Button onClick={handlePurchase}>
                        Comprar
                    </Button>
                </div>

                </div>

            </div>



        </div>

    )



}

export default Item