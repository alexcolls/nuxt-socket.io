import socketServer from "./server/sockets";

export default defineNuxtConfig({
  modules: ["../src/module"],
  nuxtSocketIO: {
    initSocketServer: socketServer,
  },
  devtools: { enabled: true },
});
