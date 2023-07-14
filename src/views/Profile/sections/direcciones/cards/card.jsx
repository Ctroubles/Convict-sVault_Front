import { useRef, useState } from "react";
import style from "./card.module.css";
import axios from "axios";
import Url_deploy_back from "../../../../../util/deploy_back";

const Card = ({data, id, openForm}) =>{

    const modalRef = useRef()
    const {_id:ID, city,country,department, extraData, number, province,street} = data;

    const direccion = `${street?street:""}${number && street?", "+number:number?number:""}${extraData && (street||number)?", "+extraData:extraData?extraData:""}`;
    const provincia = `${province?province:""}${department && province?", "+department:department?department:""}`


    const [modalDelete, setModalDelete] = useState(false)



    const modalHandler = () =>{
        if (modalRef.current) {
            modalRef.current.className = style.desactive
            setTimeout(()=>{
                setModalDelete(false)
            },200)
        }else{
            setModalDelete(true)
        }
    }    
    
    const modalClose = (e) =>{
        if (e.target === e.currentTarget) {
            if (modalRef.current) {
                modalRef.current.className = style.desactive
                setTimeout(()=>{
                    setModalDelete(false)
                },200)
            }
        }
    }


    const deleteHandler = async()=>{
        try {
            const {status} = await axios.delete(`${Url_deploy_back}/users/update/address/${id}/${ID}`);
            if (status===200) {
                if(modalRef.current?.className)modalRef.current.className = style.desactive
                setTimeout(()=>{
                    setModalDelete(false)
                },200)}
                window.location.reload()
          
        } catch (error) {
            console.log(error);
            alert("Hubo un error al eliminar la dirección")
            if(modalRef.current?.className)modalRef.current.className = style.desactive
            setTimeout(()=>{
                setModalDelete(false)
            },200)
        }
       
    }

    return(
        <div id={style.Card}>
            <article>
                <main>
                    <div>
                        <div className={style.lines}>
                            <span title={direccion}>{direccion}</span>
                        </div>                       
                        <div>
                            <span title={city}>{city}</span>  
                        </div>
                        <div>
                            <span title={provincia}>{provincia}</span>
                        </div>
                       <div>
                        <span title={country}>{country}</span>
                       </div>
                    </div>
                </main>
                <footer>
                    <button className={style.update} onClick={()=>openForm({active:true,update:true, data:data})}>
                        EDITAR
                    </button>
                    <button className={style.delete} onClick={()=>setModalDelete(true)}>ELIMINAR</button>
                </footer>
            </article>
            {   
               modalDelete? ( 
                    <div id={style.quit} ref={modalRef}>
                        <div className={style.cover} onClick={(e)=>modalClose(e)}>
                            <div className={style.contenido}>
                                <div>
                                    <h3>¿Estás seguro de eliminar esta dirección?</h3>
                                </div>
                                <div id={style.guardar}>
                                    <label><span onClick={()=>modalHandler()}>CANCELAR</span></label>
                                    <label><p onClick={()=>deleteHandler()}>ELIMINAR</p></label>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    null
                )
            }
        </div>
    )
};

export default Card;