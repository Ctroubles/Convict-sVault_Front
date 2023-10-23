import setting from "./assets/settings.png";
import style from "./FilterSideBar.module.css";
import arrow from "./assets/arrow.png";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const FilterSideBar = ({ sortProductsDescending, sortProductsAscending, sort}) => {
  return (
    <div id={style.FilterSideBar}>
      <label>
        <div>
          <div id={style.top}>
            <img style={{filter: 'invert(var(--invert-percent))'}} src={setting} alt="Filtros" />
            <div>
              <label>Filtros</label>
            </div>
          </div>
        </div>
        <div id={style.lineOptions}>
          <Filtro filtro={"Precio"} sortProductsDescending={sortProductsDescending} sortProductsAscending={sortProductsAscending} sort={sort}/>
        </div>
      </label>
    </div>
  );
};

const Filtro = ({ filtro, sortProductsDescending, sortProductsAscending, sort}) => {

  const buttonRef = useRef(null);


  const [open, setOpen] = useState(null);


  const handleMenuToggle = () => {
      setOpen(true);
  };

  const handleClickOutside = () => {
      setOpen(false);
  };

  useEffect(() => {
    if (open === true) {
      document.addEventListener("click", handleClickOutside);
    }else if(open === false){
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  const handleSortDescending = () => {
    sortProductsDescending();
  };

  const handleSortAscending = () => {
    sortProductsAscending();
  };

  return (
    <div id={style.Filtro} onClick={()=>handleMenuToggle()} className={open?style.open:undefined}>
      <p onClick={handleMenuToggle}>{filtro}</p>
      <img src={arrow} alt="Flecha"  />
      {open && (
        <div id={style.menuOptions}>
          <span onClick={handleSortDescending} ref={buttonRef} id={sort===1?style.active:undefined}>Mayora menor</span>
          <span onClick={handleSortAscending} ref={buttonRef} id={sort===2?style.active:undefined}>Menor a mayor</span>
        </div>
      )}
    </div>
  );
};

export default FilterSideBar;
