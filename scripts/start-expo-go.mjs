#!/usr/bin/env node
import os from "os";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import QRCode from "qrcode";

const port = Number(process.env.EXPO_PORT ?? 8082);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isPrivateIp(address) {
  return (
    address.startsWith("10.") ||
    address.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(address)
  );
}

function getLanIp() {
  const interfaces = os.networkInterfaces();
  for (const entries of Object.values(interfaces)) {
    if (!entries) continue;
    for (const info of entries) {
      if (
        info.family === "IPv4" &&
        !info.internal &&
        isPrivateIp(info.address)
      ) {
        return info.address;
      }
    }
  }
  for (const entries of Object.values(interfaces)) {
    if (!entries) continue;
    for (const info of entries) {
      if (info.family === "IPv4" && !info.internal) {
        return info.address;
      }
    }
  }
  return "127.0.0.1";
}

const lanIp = getLanIp();
const expoGoUrl = `exp://${lanIp}:${port}`;

console.log("");
console.log(`Expo Go LAN URL: ${expoGoUrl}`);
console.log("");
console.log("Scan this QR code with Expo Go:");
console.log("");
console.log(await QRCode.toString(expoGoUrl, { type: "terminal" }));
console.log("");
console.log("Starting Expo Go dev server...");
console.log("");

const expoCommand = process.execPath;
const expoArgs = [
  path.resolve(__dirname, "..", "node_modules", "expo", "bin", "cli"),
  "start",
  "--go",
  "--lan",
  "--port",
  String(port),
];

const child = spawn(expoCommand, expoArgs, {
  stdio: "inherit",
  env: {
    ...process.env,
    EXPO_USE_METRO_WORKSPACE_ROOT: "1",
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
