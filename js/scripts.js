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
        button.addEventListener("click", function(event) {
            showdocument(pokemon);
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

let modalContainer = document.querySelector('#modal-container');

function showModal(title, text, imageUrl) {
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement ('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

// Create an <img> element
let myImage = document.createElement('img');

// setting `src` property to set the actual element's `src` attribute
// this also works on <img> elements selected by querySelector() method, it is not specific for <img> elements created with createElement() methods
myImage.src = 'https://picsum.photos/300/300';

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);
  modalContainer.classList.add('is-visible');
  modalContainer.appendChild(myImage);
}

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' &&
  modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

modalContainer.addEventListener('click', (e) => {
  //Since this is also triggered when clicking INSIDE the modal
  //We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal()
  }
});

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Pokemons name', 'Pokemon Height', 'Pokemon Image');
});
