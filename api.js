const fetch = require("node-fetch");

const BaseUrl = 'http://motodo.com.co/api/'
const Key = '?display=full&ws_key=S486LDQDG4RKCQBCV64QXGIHNVRDKIQI'

const { XMLParser } = require("fast-xml-parser");
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
};
const parser = new XMLParser(options);

const getProducts = async () => {
    try {
        const res = await fetch(
            BaseUrl, 'products' , Key
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

getProducts()

/*Crear funcion de editar products*/ 

const editProducts = async (id, quantity) => {
    try {
        const res = await fetch(
            `http://motodo.com.co/api/products/${id}?ws_key=S486LDQDG4RKCQBCV64QXGIHNVRDKIQI`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: {
                    quantity: quantity
                }
            })
        }
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


module.exports.getProducts = getProducts;
module.exports.editProducts = editProducts;


