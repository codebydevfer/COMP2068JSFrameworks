const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    types: [String], //has to be an array because pokemon types can vary betwen 1 and 2
    hp: Number,
    attack: Number,
    defense: Number,
    height: Number,
    weight: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
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