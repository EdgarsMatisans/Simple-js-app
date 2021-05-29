alert("Hello world from Edgars");
let myName = "Edgars";
document.write(myName);
myName = " Matisans";
document.write(myName + "<br>");

let PokemonRepository = (function() {
    //IIFE
    let PokemonList = [
        { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
        { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
        { name: "Venusaur", height: 2, types: ["grass", "poison"] },
    ];

    function add(pokemon) {
        PokemonList.push(pokemon);
    }

    function getAll() {
        return PokemonList;
    }
    return {
        add: add,
        getAll: getAll,
    };
})();

PokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height >= 1.5) {
        document.write(pokemon.name + " Wow, that’s big!<br>");
    } else if (pokemon.height < 1.5 && pokemon.height > 0.8) {
        document.write(pokemon.name + " Am, middle size!<br>");
    } else if (pokemon.height <= 0.8) {
        document.write(pokemon.name + " He is small!<br>");
    }
});

PokemonRepository.getAll().forEach(function(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = "placeholder";
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
});