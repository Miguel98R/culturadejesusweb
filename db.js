const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.URL_SERVER).then(() => {
    console.log('Se conecto a la DB ', process.env.DB_NAME);
}).catch((e) => {
    console.error('Error al conectarse a la db', e);
});

module.exports = mongoose;
