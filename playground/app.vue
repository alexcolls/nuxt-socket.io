<template>
  <div>
    <button @click="sendMessage">
      Send Message
    </button>
  </div>
</template>
<script setup lang="ts">
import { useNuxtApp } from '#app';

const { $io }: any = useNuxtApp();

const sendMessage = () => {
  $io.emit('message', 'Hello from nuxtSocketIO!');
};
</script>
