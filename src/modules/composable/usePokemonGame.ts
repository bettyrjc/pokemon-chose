import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../pokemons/interfaces';
import { pokemonApi } from '../pokemons/api/pokemonApi';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);
  const isLoading = computed(() => pokemons.value.length === 0);

  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length);
    return pokemonsOptions.value[randomIndex];
  });

  const getPokemons = async () => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=152');
    const pokemonsArray = response.data.results.map((pokemon) => {
      const id = pokemon.url.split('/').at(-2) ?? 0;
      return {
        name: pokemon.name,
        id: +id,
      };
    });
    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };
  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id;
    gameStatus.value = hasWon ? GameStatus.Won : GameStatus.Lost;
  };
  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextRound();
    console.log(pokemonsOptions.value);
  });

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,
    //methods
    getNextRound,
    checkAnswer,
  };
};
