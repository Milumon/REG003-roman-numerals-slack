const express = require('express');

const app = express();
const { port } = require('./config');

// el json porque vamos a trabajar con json
app.use(express.json());
// la configuración del puerto
app.set('port', port);
// express transforma todo a json
app.use(express.urlencoded({ extended: true }));
// el archivo donde van a estar mis rutitas
app.use(require('./routes/routes'));
// el escuchador
// consolear el puerto en el cual se está escuchando
app.listen(app.get('port'), () => {
  console.info(`Tamo escuchando el puerto ${app.get('port')}`);
});
