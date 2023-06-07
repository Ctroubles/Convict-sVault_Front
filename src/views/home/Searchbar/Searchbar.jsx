// import React, { useRef, useState } from "react";
// import Swal from "sweetalert2";
// import axios from "axios";
// import Card from "../components/Card/Card";
// const SearchBar = ({ handleFilterProduct }) => {
//   const inputRef = useRef();
//   const [inputStatus, setInputStatus] = useState("");
//   const [logoSearchBarStatus, setLogoSearchBarStatus] = useState(true);
//   const [search, setSearch] = useState([]);
//   const [filteredProduct, setFilteredProduct] = useState(null);

//   const searchProdByName = async (name) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:3001/products?name=${name}`
//       );
//       console.log(data);
//       setSearch(data);
//       setFilteredProduct(null);
//       if (data.length > 0) {
//         setFilteredProduct(data[0]); // Mostrar solo el primer producto en la búsqueda
//         handleFilterProduct(data[0]); 
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (e) => {
//     e.preventDefault();
//     const value = e.target.value;
//     setInputStatus(value);
//     value.length > 0 ? setLogoSearchBarStatus(false) : setLogoSearchBarStatus(true);
//   };

//   const handleKeyUp = () => {
//     const value = inputRef.current.value;
//     setInputStatus(value);
//     searchProdByName(value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     Swal.fire({
//       title: "Búsqueda realizada",
//       text: `Nombre buscado: ${inputRef.current.value}`,
//       position: "bottom-end",
//       icon: "success",
//       timer: 2000,
//       showConfirmButton: false,
//     });
//     setInputStatus("");
//     setLogoSearchBarStatus(true);
//   };

//   return (
//     <div className="search-bar-container">
//       <form onSubmit={handleSubmit}>
//         <input
//           className="search-bar-input"
//           placeholder="Buscar producto"
//           type="text"
//           value={inputStatus}
//           onChange={handleChange}
//           onKeyUp={handleKeyUp}
//           ref={inputRef}
//         />
//         <button className="search-bar-button" type="submit">
//           Buscar
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchBar;
