import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

const socket = io(URL, {
  autoConnect: false
});

socket.on("connect_error", () => {
  // revert to classic upgrade
  console.log("socket conect error , socker obj -> ",socket);
  socket.io.opts.transports = ["polling", "websocket"];
});

export default socket;