import bcrypt from "bcrypt";

const password = "12345";

const salt = await bcrypt.genSalt();
console.log(salt);

// const hashedPassword = await bcrypt.hash(password,10);
// console.log(hashedPassword);

console.time("hash");
const hashedPassword = await bcrypt.hash(password,10);
console.log(hashedPassword);
console.timeEnd("hash");

//check the validity of password
const isValid = await bcrypt.compare("12345",hashedPassword);
console.log(isValid);
