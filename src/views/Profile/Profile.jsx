import { Link } from "react-router-dom/cjs/react-router-dom";
import style from "./Profile.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { validators } from "../../util/validators";
import axios from "axios";
import { capitalizeEachWord } from "../../util";



const editableStyle = {
    border:"1px solid #C0C0C0",
    minWidth:"220px",
    backgroundColor:"#ffffff"
}


const Profile = ({user}) =>{
    
    const history = useHistory();
    const params = useParams()
    const modalRef = useRef()
    const {logout} = useAuth0()


    const [section, setSection] = useState(null)
    const [editable, setEditable] = useState(false)
    const [modalQuit, setModalQuit] = useState(false)
    const [userData, setUserData] = useState({})
    const [errors, setErrors] = useState({})
    const [genderEdit, setGenderEdit] = useState(false)





    useEffect(()=>{
        setUserData({
            name: user.name || "",
            surname: user.surname || "",
            email: user.email || "",
            phone: user.phone || "",
            dni: user.dni || "",
            gender: user.gender || "",
        })
    },[user, editable])



    useEffect(()=>{
        switch (params.sec) {
            case "profile":
                setSection(1)
                break;          
            case "addresses":
                setSection(2)
                break;            
            case "orders":
                setSection(3)
                break;            
            case "authentication":
                setSection(4)
                break;
            default:
                history.push("/account/profile")
                break;
        }
    },[params])


    const modalHandler = () =>{
        if (modalRef.current) {
            modalRef.current.className = style.desactive
            setTimeout(()=>{
                setModalQuit(false)
            },200)
        }else{
            setModalQuit(true)
        }
    }    
    
    const modalClose = (e) =>{
        if (e.target === e.currentTarget) {
            if (modalRef.current) {
                modalRef.current.className = style.desactive
                setTimeout(()=>{
                    setModalQuit(false)
                },200)
            }
        }
    }

    const handlerChange = (e) => {
        const target = e.target.name;
        let value = e.target.value;
        
        // Verificar y recortar el valor si excede la longitud máxima
        const maxLength = 11; // Cambiar a 11 para aceptar 10 números
        if (value.length > maxLength) {
          value = value.slice(0, maxLength);
        }
        
        setErrors({ ...errors, [target]: null });
        if (validators(target, value)) {
          setUserData({ ...userData, [target]: value });
        }
      };

    const sendUpdate = async() =>{
        try {
            const setData = {
                ...userData,
                name:capitalizeEachWord(userData.name),
                surname:capitalizeEachWord(userData.surname)
            }
            const {status} = await axios.put(`http://localhost:3001/users/update/${user._id}`,setData)
            if (status === 200) {
                window.location.reload();
            }else alert("Hubo un error al actualizar el usuario, commpueba los datos (en genero solo se acepta M y F)")
        } catch (error) {
            alert("Hubo un error al actualizar el usuario, commpueba los datos (en genero solo se acepta M y F)",error)
            console.log(error)
        }
    }


    useEffect(() => {
        const clickEventFunction = () => {
            setGenderEdit(false);
        };
    
        if (genderEdit) {
            window.addEventListener("click", clickEventFunction);
        } else {
            window.removeEventListener("click", clickEventFunction);
        }
    

        return () => {
            window.removeEventListener("click", clickEventFunction);
        };
    }, [genderEdit]);

    return(
        <div id={style.Container}>
            <div style={{ width:"100%", maxWidth:"1350px"}}>
                <div id={style.coreBox}>
                    <div style={{padding:"0 40px"}}>
                        <div style={{display:"flex", alignItems:"end", margin:"0 0 40px 0"}}>
                            <div id={style.picContainer}><img src={user.picture} alt="Profile pic" style={{width:"60px", height:"60px"}} /></div>
                            <div id={style.namne}>
                                <h3 style={{whiteSpace:"nowrap"}}>Hola, {user.name}</h3>
                            </div>
                        </div>
                        <div>
                            <nav>
                                <div>
                                    <div>
                                        <label className={style.navLink} style={section===1?{borderColor:"#009fe3"}:undefined} onClick={()=>history.push("/account/profile")}>
                                            <span style={section===1?{color:"#000", fontWeight:"600"}:undefined}>Perfil</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className={style.navLink} style={section===2?{borderColor:"#009fe3"}:undefined} onClick={()=>history.push("/account/addresses")}>
                                            <span style={section===2?{color:"#000", fontWeight:"600"}:undefined}>Direcciones</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className={style.navLink} style={section===3?{borderColor:"#009fe3"}:undefined} onClick={()=>history.push("/account/orders")}>
                                            <span style={section===3?{color:"#000", fontWeight:"600"}:undefined}>Pedidos</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className={style.navLink} style={section===4?{borderColor:"#009fe3"}:undefined} onClick={()=>history.push("/account/authentication")}>
                                            <span style={section===4?{color:"#000", fontWeight:"600"}:undefined}>Autenticación</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className={style.navLink} onClick={()=>modalHandler()}>
                                            <span>Salir</span>
                                        </label>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div style={{width:"100%",}}>
                        <div>
                            <div>
                                <label>
                                    <h1 style={{padding:"40px", marginTop:"40px",fontSize:"35px"}}>
                                        {section===1?"Perfil":section===2?"Direcciones":section===3?"Pedidos":section===4?"Autenticación":undefined}
                                    </h1>
                                </label>
                            </div>
                            <div >
                                <div id={style.dataBoxContainer}>
                                    {
                                        section===1?(
                                            <div id={style.dataBox} style={{maxWidth:"1000px"}}>
                                            <div style={{padding:"35px 40px 28px 40px"}}>
                                                <div className={style.wrapBin}>
                                                    <div>
                                                        <label>
                                                            E-mail
                                                        </label>
                                                        <div>
                                                            <input  value={user.email} readOnly={true}/>                                                            
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label>
                                                            Número de teléfono
                                                        </label>
                                                        <div>
                                                            <input style={editable?editableStyle:undefined} value={userData.phone} name="phone" readOnly={!editable} maxLength={11}  onChange={(e)=>handlerChange(e)}/>                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={style.wrapBin}>
                                                    <div>
                                                        <label>
                                                            Nombre
                                                        </label>
                                                        <div>
                                                            <input style={editable?editableStyle:undefined} value={userData.name} name="name"  readOnly={!editable} onChange={(e)=>handlerChange(e)}/>                                                            
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label>
                                                            Apellido
                                                        </label>
                                                        <div>
                                                            <input style={editable?editableStyle:undefined} value={userData.surname} name="surname" readOnly={!editable}  onChange={(e)=>handlerChange(e)}/>                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={style.wrapBin}>
                                                    <div>
                                                        <label>
                                                            Cédula
                                                        </label>
                                                        <div>
                                                            <input style={editable?editableStyle:undefined} value={userData.dni} name="dni" readOnly={!editable} maxLength={11} onChange={(e)=>handlerChange(e)}/>                                                            
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label>
                                                            Género
                                                        </label>
                                                        <div>
                                                            <div id={style.genderBox}  value={userData.gender} name="gender" readOnly={!editable}  onChange={(e)=>handlerChange(e)}>
                                                                <div style={editable?editableStyle:undefined} onClick={()=>setGenderEdit(!genderEdit)}>
                                                                    <span>{userData.gender === "S"? "Sin especificar": userData.gender === "M"? "Mujer" : userData.gender === "H"? "Hombre":""}</span> 
                                                                    <div className={style.arrowContainer}>
                                                                        {
                                                                            editable ? ( 
                                                                                    <span  style={genderEdit?{transform:"rotate(270deg)"}:undefined} >{">"}</span>

                                                                            ) : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div id={style.openBox} style={genderEdit?{display:"block"}:undefined}>
                                                                    <ul>
                                                                        <li onClick={()=>userData.gender = "S"}>Sin especificar</li>
                                                                        <li onClick={()=>userData.gender = "H"}>Hombre</li>
                                                                        <li onClick={()=>userData.gender = "M"}>Mujer</li>
                                                                    </ul>
                                                                </div>
                                                            </div>                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={style.wrapBin}>
                                                   
                                                </div>
                                            </div>
                                            <div id={style.foot}>
                                                {!editable? (
                                                    <div>
                                                    <button onClick={()=>setEditable(true)}>
                                                        EDITAR
                                                    </button>
                                                </div>
                                                ):
                                                   ( <div id={style.guardar}>
                                                        <label><span onClick={()=>setEditable(false)}>CANCELAR</span></label>
                                                        <label><p onClick={()=>sendUpdate()}>GUARDAR</p></label>
                                                    </div>)
                                                }
                                            </div>
                                        </div>
                                        ) : (
                                            <div style={{padding:"20px",textAlign:"center"}}>
                                                <div>
                                                    <div>
                                                        <p style={{color:"rgb(151, 152, 153)", fontSize:"24px", fontWeight:400}}>
                                                            {
                                                                section===2?"No tienes ninguna dirección registrada.":
                                                                section===3?"Aún no haz realizando ningún pedido":
                                                                section===4?"En construcción":undefined
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) 
                                    }
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {   
               modalQuit? ( 
                    <div id={style.quit} ref={modalRef}>
                        <div className={style.cover} onClick={(e)=>modalClose(e)}>
                            <div className={style.contenido}>
                                <div>
                                    <h3>¿Quieres salir?</h3>
                                </div>
                                <div id={style.guardar}>
                                    <label><span onClick={()=>modalHandler()}>CANCELAR</span></label>
                                    <label><p onClick={()=>logout()}>SALIR</p></label>
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

export default Profile;