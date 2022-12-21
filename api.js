const fetch = require("node-fetch");
const axios = require('axios');
const { XMLParser } = require("fast-xml-parser");
const { response } = require("express");
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
};
const parser = new XMLParser(options);

const getProducts = async () => {
    try {
        const res = await fetch(
            'https://serverpruebas.tk/api/products?display=full&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH'
        );
        const data = await res.text();
        let jsonObj = parser.parse(data);
        let products = jsonObj.prestashop.products.product;
        let producto = []
        let text = '#text'
        products.map(({ id, price, quantity, name, reference, associations, id_product_attribute}) => {
            producto.push({ id, price: price * 1.19, quantity: quantity[text], name: name.language[text], reference, associations: associations.stock_availables.stock_available})
        })
        console.log(producto)
        return producto
    } catch (error) {
        console.log(error);
    }
};

getProducts()

const getProduct = async (id) => {
    try {
        const res = await fetch(
            `https://serverpruebas.tk/api/products/${id}?display=full&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH`
        );
        const data = await res.text();
        let jsonObj = parser.parse(data);
        let text1 = "#text"
        let products = jsonObj.prestashop.product;
        let producto = []
        return products
    } catch (error) {
        console.log(error);
    }
};



const createProduct = async (product) => {
    const { 
        name,
        price,
        quantity
    } = product
    const xmlString = `
        <prestashop>
          <product>
            <name>
               <language id="1">${name}</language>
            </name>
            <price>${price}</price>
            <stock_availables nodeType="stock_available" api="stock_availables">
               <stock_available >
                   <id>
                    ${quantity}
                   </id>
            <id_product_attribute>
            <![CDATA[ 0 ]]>
            </id_product_attribute>
        </stock_available>
        </stock_availables>
        </product>
        </prestashop>
        `
    const res = await axios.post(
        'https://serverpruebas.tk/api/products?output_format=JSON&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH', xmlString,
        {
            headers: {
                'Content-Type': 'text/xml',
            }
        }
    );
    return res.data
};



const updateProduct = async (product) => {

    const {
        id,
        name,
        price,
        quantity
    } = product

    const xmlString = `
    <prestashop>
      <product>
        <id>${id}</id>
        <name>
           <language id="1">${name}</language>
        </name>
        <price>${price}</price>
        <stock_availables nodeType="stock_available" api="stock_availables">
           <stock_available >
               <id>
                ${quantity}
               </id>
        <id_product_attribute>
        <![CDATA[ 0 ]]>
        </id_product_attribute>
    </stock_available>
    </stock_availables>
    </product>
    </prestashop>
    `
    const res = await axios.put(
        `https://serverpruebas.tk/api/products?output_format=JSON&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH`, xmlString,
        {
            headers: {
                'Content-Type': 'text/xml',
            }
        }
    );
    return res.data
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct
}







