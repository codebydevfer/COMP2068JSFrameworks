const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String
});

module.exports = mongoose.model("Pokemon", PokemonSchema);

// class Pokemon{
//     constructor(id, name, image){
//         this.id = id;
//         this.name = name;
//         this.image = image;
//     }
// }

// module.exports = Pokemon;