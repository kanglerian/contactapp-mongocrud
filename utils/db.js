const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/kanglerian',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

/* Menambah 1 data
const contact1 = new Contact({
    nama: 'Naima',
    nohp: '08122233444',
    email: 'naima@gmail.com'
}); */

/* Simpan ke collections
contact1.save().then((result) => console.log(result)).catch((error) => console.log(error)); */
