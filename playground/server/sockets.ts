import { Server, Socket } from "socket.io";

function printUsersConnected(usersConnected: number) {
  console.log(
    `${usersConnected} user${usersConnected === 1 ? "" : "s"} connected`
  );
}

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
