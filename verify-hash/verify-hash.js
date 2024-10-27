const crypto = require("crypto");

/**
 * First of all, the RECIPIENT obtains MESSAGE and HASH
 * (can be MD5, SHA1, or SHA256) from the SENDER
 */
// MD5
const message = "this is a secret key";
const senderHash = "2cf33591c3b28b382668952e236cczzz"; // md5 hash

// the RECIPIENT need to create their own version of the hash
const recipientHash = crypto.createHash("md5").update(message).digest("hex");
const isValid = (senderHash == recipientHash);
console.log("MD5 verification result is:", isValid);


// SH1
const messagesh1 = "this is a fake secret";
const sha1Hash = "2321c6d320b84c6eeb1c8b88aa44e636284c9afb"; // SH1

// the RECIPIENT need to create their own version of the hash
const recipientHashsh1 = crypto.createHash("sha1").update(messagesh1).digest("hex");
const isValidsh1 = (sha1Hash == recipientHashsh1);
console.log("SHA1 result is:", isValidsh1);


// SH2
const messagesh2 = "this is a fake secret";
const sha256Hash = "ad6aaf9436af95ee9163f1da58b8b7af1018e3faa853209e5151c048bb058479"; // SH2

// the RECIPIENT need to create their own version of the hash
const recipientHashsh2 = crypto.createHash("sha256").update(messagesh2).digest("hex");
const isValidsh2 = (sha256Hash == recipientHashsh2);
console.log("SHA2 result is:", isValidsh2);