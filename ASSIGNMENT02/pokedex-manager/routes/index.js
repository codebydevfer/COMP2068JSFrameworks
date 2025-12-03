var express = require('express');
var router = express.Router();

const axios = require('axios');
const Pokemon = require("../models/pokemon");

// get home page
router.get('/', function(req, res) {
  res.render('home', { title: 'Home Page' });
});

// check authentication
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// Search Pokemon
router.get('/search', async function(req, res) {
  const name = req.query.name?.toLowerCase();

  if (!name) {
    return res.render("index", { error: "Please enter a Pokemon name!" });
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
      height: response.data.height / 10,
      weight: response.data.weight / 10
    };

    res.render("searchResult", { pokemon });

  } catch (err) {
    res.render("index", { error: "Pokemon not found..." });
  }
});

// add pokemon
router.post('/add', isLoggedIn, async (req, res) => {
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
      weight: req.body.weight,
      user: req.user._id
    });

    res.redirect('/pokedex');
  } catch (err) {
    console.log(err);
    res.send("Error adding your Pokemon...");
  }
});

// View pokedex
router.get('/pokedex', isLoggedIn, async (req, res) => {
  const pokedex = await Pokemon.find({ user: req.user._id });
  res.render("pokedex", { pokedex });
});

// Delete Pokemon
router.post('/delete/:id', isLoggedIn, async (req, res) => {
  const id = parseInt(req.params.id);

  await Pokemon.deleteOne({
    id: id,
    user: req.user._id  
  });

  res.redirect('/pokedex');
});

// Edit pokemon get
router.get('/edit/:id', isLoggedIn, async (req, res) => {
  const pokemon = await Pokemon.findOne({
    id: req.params.id,
    user: req.user._id
  });

  if (!pokemon) return res.redirect('/pokedex');

  res.render("edit", { pokemon });
});

// Edit pokemon post
router.post('/edit/:id', isLoggedIn, async (req, res) => {

  await Pokemon.updateOne(
    {
      id: req.params.id,
      user: req.user._id 
    },
    {
      name: req.body.name,
    }
  );

  res.redirect('/pokedex');
});

module.exports = router;
