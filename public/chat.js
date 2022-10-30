const handle = document.querySelector("input[name='handle']");
const message = document.querySelector("input[name='message']");
const output = document.querySelector("ul");
const feedback = document.querySelector("p");
const send = document.querySelector("button");

// const host = "http://localhost:8080";
// const clientSocket = io.connect("https://real-time-chat-with-socket.herokuapp.com/");
// the host url on render
const clientSocket = io.connect("https://rtc-5qgy.onrender.com");

send.addEventListener("click", function(e){
    if (handle.value && message.value){
        clientSocket.emit("chat", { handle: handle.value, message: message.value });
    }
});

clientSocket.addEventListener("chat", function(data){
    feedback.innerHTML = "";
    const li = document.createElement("li");
    li.innerHTML = data.handle + ": " + data.message;
    output.appendChild(li);
    handle.value = "";
    message.value = "";
});

message.addEventListener("keypress", function(e){
    clientSocket.emit("typing", { handle: handle.value });
});

clientSocket.addEventListener("typing", function(data){
    feedback.innerHTML = data.handle + " is typing..";
});
