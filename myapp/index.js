import express from "express";
import Product from "./models/product.js";

const app = express();

const hostname = '127.0.0.1';
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Product.findAll().then((results) => { 
        res.render('index', {products: results});
    });
})
app.get('/create', (req, res) => {
    res.render('create');
})
app.get('/edit/:id', (req, res) => {
    Product.findOne({where: { id: req.params.id }}
    ).then((results) =>{
        res.render('edit', { product: results });
    })
}) 

app.post('/api/products', (req, res) => {
    Product.create({name: req.body.name, price: req.body.price}
    ).then((results) =>{
        res.json({status: 200, error: null, Response: results});
    }).catch(err =>{
        res.json({status: 502,error: err})
    })
})

app.put('/api/product/:id', (req, res) => {
    Product.update({name: req.body.name, price: req.body.price}, {where: {id: req.params.id}}
    ).then((results) => {
        res.json({status: 200, error: null, Response: results});
    }).catch(err => {
        res.json({status: 502, error: err });
    })
})

app.delete('/api/product/:id', (req, res) => {
    Product.destroy({where: {id: req.params.id}}
    ).then(() => {
        res.json({status: 200, error: null, Response: results});
    }).catch(err => {
        res.json({status: 500, error: err, Response: {} });
    })
})

app.listen(port, () => {
    console.log(`Server Running at http://${hostname}:${port}`);
})