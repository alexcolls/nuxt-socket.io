<template>
  <div>
    <button @click="sendMessage">
      Send Message
    </button>
  </div>
</template>
<script setup lang="ts">
import { useNuxtApp } from '#app';

const { $socket }: any = useNuxtApp();

const sendMessage = () => {
  $socket.emit('message', 'Hello from client! nuxtSocketIO is working!');
};
</script>
