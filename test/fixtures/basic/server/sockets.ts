import { Server } from "socket.io";

function printUsersConnected(usersConnected: number) {
  console.log(
    `${usersConnected} user${usersConnected === 1 ? "" : "s"} connected`
  );
}

export default function (io: Server) {
  let usersConnected = 0;
  io.on("connection", (socket) => {
    // Connection/Disconnection events
    usersConnected++;
    printUsersConnected(usersConnected);
    socket.on("disconnect", () => {
      usersConnected--;
      printUsersConnected(usersConnected);
    });
    // Socket events
    socket.on("message", (message: string) => {
      console.log("message", message);
    });
  });
}
