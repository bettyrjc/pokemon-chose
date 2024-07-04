<template>
  <section>
    <img v-if="showPokemon" class="brightness-100 h-[200px] fade-in mt-4" :src="pokemonImage" />
    <img v-else class="brightness-0 h-[200px] fade-in fade-in mt-4" :src="pokemonImage" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface PokemonPictureProps {
  pokemonId: number;
  showPokemon?: boolean;
}
const props = withDefaults(defineProps<PokemonPictureProps>(), { showPokemon: false });

const pokemonImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`;
});
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.3s;
  -webkit-animation: fadeIn 0.3s;
  -moz-animation: fadeIn 0.3s;
  -o-animation: fadeIn 0.3s;
  -ms-animation: fadeIn 0.3s;
}
</style>
