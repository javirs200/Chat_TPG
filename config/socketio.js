module.exports = {
    cors: {
        origin: "http://localhost:3000" // permito el cliente de develop
    },
    transports:["websocket","polling"],// prefer ws
}