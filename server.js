const http = require('http');
const products = require('./data/products')

const {getAllProducts,getProduct,createProduct} = require('./controllers/productController')
 
const server = http.createServer((req,res)=>{
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html')
    // res.write('<h1>Hello</h1>')
    // res.end()

    //ShortendPUT
    // res.writeHead(200,{'Content-Type': 'application/json'})
    // res.end(JSON.stringify(products))


    if(req.url === '/api/products' && req.method==='GET'){
        getAllProducts(req,res)
    } else if( req.url === '/api/products' && req.method==='POST' ){
            createProduct(req,res);
    
    } else if( req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET' ){
            const id = req.url.split('/')[3]
            getProduct(req,res,id)
    }else if( req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT' ){
        const id = req.url.split('/')[3]
        updateProduct(req,res,id)
    }else{
        res.writeHead(404,{'Content-Type': 'application/json'})
        res.end(JSON.stringify({msg: 'Not Found'}))
    }
});



const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
    console.log('Sever running on port:', PORT);
})