const express = require('express');
const path = require('path');
const engines = require('consolidate');

const app = express();
const PORT = process.env.PORT || 3000;

const inventory = require('./data/inventory.json');

app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { cars: inventory.cars, makes: inventory.makes });
});

app.get('/page', (req, res) => {
  res.render(req.query.name || 'index', { cars: inventory.cars, makes: inventory.makes });
});

app.get('/search', (req, res) => {
  const make = (req.query.make || '').toLowerCase();
  const model = (req.query.model || '').toLowerCase();

  const cars = inventory.cars.filter((car) => {
    const matchesMake = !make || make === 'all makes' || car.make.toLowerCase() === make;
    const matchesModel = !model || model === 'all models' || car.model.toLowerCase() === model;
    return matchesMake && matchesModel;
  });

  res.render('index', { cars: cars, makes: inventory.makes });
});

app.post('/order', (req, res) => {
  res.render('order', { vin: req.body.vin, name: req.body.name });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
