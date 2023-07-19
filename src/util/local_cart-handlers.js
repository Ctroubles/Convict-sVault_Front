function add_item(carrito, item_id) {
    let cart = [...carrito]

    let result = cart.reduce((acc, objeto, index) => {
        if (objeto.hasOwnProperty(item_id)) {
            return { found_object: objeto, indiceEncontrado: index };
        }
        return acc;
    }, { found_object: null, indiceEncontrado: -1 });    

    if (result.found_object) {
        cart[result.indiceEncontrado]={[item_id]: Number(result.found_object[item_id]) + 1 };
    }else{
        cart.push({[item_id]:1})
    }
    
    return cart;
};

function substrac_item(carrito, item_id) {
    let cart = [...carrito]
    
    let result = cart.reduce((acc, objeto, index) => {
        if (objeto.hasOwnProperty(item_id)) {
            return { found_object: objeto, indiceEncontrado: index };
        }
        return acc;
    }, { found_object: null, indiceEncontrado: -1 });      

    if (result.found_object[item_id] > 1) {
        cart[result.indiceEncontrado]={[item_id]: Number(result.found_object[item_id]) - 1 };
    }else{
        cart.splice(result.indiceEncontrado, 1);
    }

    return cart;
};

function remove_item(carrito, item_id) {
    let cart = [...carrito]
    
    let result = cart.reduce((acc, objeto, index) => {
        if (objeto.hasOwnProperty(item_id)) {
            return { found_object: objeto, indiceEncontrado: index };
        }
        return acc;
    }, { found_object: null, indiceEncontrado: -1 });        
    if (result.found_object) {
        cart.splice(result.indiceEncontrado, 1);
    }else{
        alert("Su carrito de usuario no tiene el item a eliminar");
    }
    return cart
};


function getItemQuantity(carrito, item_id) {
    let quantity = 0;
    let cart = [...carrito]

    let found_object = cart.find(objeto => objeto.hasOwnProperty(item_id)) || null ;  

    if (found_object) {
        quantity = Number(found_object[item_id]);
    }

    return quantity;
}

export {
    add_item,
    substrac_item,
    remove_item,
    getItemQuantity,
}