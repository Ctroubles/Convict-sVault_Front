import { DEPARTAMENTOS } from "../Profile/sections/direcciones/utils/utils";

const validators = (target,value) =>{
    let result = false;
    const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;

    switch (target) {      
        case "name":
            if(value.length <= 60 && regex.test(value))result=true
            else result= false
            break;  
        case "departament":
            if(regex.test(value) && value.length<45)result = true
            else result = false
            if(value.length===0)result = true
            break;     
        case "city":
            if(regex.test(value) && value.length<45)result = true
            else result = false
            if(value.length===0)result = true
            break;      
        case "address":
            if(value.length <= 60)result=true
            else result= false
            break;
        case "phone":
            if((value.length <= 10 && /^[0-9]+$/.test(value)) || value.length === 0)result=true
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
    console.log(currentForm);
    for(let prop in currentForm){
        switch (prop) {
            case "name":
                if(!currentForm[prop] || currentForm[prop].length > 60){
                    errors[prop]=true;
                    aproved = false
                }
                break;
            case "departament":
                if(!Object.keys(DEPARTAMENTOS).includes(currentForm[prop])){
                    errors[prop]=true;
                    aproved = false
                }
                break;     
            case "city":
                if(!DEPARTAMENTOS[currentForm.departament]?.includes(currentForm[prop])){
                    errors[prop]=true;
                    aproved = false
                }
                break;           
            case "address":
                if(!currentForm[prop] || currentForm[prop].length > 60){
                    errors[prop]=true;
                    aproved = false
                }
                break; 
            case "phone":
                if(!currentForm[prop] || currentForm[prop].length !== 10 || currentForm[prop]?.charAt(0) !== "3" || !/^[0-9]+$/.test(currentForm[prop])){
                    errors[prop]=true;
                    aproved = false
                }
                break;              
            default:
                break;
         }
    }
    console.log(errors);
    setErrorsForm(errors)
    return aproved;
};



export{
    validators,
    validatorsLevel2,
}