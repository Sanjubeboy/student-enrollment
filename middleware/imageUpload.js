const multer = require('multer')
const path = require ('path')

const storage = multer.diskStorage({
    destination: function (request, file, callback)
    {
        callback(null,'uploads')
    },
    filename: function (request, file, callback)
    {
        let extension = path.extname(file.originalname)
        callback(null, Date.now()+extension)
    }
})

const imageUpload = multer({
    storage: storage,
    fileFilter: function (request, file, callback){
        if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png')
        {
            callback(null, true)
        }
        else
        {
        console.log('Error : Invalid File Type');
        callback(null, false)
        }
    }
})

module.exports = imageUpload