<template>
  <span class="flipping-word">
    <Transition name="flip" mode="out-in">
      <span :key="activeWord" class="word">{{ activeWord }}</span>
    </Transition>
  </span>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, PropType } from 'vue';

const props = defineProps({
  words: {
    type: Array as PropType<string[]>,
    required: true,
  }
});

let intervalId;

const currentIndex = ref(0);

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.words.length;
  }, 4000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});


const activeWord = computed(() => props.words[currentIndex.value]); 

</script>

<style>
.word {
  display: inline-block;
  transform: translateY(0);
  font-weight: bold;
  font-style: italic;
}
.flip-enter-active,
.flip-leave-active {
  transition: all 0.3s ease-in-out;
}

.flip-enter-from {
  opacity: 0;
  transform: translateY(1em);
}

.flip-leave-to {
  opacity: 0;
  transform: translateY(-1em);
}
</style>