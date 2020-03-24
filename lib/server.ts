import app from "./app";

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Express server listening on port ' + port);
})

// io.on("connection", (socket: any) => {

//     // whenever we receive a 'message' we log it out
//     socket.on("send-message", (message: any) => {
//         io.emit("send-message", message);

//         const supportChatService = new SupportChatService();
//         supportChatService.getUnreadMessageCount(message).then((response) => {
//             io.emit("unread-message-count", response);
//         });

//     });

//     socket.on("unread-message-count", (message: any) => {
//         const supportChatService = new SupportChatService();
//         supportChatService.getUnreadMessageCount(message).then((response) => {
//             io.emit("unread-message-count", response);
//         });

//     });

//     socket.on("disconnect", () => {
//         io.emit("users-changed", { user: socket.username, event: "left" });
//     });

//     socket.on("set-name", (name) => {
//         socket.username = name;
//         io.emit("users-changed", { user: name, event: "joined" });
//     });

//     // socket.on("send-message", (message) => {
//     //     io.emit("message", { msg: message.text, user: socket.username, createdAt: new Date() });
//     // });
// });

