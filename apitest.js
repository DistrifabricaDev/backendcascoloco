const request = require('request');
const xml2js = require('xml2js');

function getProductos() {
    const url = 'https://serverpruebas.tk/api/products?display=full&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH';

    request.get(url, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }

        // Parse the XML response
        xml2js.parseString(body, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }

            // Print the parsed result
            console.log(result);
        });
    });
}

function crearProducto(nombre, precio) {
    const url = 'https://serverpruebas.tk/api/products';
    const xml = `
      <prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
        <product>
          <active>1</active>
          <name>
            <language id="1">${nombre}</language>
          </name>
          <price>
            <amount>${precio}</amount>
          </price>
        </product>
      </prestashop>
    `;

    request.post(url, {
        body: xml,
        headers: {
            'Content-Type': 'application/xml',
            'Accept': 'application/xml',
            'Authorization': `?display=full&ws_key=GJM2TB1KNADU6GT7LVFWV1MFH3Y6XTRH}`
        }
    }, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }

        console.log(body);
    });
}

getProductos();
crearProducto('Nuevo producto', 100);
