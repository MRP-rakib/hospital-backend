require('dotenv').config()
const app = require('./app/app')
const http = require('http')
PORT=process.env.PORT||5252

const server = http.createServer(app)

server.listen(PORT,()=>{
    console.log(`server is listening on port:${PORT}`);
    
})