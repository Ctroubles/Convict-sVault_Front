const DEPARTAMENTOS = {
    Amazonas: ["Leticia", "El Encanto", "La Chorrera", "La Pedrera", "Miriti-Parana", "Puerto Nariño", "Puerto Alegría",
     "Puerto Santander", "La pedrera", "Tarapacá", "La Victoria", "Puerto Arica"],
    Antioquia: [
      "Medellín", "Abejorral", "Abriaquí", "Alejandría", "Amagá", "Amalfi", "Andes", "Angelópolis", "Angostura",
      "Anorí", "Anzá", "Apartadó", "Arboletes", "Argelia", "Armenia", "Barbosa", "Bello", "Belmira", "Betania",
      "Betulia", "Briceño", "Buriticá", "Cáceres", "Caicedo", "Caldas", "Campamento", "Cañasgordas", "Caracolí",
      "Caramanta", "Carepa", "Carolina del Príncipe", "Caucasia", "Chigorodó", "Cisneros", "Ciudad Bolívar", "Cocorná",
      "Concepción", "Concordia", "Copacabana", "Dabeiba", "Donmatías", "Ebéjico", "El Bagre", "Entrerrios", "Envigado",
      "Fredonia", "Frontino", "Giraldo", "Girardota", "Gómez Plata", "Granada", "Guadalupe", "Guarne", "Guatapé",
      "Heliconia", "Hispania", "Itagüí", "Ituango", "Jardín", "Jericó", "La Ceja", "La Estrella", "La Pintada", "La Unión",
      "Liborina", "Maceo", "Marinilla", "Montebello", "Murindó", "Mutatá", "Nariño", "Nechí", "Necoclí", "Olaya", "Peñol",
      "Peque", "Pueblorrico", "Puerto Berrío", "Puerto Nare", "Puerto Triunfo", "Remedios", "Retiro", "Rionegro", "Sabanalarga",
      "Sabaneta", "Salgar", "San Andrés de Cuerquía", "San Carlos", "San Francisco", "San Jerónimo", "San José de la Montaña",
      "San Juan de Urabá", "San Luis", "San Pedro", "San Pedro de Urabá", "San Rafael", "San Roque", "San Vicente", "Santa Bárbara",
      "Santa Fé de Antioquia", "Santa Rosa de Osos", "Santo Domingo", "Segovia", "Sonsón", "Sopetrán", "Támesis", "Tarazá", "Tarso",
      "Titiribí", "Toledo", "Turbo", "Uramita", "Urrao", "Valdivia", "Valparaíso", "Vegachí", "Venecia", "Vigía del Fuerte",
      "Yalí", "Yarumal", "Yolombó", "Yondó", "Zaragoza"
    ],
    Arauca: [
      "Arauca", "Arauquita", "Cravo Norte", "Fortul", "Puerto Rondón", "Saravena", "Tame"
    ],
    Atlántico: [
      "Barranquilla", "Baranoa", "Campo de la Cruz", "Candelaria", "Galapa", "Juan de Acosta", "Luruaco",
      "Malambo", "Manatí", "Palmar de Varela", "Piojó", "Polonuevo", "Ponedera", "Puerto Colombia", "Repelón",
      "Sabanagrande", "Sabanalarga", "Santa Lucía", "Santo Tomás", "Soledad", "Suan", "Tubará", "Usiacurí"
    ],
    Bolívar: [
      "Cartagena", "Achí", "Altos del Rosario", "Arenal", "Arjona", "Arroyohondo", "Barranco de Loba", "Calamar",
      "Cantagallo", "Cicuco", "Córdoba", "Clemencia", "El Carmen de Bolívar", "El Guamo", "El Peñón", "Hatillo de Loba",
      "Magangué", "Mahates", "Margarita", "María la Baja", "Mompós", "Montecristo", "Morales", "Norosí", "Pinillos",
      "Regidor", "Río Viejo", "San Cristóbal", "San Estanislao", "San Fernando", "San Jacinto", "San Jacinto del Cauca",
      "San Juan Nepomuceno", "San Martín de Loba", "San Pablo", "Santa Catalina", "Santa Rosa", "Santa Rosa del Sur",
      "Simití", "Soplaviento", "Talaigua Nuevo", "Tiquisio", "Turbaco", "Turbaná", "Villanueva", "Zambrano"
    ],
    Boyacá: [
        "Tunja", "Almeida", "Aquitania", "Arcabuco", "Belén", "Berbeo", "Beteitiva", "Boavita", "Boyacá", "Briceño",
        "Buenavista", "Busbanzá", "Caldas", "Campohermoso", "Cerinza", "Chinavita", "Chiquinquirá", "Chiscas", "Chita",
        "Chitaraque", "Chivatá", "Chíquiza", "Chíquiza", "Ciénega", "Cómbita", "Coper", "Corrales", "Covarachía",
        "Cubará", "Cucaita", "Cuitiva", "Duitama", "El Cocuy", "El Espino", "Firavitoba", "Floresta", "Gachantivá",
        "Gámeza", "Garagoa", "Guacamayas", "Guateque", "Guayatá", "Güicán", "Iza", "Jenesano", "Jericó", "La Capilla",
        "La Uvita", "La Victoria", "Labranzagrande", "Macanal", "Maripí", "Miraflores", "Mongua", "Monguí", "Moniquirá",
        "Motavita", "Muzo", "Nobsa", "Nuevo Colón", "Oicatá", "Otanche", "Pachavita", "Páez", "Paipa", "Pajarito", "Panqueba",
        "Pauna", "Paya", "Paz de Río", "Pesca", "Pisba", "Puerto Boyacá", "Quípama", "Ramiriquí", "Ráquira", "Rondón",
        "Saboyá", "Sáchica", "Samacá", "San Eduardo", "San José de Pare", "San Luis de Gaceno", "San Mateo",
        "San Miguel de Sema", "San Pablo de Borbur", "Santa María", "Santa Rosa de Viterbo", "Santa Sofía", "Santana",
        "Sativanorte", "Sativasur", "Siachoque", "Soatá", "Socotá", "Socha", "Sogamoso", "Somondoco", "Sora", "Soracá",
        "Susacón", "Sutamarchán", "Sutatenza", "Tasco", "Tenza", "Tibaná", "Tibasosa", "Tinjacá", "Tipacoque", "Toca",
        "Togüí", "Tópaga", "Tota", "Tununguá", "Turmequé", "Tuta", "Tutazá", "Úmbita", "Ventaquemada", "Villa de Leyva",
        "Viracachá", "Zetaquirá"
      ],
      Caldas: [
      "Manizales", "Aguadas", "Anserma", "Aranzazu", "Belalcázar", "Chinchiná", "Filadelfia", "La Dorada", "La Merced",
      "Manzanares", "Marmato", "Marquetalia", "Marulanda", "Neira", "Norcasia", "Pácora", "Palestina", "Pensilvania",
      "Riosucio", "Risaralda", "Salamina", "Samaná", "San José", "Supía", "Victoria", "Villamaría", "Viterbo"
      ],
      Caquetá: [
      "Florencia", "Albania", "Belén de los Andaquíes", "Cartagena del Chairá", "Curillo", "El Doncello", "El Paujil",
      "La Montañita", "Milán", "Morelia", "Puerto Rico", "San José de Fragua", "San Vicente del Caguán", "Solano",
      "Solita", "Valparaíso"
      ],
      Casanare: [
      "Yopal", "Aguazul", "Chámeza", "Hato Corozal", "La Salina", "Maní", "Monterrey", "Nunchía", "Orocué", "Paz de Ariporo",
      "Pore", "Recetor", "Sabanalarga", "Sácama", "San Luis de Palenque", "Támara", "Tauramena", "Trinidad", "Villanueva"
      ],
      Cauca: [
        "Popayán", "Almaguer", "Argelia", "Balboa", "Bolívar", "Buenos Aires", "Cajibío", "Caldono", "Caloto", "Corinto",
        "El Tambo", "Florencia", "Guachene", "Guapi", "Inzá", "Jambaló", "La Sierra", "La Vega", "López de Micay",
        "Mercaderes", "Miranda", "Morales", "Padilla", "Páez", "Patía", "Piendamó", "Puerto Tejada", "Puracé",
        "Rosas", "San Sebastián", "Santander de Quilichao", "Santa Rosa", "Silvia", "Sotará", "Suárez", "Sucre",
        "Timbío", "Timbiquí", "Toribío", "Totoró", "Villa Rica", "Guachené", "El Bordo"
        ],
      Cesar: [
      "Valledupar", "Aguachica", "Agustín Codazzi", "Astrea", "Becerril", "Bosconia", "Chimichagua", "Chiriguaná",
      "Curumaní", "El Copey", "El Paso", "Gamarra", "González", "La Gloria", "La Jagua de Ibirico", "La Paz",
      "Manaure Balcón del Cesar", "Pailitas", "Pelaya", "Pueblo Bello", "Río de Oro", "San Alberto", "San Diego",
      "San Martín", "Tamalameque"
      ],
      Chocó: [
        "Quibdó", "Acandí", "Alto Baudó", "Bagadó", "Bahía Solano", "Bajo Baudó", "Bojayá", "Cantón de San Pablo",
        "Carmen del Darién", "Certeguí", "Condoto", "El Atrato", "El Carmen de Atrato", "El Litoral del San Juan",
        "Istmina", "Juradó", "Lloró", "Medio Atrato", "Medio Baudó", "Medio San Juan", "Nóvita", "Nuquí", "Río Iró",
        "Río Quito", "Riosucio", "San José del Palmar", "Sipí", "Tadó", "Unguía", "Unión Panamericana", "Arquía"
        ],
      Córdoba: [
      "Montería", "Ayapel", "Buenavista", "Canalete", "Cereté", "Chimá", "Chinú", "Ciénaga de Oro", "Cotorra",
      "La Apartada", "Lorica", "Los Córdobas", "Momil", "Montelíbano", "Moñitos", "Planeta Rica", "Pueblo Nuevo",
      "Puerto Escondido", "Puerto Libertador", "Purísima", "Sahagún", "San Andrés de Sotavento", "San Antero",
      "San Bernardo del Viento", "San Carlos", "San José de Uré", "San Pelayo", "Tierralta", "Tuchín", "Valencia"
      ],
      Cundinamarca: [
      "Bogotá", "Agua de Dios", "Albán", "Anapoima", "Anolaima", "Apulo", "Arbeláez", "Beltrán", "Bituima", "Bojacá", "Cabrera", "Cachipay", "Cajicá", "Caparrapí", "Cáqueza", "Carmen de Carupa", "Chaguaní", "Chía", "Chipaque",
      "Choachí", "Chocontá", "Cogua", "Cota", "Cucunubá", "El Colegio", "El Peñón", "El Rosal", "Facatativá",
      "Fómeque", "Fosca", "Funza", "Fúquene", "Fusagasugá", "Gachalá", "Gachancipá", "Gachetá", "Gama", "Girardot",
      "Granada", "Guachetá", "Guaduas", "Guasca", "Guataquí", "Guatavita", "Guayabal de Síquima", "Guayabetal",
      "Gutiérrez", "Jerusalén", "Junín", "La Calera", "La Mesa", "La Palma", "La Peña", "La Vega", "Lenguazaque",
      "Machetá", "Madrid", "Manta", "Medina", "Mosquera", "Nariño", "Nemocón", "Nilo", "Nimaima", "Nocaima",
      "Venecia", "Pacho", "Paime", "Pandi", "Paratebueno", "Pasca", "Puerto Salgar", "Pulí", "Quebradanegra", "Quetame",
      "Quipile", "Ricaurte", "San Antonio de Tequendama", "San Bernardo", "San Cayetano", "San Francisco", "San Juan de Rioseco",
      "Sasaima", "Sesquilé", "Sibaté", "Silvania", "Simijaca", "Soacha", "Sopó", "Subachoque", "Suesca", "Supatá",
      "Susa", "Sutatausa", "Tabio", "Tausa", "Tena", "Tenjo", "Tibacuy", "Tibirita", "Tocaima", "Tocancipá", "Topaipí",
      "Ubalá", "Ubaque", "Ubaté", "Une", "Útica", "Vergara", "Viani", "Villagómez", "Villapinzón", "Villeta", "Viotá",
      "Yacopí", "Zipacón", "Zipaquirá"
      ],
      Guainía: [
      "Inírida", "Barranco Minas", "Mapiripana", "San Felipe", "Cacagual", "La Guadalupe", "Morichal Nuevo", "Pana Pana",
      "Puerto Colombia"
      ],
      Guaviare: [
      "San José del Guaviare", "Calamar", "El Retorno", "Miraflores"
      ],
      Huila: [
      "Neiva", "Acevedo", "Agrado", "Aipe", "Algeciras", "Altamira", "Baraya", "Campoalegre", "Colombia", "Elias",
      "Garzón", "Gigante", "Guadalupe", "Hobo", "Iquira", "Isnos", "La Argentina", "La Plata", "Natagaima", "Oporapa",
      "Paicol", "Palermo", "Palestina", "Pital", "Pitalito", "Rivera", "Saladoblanco", "San Agustín", "Santa María",
      "Suaza", "Tarqui", "Tello", "Teruel", "Tesalia", "Timaná", "Villavieja", "Yaguará"
      ],
      Guajira: [
      "Riohacha", "Albania", "Barrancas", "Dibulla", "Distracción", "El Molino", "Fonseca", "Hatonuevo", "La Jagua del Pilar", "Maicao", "Manaure", "San Juan del Cesar", "Uribia", "Urumita", "Villanueva"
      ],
      Magdalena: [
        "Santa Marta", "Algarrobo", "Aracataca", "Ariguaní", "Cerro de San Antonio", "Chibolo", "Ciénaga", "El Banco",
        "El Piñón", "El Retén", "Fundación", "Guamal", "Nueva Granada", "Pedraza", "Pijiño del Carmen", "Pivijay",
        "Plato", "Puebloviejo", "Remolino", "Sabanas de San Ángel", "Salamina", "San Sebastián de Buenavista", "San Zenón",
        "Santa Ana", "Santa Bárbara de Pinto", "Sitionuevo", "Tenerife", "Zapayán", "Zona Bananera", "Santa Marta (Distrito Turístico, Cultural e Histórico)"
        ],
      Meta: [
      "Villavicencio", "Acacías", "Barranca de Upía", "Cabuyaro", "Castilla la Nueva", "Cubarral", "Cumaral",
      "El Calvario", "El Castillo", "El Dorado", "Fuente de Oro", "Granada", "Guamal", "Mapiripán", "Mesetas",
      "La Macarena", "Uribe", "Lejanías", "Puerto Concordia", "Puerto Gaitán", "Puerto López", "Puerto Lleras",
      "Puerto Rico", "Restrepo", "San Carlos de Guaroa", "San Juan de Arama", "San Juanito", "San Martín",
      "Vistahermosa"
      ],
      Nariño: [
      "Pasto", "Albán", "Aldana", "Ancuyá", "Arboleda", "Barbacoas", "Belén", "Buesaco", "Chachagüí", "Colón", "Consacá",
      "Contadero", "Córdoba", "Cuaspud", "Cumbal", "Cumbitara", "El Charco", "El Peñol", "El Rosario", "El Tablón de Gómez",
      "El Tambo", "Francisco Pizarro", "Funes", "Guachucal", "Guaitarilla", "Gualmatán", "Iles", "Imués", "Ipiales",
      "La Cruz", "La Florida", "La Llanada", "La Tola", "La Unión", "Leiva", "Linares", "Los Andes", "Magüi", "Mallama",
      "Mosquera", "Nariño", "Olaya Herrera", "Ospina", "Pasto", "Policarpa", "Potosí", "Providencia", "Puerres", "Pupiales", "Ricaurte", "Roberto Payán", "Samaniego", "San Bernardo", "San Lorenzo", "San Pablo",
      "San Pedro de Cartago", "Sandoná", "Santa Bárbara", "Santacruz", "Sapuyes", "Taminango", "Tangua", "Tumaco",
      "Túquerres", "Yacuanquer"
      ],
      "Norte de Santander": [
      "Cúcuta", "Abrego", "Arboledas", "Bochalema", "Bucarasica", "Cáchira", "Cácota", "Chinácota", "Chitagá",
      "Convención", "Cucutilla", "Duranía", "El Carmen", "El Tarra", "El Zulia", "Gramalote", "Hacarí", "Herrán",
      "La Esperanza", "La Playa", "Labateca", "Los Patios", "Lourdes", "Mutiscua", "Ocaña", "Pamplona", "Pamplonita",
      "Puerto Santander", "Ragonvalia", "Salazar de las Palmas", "San Calixto", "San Cayetano", "Santiago", "Sardinata",
      "Silos", "Teorama", "Tibú", "Toledo", "Villa Caro", "Villa del Rosario"
      ],
      Putumayo: [
      "Mocoa", "Colón", "Orito", "Puerto Asís", "Puerto Caicedo", "Puerto Guzmán", "Puerto Leguízamo", "San Francisco",
      "San Miguel", "Santiago", "Sibundoy", "Valle del Guamuez", "Villagarzón"
      ],
      Quindío: [
      "Armenia", "Buenavista", "Calarcá", "Circasia", "Córdoba", "Filandia", "Génova", "La Tebaida", "Montenegro", "Pijao",
      "Quimbaya", "Salento"
      ],
      Risaralda: [
      "Pereira", "Apía", "Balboa", "Belén de Umbría", "Dosquebradas", "Guática", "La Celia", "La Virginia", "Marsella",
      "Mistrató", "Pueblo Rico", "Quinchía", "Santa Rosa de Cabal", "Santuario"
      ],
      "San Andrés y Providencia": [
      "San Andrés", "Providencia", "Santa Catalina"
      ],
      Santander: [
      "Bucaramanga", "Aguada", "Albania", "Aratoca", "Barbosa", "Barichara", "Barrancabermeja", "Betulia", "Bolívar",
      "Cabrera", "California", "Capitanejo", "Carcasí", "Cepitá", "Cerrito", "Charalá", "Charta", "Chima", "Chipatá",
      "Cimitarra", "Concepción", "Confines", "Contratación", "Coromoro", "Curití", "El Carmen de Chucurí", "El Guacamayo",
      "El Peñón", "El Playón", "Encino", "Enciso", "Florián", "Floridablanca", "Galán", "Gambita", "Girón", "Guaca",
      "Guadalupe", "Guapotá", "Guavatá", "Guepsa", "Hato", "Jesús María", "Jordán", "La Belleza", "La Paz", "Landázuri",
      "Lebrija", "Los Santos", "Macaravita", "Málaga", "Matanza", "Mogotes", "Molagavita", "Ocamonte", "Oiba", "Onzaga",
      "Palmar", "Palmas del Socorro", "Páramo", "Piedecuesta", "Pinchote", "Puente Nacional", "Puerto Parra", "Puerto Wilches",
      "Rionegro", "Sabana de Torres", "San Andrés", "San Benito", "San Gil", "San Joaquín", "San José de Miranda", "San Miguel",
      "San Vicente de Chucurí", "Santa Bárbara", "Santa Helena del Opón", "Simacota", "Socorro", "Suaita", "Sucre", "Suratá",
      "Tona", "Valle de San José", "Vélez", "Vetas", "Villanueva", "Zapatoca"
      ],
      Sucre: [
      "Sincelejo", "Buenavista", "Caimito", "Coloso", "Corozal", "Coveñas", "Chalán", "El Roble", "Galeras", "Guaranda",
      "La Unión", "Los Palmitos", "Majagual", "Morroa", "Ovejas", "Palmito", "San Antonio de Palmito", "San Benito Abad",
      "San Juan de Betulia", "San Marcos", "San Onofre", "San Pedro", "Santiago de Tolú", "Sincé", "Sucre", "Tolú Viejo"
      ],
      Tolima: [
      "Ibagué", "Alpujarra", "Alvarado", "Ambalema", "Anzoátegui", "Armero", "Ataco", "Cajamarca", "Carmen de Apicalá",
      "Casabianca", "Chaparral", "Coello", "Coyaima", "Cunday", "Dolores", "Espinal", "Falan", "Flandes", "Fresno",
      "Guamo", "Herveo", "Honda", "Ibagué", "Icononzo", "Lérida", "Líbano", "Mariquita", "Melgar", "Murillo", "Natagaima",
      "Ortega", "Palocabildo", "Piedras", "Planadas", "Prado", "Purificación", "Rioblanco", "Roncesvalles", "Rovira",
      "Saldaña", "San Antonio", "San Luis", "Santa Isabel", "Suárez", "Valle de San Juan", "Venadillo", "Villahermosa",
      "Villarrica"
      ],
      "Valle del Cauca": [
      "Cali", "Alcalá", "Andalucía", "Ansermanuevo", "Argelia", "Bolívar", "Buenaventura", "Bugalagranda", "Caicedonia", "Calima", "Candelaria", "Cartago", "Dagua", "El Águila", "El Cairo", "El Cerrito", "El Dovio",
      "Florida", "Ginebra", "Guacarí", "Jamundí", "La Cumbre", "La Unión", "La Victoria", "Obando", "Palmira", "Pradera",
      "Restrepo", "Riofrío", "Roldanillo", "San Pedro", "Sevilla", "Toro", "Trujillo", "Tuluá", "Ulloa", "Versalles",
      "Vijes", "Yotoco", "Yumbo", "Zarzal", "Popayán"
      ],
      Vaupés: [
      "Mitú", "Carurú", "Pacoa", "Taraira", "Yavaraté", "Papunaua"
      ],
      Vichada: [
      "Puerto Carreño", "Cumaribo", "La Primavera", "Santa Rosalía", "San José de Ocune"
      ]
};
const validators = (target,value) =>{
    let result = false;

    const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;

    switch (target) {
        case "country":
            result = false;
            break;        
        case "department":
            if(regex.test(value))result = true
            else result = false
            if(value.length>25)result=false;
            if(value.length===0)result = true
            break;     
        case "city":
              if(regex.test(value))result = true
            else result = false
            if(value.length>25)result=false;
            if(value.length===0)result = true
            break;      
        case "street":
            if(value.length <= 50)result=true
            else result= false
            break;
        case "number":
            if(value.length <= 10)result=true
            else result= false
            break;          
        case "extraData":
            if(value.length <= 50)result=true
            else result= false
            break;  
             

        default:
            break;
    }
    return result;
};



const validatorsLevel2 = (setErrorsForm, currentForm) =>{
    const errors= {};
    let aproved = true

    for(let prop in currentForm){
        switch (prop) {
            case "country":        
                break;
            case "department":
                if(!Object.keys(DEPARTAMENTOS).includes(currentForm[prop])){
                    errors[prop]=true;
                    aproved = false
                }
                break;     
            case "city":
                if(!DEPARTAMENTOS[currentForm.department]?.includes(currentForm[prop])){
                    errors[prop]=true;
                    aproved = false
                }
                break;           
            case "street":
                if(!currentForm[prop] || currentForm[prop].length > 50){
                    errors[prop]=true;
                    aproved = false
                }
                break; 
            case "number":
                if(!currentForm[prop] || currentForm[prop].length > 10){
                    errors[prop]=true;
                    aproved = false
                }
                break;             
            case "extraData":
                if(!currentForm[prop] || currentForm[prop].length > 50) {
                    errors[prop]=true;
                    aproved = false
                }
                break; 
            default:
                break;
         }
    }
    setErrorsForm(errors)
    return aproved;
};



export{
    validators,
    validatorsLevel2,
    DEPARTAMENTOS,
}