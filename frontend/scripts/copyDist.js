import fs from "fs";

const source1 = "dist";
const source2 = "assets";
const target1 = "../backend/dist";
const target2 = "../backend/dist/assets";

// remove old
if (fs.existsSync(target1)) fs.rmSync(target1, { recursive: true });

// copy built dist to backend folder
fs.cpSync(source1, target1, { recursive: true });
fs.cpSync(source2, target2, { recursive: true });
// remove source
fs.rmSync(source1, { recursive: true });
