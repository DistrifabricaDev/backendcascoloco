const express = require("express");
const api = require('./api.js');
const app = express();
const port = 3001
const cors = require('cors')

app.listen(port, () => {
  console.log(`Servidor corriendo ${port}`);
});

// MAIN 

app.get('/', (req, res) => {
  res.end('servidor cascoloco')
})

app.use(cors());
app.use(express.json());

// LINKS

app.get("/api/products/all", (req, res) => {
  (async function fetching() {
    let products = await api.getProducts();
    res.json(products);
  })();
});

/*llamar modulo de editar usuarios y crear un post*/

app.post("/api/products/edit", (req, res) => {
  (async function fetching() {
    let products = await api.editProducts(req.body.id, req.body.quantity, req.body.price);
    res.json(products);
  })();
}
);



