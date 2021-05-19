alert("Hello world from Edgars");
let myName = "Edgars";
document.write(myName);
myName = "Matisans";
document.write(myName);

let PokemonRepository = function() {
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
        getAll: getAll,
        add: add,
    };
    console.log(PokemonRepository.getAll());

    PokemonList.forEach(function(pokemon) {
        if (PokemonList[i].height <= 1.5) {
            document.write(PokemonList[i].name + " Wow, that’s big!");
        } else if (PokemonList[i].height <= 1.5 && PokemonList[i].height > 0.8) {
            document.write(PokemonList[i].name + " Am, middle size!");
        } else if (PokemonList[i].height < 0.8) {
            document.write(PokemonList[i].name + " He is small!");
        }
    });
};