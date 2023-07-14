import { useState } from "react";
import style from "./direcciones.module.css"
import Formulario from "./formulario/formulario";
import Card from "./cards/card";
import { useSelector } from "react-redux";



const Direcciones = ({addresses = []}) =>{

    const id = useSelector(e=>e.id) 


    const [adding, setAdding] = useState({
        active:false,
        update:false,
    })


    return(
        <div id={style.Direcciones}>
            <div>
                <div id={style.butSec}>
                    <button id={adding.active?style.cancel:undefined} onClick={adding.active?()=>setAdding({active:false,update:false}):()=>setAdding({active:true,update:false})}>
                        {
                            !adding.active? "AÑADIR DIRECCIÓN":"CANCELAR"
                        }                        
                    </button>
                </div>
            </div>
            {
                !adding.active ? 
                addresses.length?
                        (
                        <div>                             
                              <div id={style.cardsContainer}>
                                {
                                    addresses.map((e)=><Card key={e._id} data={e} id={id} openForm={setAdding}/>)
                                }
                              </div>
                        </div>
                        ) : (
                            <div id={style.noData}>
                                    No tiene ninguna dirección Registrada
                            </div>
                        )
                : (
                    <Formulario id={id} updating={adding.update} data={adding.data}/>
                )
            }
            
        </div>
    )
};

export default Direcciones;