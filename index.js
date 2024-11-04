const express = require('express');
const app = express();
const port = 3000;

const path = require('path');     // step: 1

const multer  = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
});
const upload = multer ({storage})



app.use(express.json());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));   // step: 1
// used to parse form data
app.use(express.urlencoded({extended: false}))   




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homePage.html'));    // step:1
  });

//   app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'about.html'));
//   });

// app.post('/upload', upload.single('profileImage')  ,(req, res) => {    // for single field
app.post('/upload', upload.fields([{name: 'profileImage'}, {name: 'coverImage'}])  ,(req, res) => {
   console.log(req.body);
   console.log(req.file);
   
   return res.redirect('/')
   
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})