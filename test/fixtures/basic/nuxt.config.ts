// import nuxtSocketIO from "../../../src/module";
import socketServer from "./server/sockets";

export default defineNuxtConfig({
  modules: ["../../../src/module"],
  nuxtSocketIO: {
    initSocketServer: socketServer,
  },
});
