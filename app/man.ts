import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";

const io = new Server();

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.emit("hello", "world");
  socket.on("echo", (...msg) => {
    console.log(msg);
    socket.emit("echo", `server echo to ${msg}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

await serve(io.handler(), {
  port: 3000,
});
