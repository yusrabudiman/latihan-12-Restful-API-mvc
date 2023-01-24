import express from "express";
import Suppliers from "./models/suppliers.js";

const app = express();

const hostname = '127.0.0.1';
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    Suppliers.findAll().then((results) => { 
        res.render('index', {suppliers: results});
    });
})
app.get('/create', (req, res) => {
    res.render('create');
})
app.get('/edit/:id', (req, res) => {
    Suppliers.findOne({where: { id: req.params.id }}
    ).then((results) =>{
        res.render('edit', { suppliers: results });
    })
}) 

app.post('/api/suppliers', (req, res) => {
    Suppliers.create({
        company_name: req.body.company_name,
        contact_name: req.body.contact_name,
        email: req.body.email,
        phone: req.body.phone,
        active: req.body.active
    }
    ).then((results) =>{
        res.json({status: 200, error: null, Response: results});
    }).catch(err =>{
        res.json({status: 502,error: err})
    })
})

app.put('/api/suppliers/:id', (req, res) => {
    Suppliers.update({
        company_name: req.body.company_name,
        contact_name: req.body.contact_name,
        email: req.body.email,
        phone: req.body.phone,
        active: req.body.active

    }, {where: {id: req.params.id}}
    ).then((results) => {
        res.json({status: 200, error: null, Response: results});
    }).catch(err => {
        res.json({status: 502, error: err });
    })
})

app.delete('/api/suppliers/:id', (req, res) => {
    Suppliers.destroy({where: {id: req.params.id}}
    ).then(() => {
        res.json({status: 200, error: null, Response: results});
    }).catch(err => {
        res.json({status: 500, error: err, Response: {} });
    })
})

app.listen(port, () => {
    console.log(`Server Running at http://${hostname}:${port}`);
})