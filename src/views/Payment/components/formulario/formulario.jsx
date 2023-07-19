import { useRef, useState } from "react";
import styles from "./formulario.module.css";
import { DEPARTAMENTOS } from "../../../Profile/sections/direcciones/utils/utils";
import { useEffect } from "react";
import { capitalizeFirstLetter } from "../../../../util";
import { validators } from "../../validators";


const Formulario = ({user={},formRef, errors, setErrors}) =>{
   
    function filterAdress (arr = [], value = ""){
        const formattedValue = value.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
       const filtrado= arr.filter((e)=>{
                            const address = `${e.street?e.street:""}${e.number && e.street?", "+e.number:e.number?e.number:""}${e.extraData && (e.street||e.number)?", "+e.extraData:e.extraData?e.extraData:""}`.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            if (address.includes(formattedValue)) return e;
                        })
        return filtrado;
    }
    const nombre = `${user?.name?user.name:""} ${user?.surname?user?.surname:""}`;
    const callbackRef = useRef(null);

    const [form,setForm] = useState({
        name: nombre.trim() || "",
        departament:"",
        city:"",
        address:"",
        phone: user?.phone?String(user?.phone): "",
    })
    const [selectedRadioOption, setSelectedRadioOption] = useState({});


    const getCiudades = () => DEPARTAMENTOS[capitalizeFirstLetter(form.departament)] || [];

    useEffect(()=>{
        formRef.current = form;
    },[form])

    useEffect(()=>{
        setCiudades(getCiudades());
    },[form.departament])

    const [departament, setDepartament] = useState([...Object.keys(DEPARTAMENTOS)])
    const [ciudades, setCiudades] = useState(getCiudades())
    const [direcciones, setDirecciones] = useState(user?.addresses || [])
    const [targetMenu, setMenuTarget] = useState()

    useEffect(()=>{
        if (!selectedRadioOption.other===true) {
            const { id, ...whithoutId } = selectedRadioOption;
            setForm({ ...form, ...whithoutId });
        }
    },[selectedRadioOption])


    const handlerChange = (e) =>{  
        const value = e.target.value;
        const target = e.target.id; 
        if (validators(target,value)) {
            if(e.target.id !== "name" && e.target.id !== "phone")setSelectedRadioOption({other:true})
            setErrors({...errors,[e.target.id]:null})
            setForm({...form,[target]:value})
        }
       
    };
    const inputsOptionsHandlerChange = (e) =>{

        if (validators(e.target.name,e.target.value)) {
            setSelectedRadioOption({other:true})
            setErrors({...errors,[e.target.name]:null})
            const value = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const target = e.target.name;
            if (value) {
                let coincidence = []
                switch (target) {
    
                    case "departament":
                        coincidence = Object.keys(DEPARTAMENTOS).filter(e=>e.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.trim()));
                        setDepartament(coincidence);
                        break;               
                    case "city":
                        coincidence = getCiudades().filter(e=>e.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.trim()));
                        setCiudades(coincidence);
                        break;
                    case "address":
                        coincidence = filterAdress(user?.addresses,value)
                        setDirecciones(coincidence);
                        break
                    default:
                        break;
                }
                setForm({...form, [target]:e.target.value})
            }else{
                switch (target) {
                    case "departament":
                        setDepartament(Object.keys(DEPARTAMENTOS))
                        break;                
                    case "city":
                        setCiudades(getCiudades())
                        break;
                    case "address":
                        setDirecciones(filterAdress(user?.addresses,value));
                        break
                    default:
                        break;
                }
                setForm({...form, [target]:e.target.value})
            }   
        }       
    }

    const handlerMenu = (menu) => {
        setMenuTarget(menu);

        if (callbackRef.current !== null) {
            window.removeEventListener("click", callbackRef.current);
        }
        callbackRef.current = (e) => {
            const target = e?.target?.name
            if (target === menu) {
                return
            }else{
                setMenuTarget(null);
                window.removeEventListener("click", callbackRef.current);
            }
        };
        window.addEventListener("click", callbackRef.current);
    };

    return(
        <div id={styles.Form}>
            <div id={styles.Header}>
                <div>
                    <h2>Formulario de compra</h2>
                </div>
            </div>
            <div id={styles.content}>
                <div className={styles.section}>
                    <div>
                        <label htmlFor="name">Nombre:</label>
                    </div>
                    <div className={styles.inputsContainer}>
                        <input
                            type="text"
                            id="name"
                            value={form.name}
                            onChange={(e) => handlerChange(e)}
                            autoComplete="off"
                            onFocus={()=>setMenuTarget(null)}
                        />
                        { 
                            errors.name?(<div className={styles.error}>
                                <p>Este campo es requerido</p>
                            </div>):null
                        }
                    </div>
                </div>
                <div>
                    <div id={styles.radioInputs}>
                        <div>
                            {
                               user?.addresses?.map((e,i)=>{

                                    const option = `${e.department?e.department:""}${e.city && e.department?", "+ e.city : e.city ? e.city:""} ${e.street?e.street:""}${e.number && e.street?", "+e.number:e.number?e.number:""}${e.extraData && (e.street||e.number)?", "+e.extraData:e.extraData?e.extraData:""}`
                                    const address = `${e.street?e.street:""}${e.number && e.street?", "+e.number:e.number?e.number:""}${e.extraData && (e.street||e.number)?", "+e.extraData:e.extraData?e.extraData:""}`

                                    return(
                                        <div key={i} className={styles.optionsRadio}>
                                            <input type="radio" name="ChooseAdrres" id={`${i+1}+option`} checked={selectedRadioOption?.id === i} 
                                            onChange={()=>setSelectedRadioOption({
                                                id : i,
                                                _id:e._id,
                                                departament:e.department,
                                                city:e.city,
                                                address: address
                                            })}
                                        />
                                            <label htmlFor={`${i+1}+option`} title={option}>
                                                {option}
                                            </label>
                                        </div>
                                    )
                               }) 

                               
              
                            }
                            {
                                user?.addresses?.length ?
                                    (
                                        <div className={styles.optionsRadio}>
                                            <input type="radio" name="ChooseAdrres" id={`${user?.addresses?.length} Other`} checked={selectedRadioOption.other === true } onChange={()=>setSelectedRadioOption({other:true})}/>
                                            <label htmlFor={`${user?.addresses?.length} Other`}>
                                                Otra
                                            </label>
                                        </div>
                                    ) : null
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <div>
                        <label htmlFor="departament" name="departamento">Departamento:</label>
                    </div>
                    <div className={`${styles.inputsContainer} ${errors.departament?styles.danger:undefined}`}>
                        <input
                            type="text"
                            id="departament"
                            value={form.departament}
                            onChange={(e) => inputsOptionsHandlerChange(e)}
                            autoComplete="off"
                            onFocus={()=>handlerMenu("departament")}
                            name="departament"
                        />
                        { 
                            errors.departament?(<div className={styles.error}>
                                <p>Ingresa un departamento válido</p>
                            </div>):null
                        }
                        <div className={styles.optionsInputs}>
                            {
                                targetMenu ==="departament" ? (
                                    <div>
                                        {
                                            departament.map((e,i)=> (
                                                            <div key={i} className={styles.options} onClick={()=>{setForm({...form,departament:e}); setSelectedRadioOption({other:true})}}>
                                                                <p >{e}</p>
                                                            </div>
                                                            )
                                                        )
                                        }
                                     </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>                
                <div className={styles.section}>
                    <div>
                        <label htmlFor="ciudad" name="city">Ciudad:</label>
                    </div>
                    <div className={`${styles.inputsContainer} ${errors.city?styles.danger:undefined}`}>
                        <input
                            type="text"
                            id="ciudad"
                            value={form.city}
                            onChange={(e) => inputsOptionsHandlerChange(e)}
                            autoComplete="off"
                            onFocus={()=>handlerMenu("city")}
                            name="city"
                        />
                        { 
                            errors.city?(<div className={styles.error}>
                                <p>Ingresa una ciudad valida.</p>
                            </div>):null
                        }
                        <div className={styles.optionsInputs}>
                            {
                                targetMenu ==="city" ? (
                                    <div>
                                        {
                                            ciudades.map((e,i)=> (
                                                                    <div key={i} className={styles.options} onClick={()=>{setForm({...form,city:e}); setSelectedRadioOption({other:true})}}>
                                                                        <p >{e}</p>
                                                                    </div>
                                                                    )
                                                                )
                                        }
                                     </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <div>
                        <label htmlFor="direccion" name="address">Dirección:</label>
                    </div>
                    <div className={`${styles.inputsContainer} ${errors.address?styles.danger:undefined}`} >
                        <input
                            type="text"
                            id="direccion"
                            value={form.address}
                            onChange={(e) => inputsOptionsHandlerChange(e)}
                            autoComplete="off"
                            name="address"
                            onFocus={()=>handlerMenu("address")}
                        />
                        { 
                            errors.address?(<div className={styles.error}>
                                <p>Este campo es requerido.</p>
                            </div>):null
                        }
                        <div className={styles.optionsInputs}>
                            {
                                targetMenu ==="address" ? (
                                    <div>
                                        {
                                            direcciones.map((e,i)=>{
                                                const address = `${e.street?e.street:""}${e.number && e.street?", "+e.number:e.number?e.number:""}${e.extraData && (e.street||e.number)?", "+e.extraData:e.extraData?e.extraData:""}`
                                                                return(
                                                                <div key={i} className={styles.options} onClick={()=>{setSelectedRadioOption({
                                                                    id : i,
                                                                    _id:e._id,
                                                                    departament:e.department,
                                                                    city:e.city,
                                                                    address: address
                                                                })}}>
                                                                    <p >{address}</p>
                                                                </div>
                                                                )
                                                            }
                                                        )
                                        }
                                     </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <div>
                        <label htmlFor="phone" name="phone">Celular:</label>
                    </div>
                    <div className={`${styles.inputsContainer} ${errors.phone?styles.danger:undefined}`} id={styles.inputPhone}>
                        <input
                            name="phone"
                            type="text"
                            id="phone"
                            value={form.phone}
                            onChange={(e) => handlerChange(e)}
                            pattern="[0-9]*"
                            autoComplete="off"
                            onFocus={()=>handlerMenu("phone")}
                        />
                        { 
                            errors.phone?(<div className={styles.error}>
                                <p>Ingresa un número válido.</p>
                            </div>):null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Formulario;