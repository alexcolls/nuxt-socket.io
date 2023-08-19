import socketServer from "./server/sockets";

export default defineNuxtConfig({
  modules: ["../../../src/module"],
  socketIO: { socketServer },
});
