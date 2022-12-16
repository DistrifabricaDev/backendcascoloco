const fetch = require("node-fetch");

const { XMLParser } = require("fast-xml-parser");
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
};
const parser = new XMLParser(options);

const getProducts = async () => {
    try {
        const res = await fetch(
            'https://serverpruebas.tk/api/products/?display=full&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH'
        );
        const data = await res.text();
        let jsonObj = parser.parse(data);
        let products = jsonObj.prestashop.products.product;
        let producto = []
        let text = '#text'
        products.map(({ id, price, quantity, name, reference }) => {
            producto.push({ id, price: price * 1.19, quantity: quantity[text], name: name.language[text], reference })
        })
        return producto
    } catch (error) {
        console.log(error);
    }
};

/* filtrar producto por id */

const getProduct = async (id) => {                                                                                                                                                      
    try {
        const res = await fetch(
            `https://serverpruebas.tk/api/products/${id}?display=full&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH`
        );
        const data = await res.text();
        let jsonObj = parser.parse(data);
        let text1 = "#text"
        let products = jsonObj.prestashop.product.quantity;
        let producto = []
        // let text = '#text'
        // products.map(({ text}) => {
        //     producto.push({ text})
        // })
        // return products
        console.log(products);
    } catch (error) {
        console.log(error);
    }
};

const createProduct = async (product) => {
    try {
        const res = await fetch(
            'https://serverpruebas.tk/api/products?display=full&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            }
        );
        const data = await res.text();
        let jsonObj = parser.parse(data);
        let products = jsonObj.prestashop.products;
        let producto = []
        // let text = '#text'
        // products.map(({ id, price, quantity, name, reference }) => {
        //     producto.push({ id, price: price * 1.19, quantity: quantity[text], name: name.language[text], reference })
        // })
        return producto
    } catch (error) {
        console.log(error);
    }
};



const updateProduct = async (id, product) => {
    try {
        const res = await fetch(
            `https://serverpruebas.tk/api/products/${id}?display=full&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH`,

            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            }
        );
        const data = await res.text();
        let jsonObj = parser.parse(data);
        let text1 = "#text"
        let products = jsonObj.prestashop.product;
        let producto = []
        // let text = '#text'
        // products.map(({ id, price, quantity, name, reference }) => {
        //     producto.push({ id, price: price * 1.19, quantity: quantity[text], name: name.language[text], reference })
        // })
        // producto 
        // return producto
        console.log(products)                                                                                                       
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct
}







