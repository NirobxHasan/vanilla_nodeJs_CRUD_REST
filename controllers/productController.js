const Product = require('../models/productModels')
const {getBodyData} = require('../utils')

async function getAllProducts(req,res){
    try {
        const products = await Product.findAll()
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error);
    }
    
}

async function getProduct(req,res,id){
    try {
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({msg:'Product Not Found.'})) 
        }
        else{
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product)) 
        }

    } catch (error) {
        console.log(error);
        
    }
    
}

async function createProduct(req,res){
    try {
        // let body = '';

        // req.on('data', (chunk)=>{
        //     body += chunk.toString()
        //     console.log(body);
        // })

        // req.on('end', async()=>{
        //     const {name,description,price } = JSON.parse(body) ;
        //     const product = {
        //         name,description,price
        //     }
        //     const newProduct = await Product.create(product)
        //     res.writeHead(201, {'Content-Type': 'application/json'})
        //     res.end(JSON.stringify(newProduct))
        // })

            const body = await getBodyData(req);
            const {name,description,price } = JSON.parse(body) ;
            const product = {
                name,description,price
            }
            const newProduct = await Product.create(product)
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(newProduct))

      
    } catch (error) {
        console.log(error);
    }
}


async function updateProduct(req,res,id){
    try {
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({msg:'Product Not Found.'})) 
        }else{
            const body = await getBodyData(req);
            const {name,description,price } = JSON.parse(body) ;
            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id,productData)
            res.writeHead(201, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(updProduct))

        }
        
    } catch (error) {
        console.log(error);
    }
}


async function deleteProduct(id,req,res){
    console.log(id);
    try {
        const product = await Product.findById(id)
   
        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({msg:'Product Not Found.'})) 
        }else{
            
            await Product.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({msg:"successfully deleted"}))
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}