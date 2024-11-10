<template>
  <section class="flex flex-col mt-5">
    <button
      v-for="{ name, id } in options"
      :key="id"
      :class="[
        'capitalize disabled:opacity-50 disabled:cursor-not-allowed',
        {
          correct: correctAnswer === id && selected,
          wrong: correctAnswer !== id && selected,
        },
      ]"
      @click="$emit('selectedOption', id)"
      :disabled="selected"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface PokemonOptionsProps {
  options: any[];
  selected: boolean;
  correctAnswer: number;
}
defineProps<PokemonOptionsProps>();

defineEmits<{ selectedOption: [id: number] }>();
</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 cursor-pointer w-40 text-center transition-all  hover:bg-gray-100  duration-300 ease-in-out mt-5;
}
.correct {
  @apply bg-green-500 text-white;
}
.wrong {
  @apply bg-red-100 text-white;
}
</style>
