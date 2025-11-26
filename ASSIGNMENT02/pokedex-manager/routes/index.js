var express = require('express');
var router = express.Router();

const axios = require('axios');
const Pokemon = require("../models/pokemon");

/* GET home page. (Search) */
router.get('/', function(req, res) {
  res.render('home', { title: 'Home Page' });
});

// Search Pokemon (GET recommended)
router.get('/search', async function(req, res) {
  const name = req.query.name?.toLowerCase();

  console.log("Searching for:", name);

  if (!name) {
    return res.render("index", { error: "Please enter a Pokémon name" });
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

    const pokemon = {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.front_default,
      types: response.data.types.map(t => t.type.name),
      hp: response.data.stats.find(s => s.stat.name === "hp").base_stat,
      attack: response.data.stats.find(s => s.stat.name === "attack").base_stat,
      defense: response.data.stats.find(s => s.stat.name === "defense").base_stat,
      height: response.data.height / 10, //converted to meters
      weight: response.data.weight / 10 //converted to kg
    };

    res.render("searchResult", { pokemon });

  } catch (err) {
    console.log(err.message);
    res.render("index", { error: "Pokémon not found" });
  }
});

// ADD Pokemon
router.post('/add', async (req, res) => {
  try {
    await Pokemon.create({
      id: req.body.id,
      name: req.body.name,
      image: req.body.image,
      types: req.body.types,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      height: req.body.height,
      weight: req.body.weight
    });
    res.redirect('/pokedex');
  } catch (err) {
    res.send("Error adding your Pokemon...");
  }
});

// View all Pokemon
router.get('/pokedex', async (req, res) => {
  const pokedex = await Pokemon.find();
  res.render("pokedex", { pokedex });
});

// Delete Pokemon
router.post('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await Pokemon.deleteOne({ id: id });
  res.redirect('/pokedex');
});

// Edit form
router.get('/edit/:id', async (req, res) => {
  const pokemon = await Pokemon.findOne({ id: req.params.id });
  res.render("edit", { pokemon });
});

// Edit submission
router.post('/edit/:id', async (req, res) => {
  await Pokemon.updateOne(
    { id: req.params.id },
    {
      name: req.body.name,
      image: req.body.image
    }
  );
  res.redirect('/pokedex');
});

module.exports = router;
