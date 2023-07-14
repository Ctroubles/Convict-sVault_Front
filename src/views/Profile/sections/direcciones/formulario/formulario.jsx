import { useEffect, useState } from "react";
import style from "./formulario.module.css";
import { useRef } from "react";
import Url_deploy_back from "../../../../../util/deploy_back";
import axios from "axios";
import { DEPARTAMENTOS, validators, validatorsLevel2 } from "../utils/utils";
import { capitalizeFirstLetter } from "../../../../../util";

const Formulario = ({id, updating, data}) =>{

    const eventListenerRef = useRef()

    const [targetMenu, setMenuTarget] = useState()

    const [formAddress, setFormAddress] = useState(!updating && !data ? {
        country:"Colombia",
        department:"",
        city:"",
        street:"",
        number:"",
        extraData:"",
    } : {
        country:"Colombia",
        department: data.department,
        city: data.city,
        street: data.street,
        number: data.number,
        extraData: data.extraData,
    })

    const [errors, setErrors] = useState({
        country:null,
        department:false,
        city:false,
        street:false,
        number:false,
        extraData:false,
    })


    const handlerMenu = (menu) => {
        setMenuTarget(menu);

        if (eventListenerRef.current !== null) {
            window.removeEventListener("click", eventListenerRef.current);
        }
        eventListenerRef.current = (e) => {
            const target = e?.target?.name
            if (target === menu) {
                return
            }else{
                setMenuTarget(null);
                window.removeEventListener("click", eventListenerRef.current);
            }
        };
        window.addEventListener("click", eventListenerRef.current);
    };


    const handlerChange = ({target}) =>{
        if(validators(target.name, target.value)){ 
            setFormAddress({...formAddress, [target.name]:target.value})  
            setErrors({...errors,[target.name]:null})
        }      
    }


    const submitHandler = async() =>{
        try {
            const aproved = validatorsLevel2(setErrors,formAddress)
            if(aproved){
                 const {status} = await axios.post(`${Url_deploy_back}/users/update/address/${id}`,formAddress);
                if (status === 200) {
                    window.location.reload();
                }else throw new Error()
            }                       
        } catch (error) {
            alert("Hubo un error al añadir la nueva dirección")
            console.log(error)
        }
    }

    const updateHandler = async() =>{
        try {
            const DataToSend = {
                ...formAddress,
                department: capitalizeFirstLetter(formAddress.department),
                city: capitalizeFirstLetter(formAddress.city),
                extraData: capitalizeFirstLetter(formAddress.extraData),
                street: capitalizeFirstLetter(formAddress.street),
                number: capitalizeFirstLetter(formAddress.number),
            }
            const aproved = validatorsLevel2(setErrors,DataToSend)
            if(aproved){          
                const {status} = await axios.put(`${Url_deploy_back}/users/update/address/${id}/${data._id}`,DataToSend);
                if (status === 200) {
                    window.location.reload();
                }else throw new Error()
            }                       
        } catch (error) {
            alert("Hubo un error al añadir la nueva dirección")
            console.log(error)
        }
    }

    return(
        <article id={style.Formulario} >
            <div className={style.container}>
                
                    <div id={style.title}>
                        {
                            updating ? (
                                <h4>ACTUALIZAR DIRECCIÓN</h4>
                                ) : (
                                    <h4>NUEVA DIRECCIÓN</h4>
                                )
                        }
                    </div>             
                <div>
                    <div className={style.select}>
                        <div>
                            <span className={style.spanStyle}>Pais</span>
                        </div>
                        <div className={style.inputTopStyle} >
                            <p>Colombia</p>
                        </div>
                    </div>
                </div>
                <SelectDep setErrors={setErrors} errors={errors} formValue={"department"} form={formAddress} setForm={setFormAddress} title={"Departamento"} options={Object.keys(DEPARTAMENTOS)} targetMenu={targetMenu} handlerMenu={handlerMenu}/>
                <SelectCity setErrors={setErrors} errors={errors} formValue={"city"} form={formAddress} setForm={setFormAddress} title={"Ciudad"} options={DEPARTAMENTOS[formAddress.department]} targetMenu={targetMenu} handlerMenu={handlerMenu}/>
                <div>
                    <div className={style.select} id={formAddress.department?undefined:style.deseabledInput}>
                        <div>
                            <span className={style.spanStyle}>Calle (Jirón, Avenida)</span>
                        </div>
                        <div className={style.inputStyle}>
                            <label className={errors.street?style.danger:undefined}>
                                <input type="text" name="street" value={formAddress.street} onChange={(e)=>handlerChange(e)} autoComplete="off"/>                                
                            </label>
                        </div>
                        {
                            errors["street"] ? (
                                <div className={style.error}>
                                    <p>Este campo es requerido</p>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className={style.select} id={formAddress.department?undefined:style.deseabledInput}>
                        <div>
                            <span className={style.spanStyle}>Número</span>
                        </div>
                        <div className={`${style.inputStyle}`} >
                            <label className={errors.number?style.danger:undefined}>
                                <input type="text" name="number"  value={formAddress.number} onChange={(e)=>handlerChange(e)} autoComplete="off"/>                               
                            </label>
                        </div>
                        {
                            errors["number"] ? (
                                <div className={style.error}>
                                    <p>Este campo es requerido</p>
                                </div>
                            ) : null
                        }
                    </div>                    
                    <div className={style.select} id={formAddress.department?undefined:style.deseabledInput}>
                        <div>
                            <span className={style.spanStyle}>Información adicional (Ej.: Frente a la plaza principal)</span>
                        </div>
                        <div className={style.inputStyle}>
                            <label className={errors.extraData?style.danger:undefined}>
                                <input type="text" name="extraData" value={formAddress.extraData} onChange={(e)=>handlerChange(e)} autoComplete="off"/>                               
                            </label>
                        </div>
                        {
                            errors["extraData"] ? (
                                <div className={style.error}>
                                    <p>Es requerida esta información</p>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
                <div>
                    <div id={style.addButton} >
                        <button className={(errors.city || errors.country || errors.department || errors.extraData || errors.number || errors.province || errors.street) ? undefined: style.active} onClick={updating ?()=>updateHandler():()=>submitHandler()}>
                            {
                                updating ? "ACTUALIZAR DIRECCIÓN" : "AÑADIR DIRECCIÓN"
                            }                            
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
};

const SelectDep = ({title, options = [], handlerMenu, targetMenu, setForm, form, formValue, errors, setErrors}) =>{


    const [optionsArr, setOptiones] = useState(options)
    
    const handlerChange = (e) =>{
        if(validators(formValue, e.target.value)){
            const value = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const coincidence = options.filter(e=>e.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.trim()));
            console.log(coincidence);
            setOptiones(coincidence);
            setForm({...form, [formValue]:e.target.value})
        }      
    }


    useEffect(()=>{
        setErrors({...errors, [formValue]:null})
    },[form[formValue]])    
    


    return(
        <div className={style.select}>
            <div>
                <span className={style.spanStyle}>{title}</span>
            </div>
            <div>
                <div className={style.inputStyle} htmlFor={title}>
                    <label htmlFor={title} className={errors[formValue]?style.danger:null}>
                        <input id={title} type="text" 
                            value={form[formValue]}
                            onChange={(e) => handlerChange(e)}
                            autoComplete="off"
                            onFocus={()=>handlerMenu(title)}
                            name={title}
                            placeholder={title}
                        />
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="##0f3e99"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path></g></svg>
                        </div>
                    </label>
                    <div className={style.optionsInputs}>
                             {
                                 targetMenu === title ? (
                                    <div>
                                        {
                                            optionsArr.length ?
                                            optionsArr.map((e,i)=> (
                                                            <div onClick={()=>setForm({...form, [formValue]:e})} key={i} className={style.options}>
                                                                <p>{e}</p>
                                                            </div>
                                                            ))
                                            : (
                                                <div className={style.nonOption}>
                                                    <span>No hay coicidencia.</span>
                                                </div>
                                            ) 
                                            
                                        }
                                     </div>
                                ) : null
                            }
                    </div>
                </div>
            </div>
           {
                errors[formValue] ? (
                    <div className={style.error}>
                        <p>Ingresa un valor válido para {title}</p>
                    </div>
                ) : null
           }     
        </div>
    )
}



const SelectCity = ({title, options = [], handlerMenu, targetMenu, setForm, form, formValue, errors, setErrors}) =>{


    const [optionsArr, setOptiones] = useState(options)
    
    const handlerChange = (e) =>{
        if(validators(formValue, e.target.value)){
            const value = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const coincidence = options.filter(e=>e.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.trim()));
            setOptiones(coincidence);
            setForm({...form, [formValue]:e.target.value})
        }      
    }


    useEffect(()=>{
        setErrors({...errors, [formValue]:null})
    },[form[formValue]])

    useEffect(()=>{
        if (DEPARTAMENTOS[form.department]) {
            setOptiones(DEPARTAMENTOS[form.department])
        }else setOptiones([])
    },[form.department])

    return(
        <div className={style.select} id={form.department?undefined:style.deseabledInput}>
            <div>
                <span className={style.spanStyle}>{title}</span>
            </div>
            <div>
                <div className={style.inputStyle} htmlFor={title} >
                    <label htmlFor={title} className={errors[formValue]?style.danger:null}>
                        <input id={title} type="text" 
                            value={form[formValue]}
                            onChange={(e) => handlerChange(e)}
                            autoComplete="off"
                            onFocus={()=>handlerMenu(title)}
                            name={title}
                            placeholder={title}
                            readOnly={!form.department}
                        />
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="##0f3e99"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path></g></svg>
                        </div>
                    </label>
                    <div className={style.optionsInputs}>
                             {
                                 targetMenu === title ? (
                                    <div>
                                        {
                                            optionsArr.length ?
                                            optionsArr.map((e,i)=> (
                                                            <div onClick={()=>setForm({...form, [formValue]:e})} key={i} className={style.options}>
                                                                <p>{e}</p>
                                                            </div>
                                                            ))
                                            : (
                                                <div className={style.nonOption}>
                                                    <span>No hay coicidencia.</span>
                                                </div>
                                            ) 
                                            
                                        }
                                     </div>
                                ) : null
                            }
                    </div>
                </div>
            </div>
           {
                errors[formValue] ? (
                    <div className={style.error}>
                        <p>Ingresa un valor válido para {title}</p>
                    </div>
                ) : null
           }     
        </div>
    )
}

export default Formulario;