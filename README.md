# nuxtSocketIO

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for Socket.io (server & client).

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/@alexcolls/nuxt-socket.io?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- ⛰ &nbsp;Plug & Play
- 🚠 &nbsp;Websocket connection
- 🌲 &nbsp;Baz

## Quick Setup

1. Add `@alexcolls/nuxt-socket.io` dependency to your project

```bash
# Using pnpm
pnpm add @alexcolls/nuxt-socket.io

# Using yarn
yarn add @alexcolls/nuxt-socket.io

# Using npm
npm install @alexcolls/nuxt-socket.io
```

2. Add `@alexcolls/nuxt-socket.io` to the `modules` section of `nuxt.config.ts`

```js
import socketServer from "./server/sockets";

export default defineNuxtConfig({
  modules: ["@alexcolls/nuxt-socket.io"],
  nuxtSocketIO: {
    initSocketServer: socketServer,
  },
});
```

In the server folder create a file named sockets.ts (or a folder sockets/index.ts) with the init function for the socket server.

```js
import { Server, Socket } from "socket.io";

const printUsersConnected = (usersConnected: number) => {
  console.log(
    `${usersConnected} user${usersConnected === 1 ? "" : "s"} connected`
  );
};

export default function (io: Server) {
  let usersConnected = 0;
  io.on("connection", (socket: Socket) => {
    // Connection/Disconnection events
    usersConnected++;
    printUsersConnected(usersConnected);
    socket.on("disconnect", () => {
      usersConnected--;
      printUsersConnected(usersConnected);
    });
    // Socket events
    socket.on("message", (message: object) => {
      console.log("Server received:", message);
    });
  });
}
```

That's it! You can now use nuxtSocketIO in your Nuxt app ✨

## Usage

You can access to the socket instance in the client just like this:

```js
const { $socket } = useNuxtApp();

$socket.emit("event", "Hello from client!");

$socket.on("event", () => {
  // Do something...
});
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@alexcolls/nuxt-socket.io/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@alexcolls/nuxt-socket.io
[npm-downloads-src]: https://img.shields.io/npm/dm/@alexcolls/nuxt-socket.io.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@alexcolls/nuxt-socket.io
[license-src]: https://img.shields.io/npm/l/@alexcolls/nuxt-socket.io.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@alexcolls/nuxt-socket.io
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
