const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');



const writeDataToFile = (filename, content) =>{
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err)=>{
        if(err){
            console.log(err);
        }
    })
}

 
const  getBodyData = async(req) =>{

    return new Promise((resolve, reject)=>{
        try{
            let body = '';
            req.on('data', (chunk)=>{
                body += chunk.toString();
            })

            req.on('end', ()=>{
                resolve(body)
            })
        }catch(err){
            reject(err)
        }
    })
}


module.exports = {
    writeDataToFile,
    getBodyData
}