const io = require("socket.io-client");
const readline = require("readline");
const crypto = require("crypto"); 

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});

let username = "";

// Membuat hash dari pesan yang dikirim client 
const generateHash = (message) => {
    return crypto.createHash('sha256').update(message).digest('hex');
}; //memakai sha2 karena hash ini membuat hash yang unik dan bagus
// update untuk mengambil pesan dari client untuk dibuatkan hash 
// hex untuk mengubah format hasil hash dan dikonversi menjadi string heksadesimal, agar lebih mudah dibaca  

// koneksi 
socket.on("connect", () => {
    console.log("Connected to the server");

    rl.question("Enter your username: ", (input) => {
        username = input;
        console.log(`Welcome, ${username} to the chat`);
        rl.prompt();

        rl.on("line", (message) => {
            if (message.trim()) {
                // menggenerate hash, agar disimpan ke variable hash 
                const hashclient = generateHash(message);
                // hash yang sudah dibuat, dikirim ke server bersama username dan message dengan .emit
                socket.emit("message", { username, message, hashclient });
            }
            rl.prompt();
        });
    });
});

socket.on("message", (data) => {
    const { username: senderUsername, message: senderMessage, hashclient: originalHash } = data;

    // mengecek apakah pesan dimodifikasi atau tidak
    const receiveHash = generateHash(senderMessage.replace("(modified by server)", ""));
    const isTrue = receiveHash !== originalHash; // pengecekan apakah hash yang dikirim dengan hash yang diterima sama atau tidak
    // kalau hash nya tidak sama maka = true
    if (senderUsername != username) {
        console.log(`${senderUsername}: ${senderMessage}`);
        // if true, maka akan muncul notifikasi
        if (isTrue) {
            console.log("Warning: This message has been modified by the server!");
        }
        rl.prompt();
    }
});

socket.on("disconnect", () => {
    console.log("Server disconnected, Exiting...");
    rl.close();
    process.exit(0);
});

rl.on("SIGINT", () => {
    console.log("\nExiting...");
    socket.disconnect();
    rl.close();
    process.exit(0);
});