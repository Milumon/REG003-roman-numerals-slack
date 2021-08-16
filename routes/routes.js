// vamos a empezar con las rutas
// el que va a permitir hacer las peticiones
const { Router } = require('express');

const router = Router();

// vamos a llamar a mi package jsono
const { parse, stringify } = require('roman-numerals-dm');

const pkg = require('../package.json');
// por último yo, debo instalar mi transformador
router.get('/', (req, res) => {
  res.json({
    name: pkg.name,
    version: pkg.version,
  });
});

// vamo a crear el POST

router.post('/', (req, res) => {
  // el slacksito (carga útil) trabaja con texto en el body
  const { text } = req.body;
  const [name, param] = text.split(' ');

  const resultArabigo = (value) => {
    try {
      return parse(value);
    } catch (error) {
      return error.message;
    }
  };

  const resultRoman = (value) => {
    try {
      return stringify(value);
    } catch (error) {
      return error.message;
    }
  };

  if (name === 'parse') {
    res.json({
      response_type: 'in channel',
      text: resultArabigo(param),
    });
  }
  if (name === 'stringify') {
    res.json({
      response_type: 'in channel',
      text: resultRoman(+param),
    });
  }

  if (name === 'help') {
    res.json({
      response_type: 'in channel',
      text: 'Convertir de ROMAN-ARA [ ejemplo: /parse 3 ], de ARA-ROMAN: [ ejemplo: /stringify XI ]',
    });
  }

  if (name === 'version') {
    res.json({
      response_type: 'in channel',
      text: pkg.version,
    });
  }

  res.status(400).json({
    response_type: 'ephemeral',
    text: "Sorry, slash commando, that didn't work. Please try again.",
  });
});

// exportar mis rutitas
module.exports = router;
