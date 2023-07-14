const DEPARTAMENTOS =  [
    "Amazonas",
    "Antioquia",
    "Arauca",
    "Atlántico",
    "Bolívar",
    "Boyacá",
    "Caldas",
    "Caquetá",
    "Casanare",
    "Cauca",
    "Cesar",
    "Chocó",
    "Córdoba",
    "Cundinamarca",
    "Guainía",
    "Guaviare",
    "Huila",
    "La Guajira",
    "Magdalena",
    "Meta",
    "Nariño",
    "Norte de Santander",
    "Putumayo",
    "Quindío",
    "Risaralda",
    "San Andrés y Providencia",
    "Santander",
    "Sucre",
    "Tolima",
    "Valle del Cauca",
    "Vaupés",
    "Vichada"
]
const PROVINCIAS = ["Medellín", "Bello", "Envigado", "Itagüí", "Barranquilla", "Soledad", "Malambo", "Sabanalarga", "Tunja", "Duitama", "Sogamoso", "Chiquinquirá"];
const CIUDADES = [  "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Santa Marta",
    "Bucaramanga",
    "Pereira",
    "Ibagué",
    "Cúcuta",
    "Villavicencio",
    "Pasto",
    "Manizales",
    "Neiva",
    "Valledupar",
    "Montería",
    "Armenia",
    "Sincelejo",
    "Popayán",
    "Tunja"
];





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
        case "province":
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
                if(!DEPARTAMENTOS.includes(currentForm[prop])){
                    errors[prop]=true;
                    aproved = false
                }
                break;
            case "province":
                if(!PROVINCIAS.includes(currentForm[prop])){
                    errors[prop]=true;
                    aproved = false
                }
                    break;     
            case "city":
                if(!CIUDADES.includes(currentForm[prop])){
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
    PROVINCIAS,
    CIUDADES,
}