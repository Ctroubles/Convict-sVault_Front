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

function capitalizeFirstLetter(str) {
  if (typeof(str)==="string") {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }else{
    return ""
  }
}
function capitalizeEachWord(str) {
  if(!str || typeof str !== 'string') {
    return '';
  }
  
  return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
}

export{
    cleanPathname,
    paginationArray,
    capitalizeFirstLetter,
    capitalizeEachWord,
}
