import { defineNuxtPlugin } from "#app";
import socket from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
  const io = socket("/");
  nuxtApp.provide("io", io);
});
