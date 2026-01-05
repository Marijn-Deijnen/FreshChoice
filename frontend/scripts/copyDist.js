import fs from "fs";

const source = "dist";
const target = "../backend/dist";

// remove old
if (fs.existsSync(target)) fs.rmSync(target, { recursive: true });

// copy built dist to backend folder
fs.cpSync(source, target, { recursive: true });
// remove source
fs.rmSync(source, { recursive: true });
