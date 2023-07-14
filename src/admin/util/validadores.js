const validadores = (target, value) => {
    let result = false;
  
    const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
    const regexNoNumbers = /^[^0-9]+$/;
  
    switch (target) {
      case "name":
        if (regex.test(value)) result = true;
        else result = false;
        if (value.length > 100) result = false;
        if (value.length === 0) result = true;
        break;
      case "price":
        if (!isNaN(value) && value > 0) result = true;
        else result = false;
        break;
        case "category":
      if (value !== "") result = true;
      else result = false;
      break;
      case "brand":
        if (regex.test(value)) result = true;
        else result = false;
        if (value.length > 50) result = false;
        break;
      case "stock":
        if (!isNaN(value) && value > 0) result = true;
        else result = false;
        break;
      default:
        break;
    }
    
    return result;
  };

  const validadorLevel2 = (setErrorsForm, currentForm) => {
    const errors = {};
  
    const regexName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/;
  
    for (let prop in currentForm) {
      switch (prop) {
        case "name":
          if (currentForm[prop].length > 100 || currentForm[prop] === "") errors[prop] = true;
          if (!regexName.test(currentForm[prop])) errors[prop] = true;
          break;
        case "price":
          if (isNaN(currentForm[prop]) || currentForm[prop] <= 0) errors[prop] = true;
          break;
        case "category":
          if (currentForm[prop] === "") errors[prop] = true;
          break;
        case "brand":
          if (currentForm[prop].length > 50 || currentForm[prop] === "") errors[prop] = true;
          break;
        case "stock":
          if (isNaN(currentForm[prop]) || currentForm[prop] <= 0) errors[prop] = true;
          break;
        default:
          break;
      }
    }
  
    setErrorsForm(errors);
    return errors;
  };

  export{
    validadores,
    validadorLevel2
}