import style from "./ByCategory.module.css";
import FilterSideBar from "./components/FilterSideBar/FilterSideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import homeIcon from "./assets/home_icon.svg";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../util";
import Url_deploy_back from "../../util/deploy_back";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";



const ByCategory = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  
  const location = useLocation();
  const { cat } = useParams();

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    setSort(null)
  }, [location])

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${Url_deploy_back}/products/category/${cat}`);
      const dataClean = data.filter(e => Number(e.stock )> 0);
      setProducts(dataClean);
    } catch (error) {
      console.log(error);
      alert("Error al traer Data, checar en consola");
    }
  };

  useEffect(() => {
    getProducts();
  }, [cat]);

  const sortProductsDescending = () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    setProducts(sorted);
    setSort(1)
  };

  const sortProductsAscending = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setProducts(sorted);
    setSort(2)
  };

  return (
    <div id={style.ByCategory}>
      <section>
        <div style={{ maxWidth: "1300px", width: "100%" }}>
          <div style={{ paddingRight: "30px" }}>
            <FilterSideBar sortProductsDescending={sortProductsDescending} sortProductsAscending={sortProductsAscending} sort={sort}/>
          </div>
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "end", padding: "0px 0 20px 10px" }}>
              <div style={{ width: "28px", height: "28px" }}>
                <img src={homeIcon} alt="Home" style={{ width: "28px", height: "28px" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ fontWeight: "400", margin: "0 9px 0 9px", fontSize: "20px" }}>{">"}</div>
                <span style={{ fontSize: "16px", color: "rgb(37, 44, 59)" }}>{capitalizeFirstLetter(cat ? cat : "Categoría sin definir")}</span>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <div id={style.cardsContaier}>
                {products.map((e) => (
                  <Card key={e._id} brand={e.brand} category={e.category} image={e.image} price={e.price} name={e.name} id={e._id} stock={e.stock} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ByCategory;
