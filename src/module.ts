import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";
import { Server } from "socket.io";
import printError from "./runtime/printError";

// Module options TypeScript interface definition
type socketInitFunction = (io: Server) => void;
export interface ModuleOptions {
  initSocketServer: socketInitFunction | null;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@quantrock/nuxt-socket.io",
    configKey: "nuxtSocketIO",
    version: "0.0.1",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    initSocketServer: null,
  },
  async setup(options, nuxt) {
    if (!options.initSocketServer) {
      printError("initSocketServer function is required!");
      await nuxt.close();
      throw new Error("initSocketServer function is required!");
    }
    nuxt.hook("listen", (server) => {
      const io = new Server(server);
      options.initSocketServer!(io);
    });
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    const resolver = createResolver(import.meta.url);
    addPlugin({
      src: resolver.resolve("./runtime/plugin.ts"),
      mode: "client",
    });
  },
});
