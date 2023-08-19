import boxen from "boxen";
import chalk from "chalk";

export default function (error: string) {
  console.error(
    boxen(
      `
      ${chalk.red(`
        ${chalk.bold("Error:")} ${error}
      `)}
      ${chalk.green(`
      1. Create a file inside your server folder. Also you can create a folder if you prefer (sockets/index.ts):`)} 

      ${chalk.bold("cd")} server && ${chalk.bold("touch")} sockets.ts

      ${chalk.green(`2. Export default function that accepts an io instance:`)} 

      ${chalk.bold("import { Server } from 'socket.io';")}

      ${chalk.bold("export default function")} (io: Server) {
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

      ${chalk.green(` 3. Add the plugin to your nuxt.config.js:`)} 

      ${chalk.bold("import socketServer from './server/sockets.ts';")}

      socketIO: { socketServer },
      `,
      {
        padding: 0.5,
        margin: 0.5,
        borderStyle: "double",
        dimBorder: true,
        title: "socketServer Function Required",
        titleAlignment: "center",
      }
    )
  );
}
