"use strict";

const poke_container = document.getElementById("poke-container");
const pokemon_count = 150;
const colors = {
  fire: "#fddfdf",
  grass: "#DEFDE0",
  electric: "#fcf7de",
  ursaring: "#f5f5f5f",
  water: "#def3fd",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragan: "#97b3d6",
  psychiC: "#eaeda1",
  flying: "#f5f5f5",
  fighting: "#e6e0d4",
  normal: "#f5f5f5f",
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPocemonCard(data);
};

const createPocemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) - 1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHTML = `
   <div style="background-color: rgb(222,253,224);" class="pokemon">
      <div class="img-container">
         <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
      </div>
      <div class="info">
         <span class="number">#${id}</span>
         <h3 class="name">${name}</h3>
         <small class="type">Type: <span>${type}</span> </small>
      </div>   
   </div>
   `;

  pokemonEl.innerHTML = pokemonInnerHTML;

  poke_container.appendChild(pokemonEl);
};

fetchPokemons();
