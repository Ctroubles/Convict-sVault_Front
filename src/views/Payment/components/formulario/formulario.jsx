import { useRef, useState } from "react";
import styles from "./formulario.module.css";
import cities from "../../../../util/cities";


const Formulario = ({user}) =>{

    const direcc = ["Dirección 1", "Dirección 2", "Dirección 3"];

    const callbackRef = useRef(null);


    const [form,setForm] = useState({
        name: user?.name || "",
        city:"",
        address:"",
        phone:"",
    })
    const [ciudades, setCiudades] = useState([...cities])
    const [direcciones, setDirecciones] = useState(direcc)
    const [targetMenu, setMenuTarget] = useState()

    const handlerChange = (e) =>{   
        const value = e.target.value;
        const target = e.target.id;
        setForm({...form,[target]:value})
    };
    const inputsOptionsHandlerChange = (e) =>{
        const value = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const target = e.target.name;
        if (value) {
            switch (target) {
                case "city":
                    const coincidence = cities.filter(e=>e.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.trim()));
                    setCiudades(coincidence);
                    break;
                case "address":
                    const coincidenceAdrress = direcc.filter(e=>e.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.trim()));
                    setDirecciones(coincidenceAdrress);
                    break
                default:
                    break;
            }
            setForm({...form, [target]:value})
        }else{
            switch (target) {
                case "city":
                    setCiudades(cities)
                    break;
                case "address":
                    setDirecciones(direcc);
                    break
                default:
                    break;
            }
            setForm({...form, [target]:value})
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
                    </div>
                </div>
                <div className={styles.section}>
                    <div>
                        <label htmlFor="ciudad" name="city">Ciudad:</label>
                    </div>
                    <div className={styles.inputsContainer}>
                        <input
                            type="text"
                            id="ciudad"
                            value={form.city}
                            onChange={(e) => inputsOptionsHandlerChange(e)}
                            autoComplete="off"
                            onFocus={()=>handlerMenu("city")}
                            name="city"
                        />
                        <div className={styles.optionsInputs}>
                            {
                                targetMenu ==="city" ? (
                                    <div>
                                        {
                                            ciudades.map((e,i)=> (
                                                            <div key={i} className={styles.options} onClick={()=>{setForm({...form,city:e});}}>
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
                    <div className={styles.inputsContainer}>
                        <input
                            type="text"
                            id="direccion"
                            value={form.address}
                            onChange={(e) => inputsOptionsHandlerChange(e)}
                            autoComplete="off"
                            name="address"
                            onFocus={()=>handlerMenu("address")}
                        />
                        <div className={styles.optionsInputs}>
                            {
                                targetMenu ==="address" ? (
                                    <div>
                                        {
                                            direcciones.map((e,i)=> (
                                                            <div key={i} className={styles.options} onClick={()=>{setForm({...form,address: `Dirección ${i+1}`});}}>
                                                                <p >{`Dirección ${i+1}`}</p>
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
                        <label htmlFor="phone" name="phone">Celular:</label>
                    </div>
                    <div className={styles.inputsContainer} id={styles.inputPhone}>
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
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Formulario;