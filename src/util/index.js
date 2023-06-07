function cleanPathname(string){;
    const result = string[string.length-1] === "/" ? string.slice(0,-1) : string;
    return result
};

function paginationArray (array, num) {
    let resultArray = [];
    let count = 0;
    let numArray = [];
  
    for (const element of array) {
      if(count === num){
        resultArray.push(numArray);
        count = 0;
        numArray = [];
      }
      numArray.push(element)
      count++;
    }
    resultArray.push(numArray);
    return resultArray;
}


export{
    cleanPathname,
    paginationArray,
}
