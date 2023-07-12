const validators = (target,value) =>{
    let result = false;

    const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
    const regexNoNumbers = /^[^0-9]+$/;


    switch (target) {
        case "name":
            if(regex.test(value))result = true
            else result = false
            if(value.length>25)result=false;
            if(value.length===0)result = true
            break;        
        case "surname":
            if(regex.test(value))result = true
            else result = false
            if(value.length>30)result=false;
            if(value.length===0)result = true
            break;
        case "dni":
                if (!isNaN(value) && value.length<=10) result=true;
                else result =false
                if (value.length===0)result=true
                break;     
        case "phone":
                if (!isNaN(value) && value.length<=10) result=true;
                else result =false
                 if (value.length===0)result=true
            break;      
        case "email":
                if(value.length <= 64)result=true
                else result= false
            break;
        case "gender":
                result = true
            break;  
             

        default:
            break;
    }


    return result;
};



const validatorsLevel2 = (setErrorsForm, currentForm) =>{
    const errors= {};

    const regexName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/;

    for(let prop in currentForm){
        switch (prop) {
            case "name":
                if(currentForm[prop].length>20 || currentForm[prop]==="")errors[prop]=true
                if (!regexName.test(currentForm[prop])) errors[prop]=true;
                break;
            case "surname":
                if(currentForm[prop].length>25 || currentForm[prop]==="")errors[prop]=true
                if (!regexName.test(currentForm[prop])) errors[prop]=true;
                break;
            case "dni":
                if(currentForm[prop]){
                    if (isNaN(currentForm[prop]) || currentForm[prop].length!==10) errors[prop]=true;
                }
                    break;     
                    case "phone":
                        if (currentForm[prop]) {
                          if (isNaN(currentForm[prop]) || currentForm[prop].length !== 10 || currentForm[prop].charAt(0) !== "3") {
                            errors[prop] = true;
                          }
                        }
                break;           
            case "email":
                    const expresionRegular = /\S+@\S+\.\S+/;
                    if (!expresionRegular.test(currentForm[prop])) errors[prop]=true;
                break; 
            case "gender":
                    if (currentForm[prop] !== "M" && currentForm[prop] !== "F") {
                       errors[prop]=true;
                    }
                break; 
            default:
                break;
         }
    }
    setErrorsForm(errors)
    return errors;
};



export{
    validators,
    validatorsLevel2
}