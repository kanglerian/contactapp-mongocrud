const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { body, validationResult, check} = require('express-validator');

const methodOverride = require('method-override');

require('./utils/db');
const { Contact } = require('./models/contact');

/* Setup */

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

/* Konfigurasi flash */
app.use(cookieParser('secret'));
app.use(session({
   cookie: {maxAge: 6000},
   secret: 'secret',
   resave: true,
   saveUninitialized: true
}));
app.use(flash());

/* Halaman Home */
app.get('/', (req,res) => {
    const mahasiswa = [
       {
          nama: "Lerian Febriana",
          email: "kanglerian@gmail.com",
       },{
          nama: "Sopyan Sauri",
          email: "sopyan@gmail.com",
       },{
          nama: "Adhie Rachmat",
          email: "adhie@gmail.com",
       },
    ];
    res.render('index', {
       nama: "Lerian Febriana",
       title: "Home",
       mahasiswa,
       layout: 'layouts/main'
    });
});

/* Halaman About */
app.get('/about', (req,res) => {
    res.render('about', {
       nama: "About",
       title: "About",
       layout: 'layouts/main'
    });
});

/* Halaman Contact */
app.get('/contact', async(req,res) => {
    /* Coba
    Contact.find().then((contact) => {
        res.send(contact);
    }); */
    const contacts = await Contact.find();
    res.render('contact', {
       nama: "Contact",
       title: "Contact",
       layout: 'layouts/main',
       contacts,
       msg: req.flash('msg'),
    });
});

/* Tambah data */
app.get('/contact/add', (req,res) => {
    res.render('tambah', {
       nama: "Tambah Contact",
       title: "Tambah Contact",
       layout: 'layouts/main'
    });
});

/* Tambah data */
app.post('/contact', [
    check('email','Email tidak benar!').isEmail(),
    check('nohp', 'No HP tidak benar').isMobilePhone('id-ID'),
    body('nama').custom( async (value) => {
       const duplikat = await Contact.findOne( { nama: value } );
       if(duplikat){
          throw new Error('Nama sudah terdaftar!');
       }
       return true;
    }),
 ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       res.render('tambah',{
          title: "Tambah data kontak",
          layout: "layouts/main",
          errors: errors.array(),
       });
    } else {
       Contact.insertMany(req.body, (error, result) => {
        req.flash('msg','Data kontak berhasil ditambahkan!');
        res.redirect('/contact');
       });
    }
});

/* Delete data */
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ _id: req.body.id }).then((result) => {
        req.flash('msg','Data kontak berhasil dihapus!');
        res.redirect('/contact');
    });
});

/* Form edit data */
app.get('/contact/edit/:id', async (req,res) => {
    const contact = await Contact.findOne({ _id: req.params.id});
    res.render('edit', {
       nama: "Edit Contact",
       title: "Ubah Data Contact",
       layout: 'layouts/main',
       contact
    });
 });

 /* Update data */
 app.put('/contact', [
    check('email','Email tidak benar!').isEmail(),
    check('nohp', 'No HP tidak benar').isMobilePhone('id-ID'),
 ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       res.render('edit',{
          title: "Ubah data kontak",
          layout: "layouts/main",
          errors: errors.array(),
          contact: req.body
       });
    } else {
       Contact.updateOne(
           { _id: req.body._id },
           {$set: {
               nama: req.body.nama,
               nohp: req.body.nohp,
               email: req.body.email
           }}
        ).then((result) => {
            req.flash('msg','Data kontak berhasil diubah!');
            res.redirect('/contact');
        });
    }
});

/* Detail data */
app.get('/contact/:id', async(req,res) => {
    const contact = await Contact.findOne({ _id: req.params.id });
    res.render('detail', {
       nama: "Detail Contact",
       title: "Detail Contact",
       layout: 'layouts/main',
       contact
    });
});

app.use('/', (req,res) => {
    res.status(404);
    res.send(`<h1>404</h1>`);
 });

app.listen(port, (req, res) => {
    console.log(`Mongo Contact App on http://localhost:${port}`);
});


