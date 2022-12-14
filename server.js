/* crear server puerto 3001 e importar las funciones de api.js */
const express = require('express');
const app = express();
const port = 3001;
const { getProducts, createProduct, updateProduct, getProduct } = require('./api');
var cors = require('cors')

app.listen(port, () => {
  console.log(`Servidor corriendo ${port}`);
});

app.get('/', (req, res) => {
  res.end('servidor cascoloco')
})

app.use(cors());
app.use(express.json());

app.get('/products', async (req, res) => {
    const products = await getProducts();
    res.json(products);
});

/* Importar función getProduct*/

app.get('/products/:id', async (req, res) => {
    const product = await getProduct(req.params.id);
    res.json(product);
});

app.post('/products/create', async (req, res) => {
    const product = await createProduct(req.body);
    res.json(product);
});

app.put('/products/:id', async (req, res) => {
    const product = await updateProduct(req.params.id, req.body);
    res.json(product);
});


