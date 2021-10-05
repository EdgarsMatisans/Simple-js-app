let PokemonRepository = (function() {
    let PokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";

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
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        button.addEventListener("click", function() {
            loadDetails(pokemon);
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

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(details) {
                // Now we add the details to the item
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types;

                updateModal(pokemon);
            })
            .catch(function(e) {
                console.error(e);
            });
    }

    function updateModal(pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
    
        modalTitle.empty();
        modalBody.empty();
    
        let nameElement = $("<span>" + pokemon.name + "</span>");
        let imageElement = $('<img class="modal-img" style="width:50%">');
        imageElement.attr("src", pokemon.imageUrl);
        let heightElement = $("<p>" + "Height : " + pokemon.height + "</p>");

    
        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
      }
    

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();

PokemonRepository.loadList().then(function() {
    PokemonRepository.getAll().forEach(function(pokemon) {
        PokemonRepository.addListItem(pokemon);
    });
});
