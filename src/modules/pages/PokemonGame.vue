<template>
  <section
    v-if="isLoading || randomPokemon === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 className="text-3xl">Espere por favor</h1>
    <h1 className="animate-pulse">Cargando pokemons</h1>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 className="text-3xl">Quien es este pokemon?</h1>
    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound(4)"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800"
      >
        Jugar de nuevo
      </button>
    </div>
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <PokemonOptions
      :options="pokemonsOptions"
      @selected-option="checkAnswer"
      :selected="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon.id"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonPicture from '@/modules/pokemons/components/PokemonPicture.vue';
import PokemonOptions from '@/modules/pokemons/components/PokemonOptions.vue';
import { GameStatus } from '@/modules/pokemons/interfaces';
import { usePokemonGame } from '../composable/usePokemonGame';

const { gameStatus, isLoading, randomPokemon, pokemonsOptions, checkAnswer, getNextRound } =
  usePokemonGame();
</script>

<style scoped></style>
