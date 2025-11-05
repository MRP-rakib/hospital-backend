const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:function(_req,_fill,cd){
        cd(null,'uploads')
    },
    filename:function(req,file,cd){
        const uniqueName = file.fieldname+'-'+Date.now()+path.extname(file.originalname)
        cd(null,uniqueName)
    }
})

const fileFilter=(_req,file,cd)=>{
    const allowType = /jpeg|jpg|png|Webp/
    const mimeType =allowType.test(file.mimetype)
    const extraType = allowType.test(path.extname(file.originalname).toLowerCase())

    if(mimeType&&extraType)return cd(null,true)
    
    cd('Error: only image allow')
}

const upload = multer({
    storage,
    fileFilter,
    limits:{fileSize:5*1024*1024}
})

module.exports = upload