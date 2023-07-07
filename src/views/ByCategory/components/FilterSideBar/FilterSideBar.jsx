import setting from "./assets/settings.png";
import style from "./FilterSideBar.module.css";
import arrow from "./assets/arrow.png";
import { useEffect, useState } from "react";

const FilterSideBar = ({ sortProductsDescending, sortProductsAscending }) => {
  return (
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
          <Filtro filtro={"Precio"} sortProductsDescending={sortProductsDescending} sortProductsAscending={sortProductsAscending} />
        </div>
      </label>
    </div>
  );
};

const Filtro = ({ filtro, sortProductsDescending, sortProductsAscending }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSortDescending = () => {
    sortProductsDescending();
    setIsMenuOpen(false);
  };

  const handleSortAscending = () => {
    sortProductsAscending();
    setIsMenuOpen(false);
  };

  return (
    <div id={style.Filtro}>
      <p onClick={handleMenuToggle}>{filtro}</p>
      <img src={arrow} alt="Flecha" onClick={handleMenuToggle} />
      {isMenuOpen && (
        <div id={style.menuOptions}>
          <span onClick={handleSortDescending}>Descendente</span>
          <span onClick={handleSortAscending}>Ascendente</span>
        </div>
      )}
    </div>
  );
};

export default FilterSideBar;
