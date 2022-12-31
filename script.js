document.querySelector("#pokemon-name-input").addEventListener("input", event => {
    const pokemonName = event.target.value;
    const pokemonsList = document.querySelector("#pokelist");

    pokemonsList.innerHTML = "";

    if (pokemonName.trim() === "") {
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1008`)
        .then(response => response.json())
        .then(pokemonsResponse => {
            const pokemons = pokemonsResponse.results.filter(pokemon =>
                pokemon.name.includes(pokemonName)
            );

            pokemons.forEach(pokemon => {
                const pokemonListItem = document.createElement("li");
                pokemonListItem.innerText = pokemon.name;

                pokemonListItem.addEventListener("click", event => {
                    showPokemonModal(pokemon.name);
                });

                pokemonsList.appendChild(pokemonListItem);
            });
        });
});

const pokemonNameInput = document.getElementById("pokemon-name-input");

pokemonNameInput.addEventListener("input", event => {
    event.target.value = event.target.value.toLowerCase();
});



function showPokemonModal(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(pokemon => {
            const pokemonModal = document.querySelector("#pokemon-modal");
            document.querySelector("#pokemon-name").innerText = pokemon.name;
            document.querySelector("#pokemon-id").innerText = pokemon.id;
            document.querySelector("#pokemon-height").innerText = pokemon.height;
            document.querySelector("#pokemon-weight").innerText = pokemon.weight;
            document.querySelector("#pokemon-types").innerText = pokemon.types
                .map(type => type.type.name)
                .join(", ");
            document.querySelector("#pokemon-abilities").innerText = pokemon.abilities
                .map(ability => ability.ability.name)
                .join(", ");

            const pokemonImage = document.querySelector("#pokemon-image");
            pokemonImage.src = pokemon.sprites.front_default;

            pokemonModal.style.display = "block";
        });
}

document.querySelector("#close-modal-button").addEventListener("click", event => {
    const pokemonModal = document.querySelector("#pokemon-modal");
    pokemonModal.style.display = "none";
});

document.getElementById("pokemon-modal-content").classList.add("fadeIn");
