import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";
import { Server } from "socket.io";
import printError from "./runtime/printError";

// Module options TypeScript interface definition
type socketServerFunction = (io: Server) => void;
export interface ModuleOptions {
  socketServer: socketServerFunction | null;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@alexcolls/nuxt-socket.io",
    configKey: "socketIO",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    socketServer: null,
  },
  async setup(options, nuxt) {
    if (!options.socketServer) {
      printError("socketServer function is required!");
      await nuxt.close();
      throw new Error("socketServer function is required!");
    }
    nuxt.hook("listen", (server) => {
      const io = new Server(server);
      options.socketServer!(io);
    });
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    const resolver = createResolver(import.meta.url);
    addPlugin({
      src: resolver.resolve("./runtime/plugin"),
      mode: "client",
    });
  },
});
