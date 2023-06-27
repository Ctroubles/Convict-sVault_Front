import setting from "./assets/settings.png"
import style from "./FilterSideBar.module.css"
import arrow from "./assets/arrow.png"

const FilterSideBar = () =>{
    return(
        <div id={style.FilterSideBar}>
            <label>
                <div>
                    <div id={style.top}>
                            <img src={setting} alt="Filtros" />
                        <div>
                            <label>Filtros</label>
                        </div>
                    </div>
                </div>
                <div id={style.lineOptions}>
                    <Filtro filtro={"Categoría"}/>
                    <Filtro filtro={"Marca"}/>
                    <Filtro filtro={"Precio"}/>
                </div>
            </label>
        </div>
    )
};



const Filtro = ({filtro}) =>{
    return(
        <div id={style.Filtro}>
            <p>{filtro}</p>
            <img src={arrow} alt="Flecha"/>
        </div>
    )
};


export default FilterSideBar;