// alert("Hello world from Edgars");
// let myName = "Edgars";
// document.write(myName);
// myName = " Matisans";
// document.write(myName + "<br>");

let PokemonRepository = (function() {
    let PokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
            PokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    function getAll() {
        return PokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                json.results.forEach(function(item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                });
            })
            .catch(function(e) {
                console.error(e);
            });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(details) {
                // Now we add the details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function(e) {
                console.error(e);
            });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
            if (pokemon.height >= 1.5) {
                console.log(pokemon.name + " Wow, that’s big!<br>");
            } else if (pokemon.height < 1.5 && pokemon.height > 0.8) {
                console.log(pokemon.name + " Am, middle size!<br>");
            } else if (pokemon.height <= 0.8) {
                console.log(pokemon.name + " He is small!<br>");
            }
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

PokemonRepository.loadList().then(function() {
    PokemonRepository.getAll().forEach(function(pokemon) {
        PokemonRepository.addListItem(pokemon);
    });
});

// PokemonRepository.getAll().forEach(function(pokemon) {
//     if (pokemon.height >= 1.5) {
//         document.write(pokemon.name + " Wow, that’s big!<br>");
//     } else if (pokemon.height < 1.5 && pokemon.height > 0.8) {
//         document.write(pokemon.name + " Am, middle size!<br>");
//     } else if (pokemon.height <= 0.8) {
//         document.write(pokemon.name + " He is small!<br>");
//     }
// });

// PokemonRepository.getAll().forEach(function(pokemon) {
//     PokemonRepository.addListItem(pokemon);
// });

// let count = 1;

// function increaseCount() {
//     count = count + 1;
// }
// setTimeout(function() {
//     console.log("first call", count);
//     increaseCount();
// }, 1000);
// setTimeout(function() {
//     console.log("second call", count);
//     increaseCount();
// }, 100);
// setTimeout(function() {
//     console.log("third call", count);
//     increaseCount();
// }, 500);

// return {
//     add: add,
//     getAll: getAll,
//     loadList: loadList,
// };

// let pokemonRepository = (function() {
//     // Other functions here…

//     return {
//         add: add,
//         getAll: getAll,
//         loadList: loadList,
//         loadDetails: loadDetails,
//     };
// })();

// function showDetails(pokemon) {
//     loadDetails(pokemon).then(function() {
//         console.log(pokemon);
//     });
// }