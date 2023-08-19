import { defineNuxtPlugin } from "#app";
import socket from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("socket", socket("/"));
});
