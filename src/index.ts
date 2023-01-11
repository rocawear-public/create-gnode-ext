#!/usr/bin/env node

import { init, copyBaseTemplate, copyStoreTemplate } from "./utils/project.js";

async function main() {
  const { name, dir, store } = await init();

  if (!store) {
    await copyBaseTemplate(dir);
  } else if (store) {
    await copyBaseTemplate(dir);
    await copyStoreTemplate(dir);
  }

  console.log(`Created extension starter to ${dir}`);
  console.log(`cd ${name}`);
  console.log(`npm install`);
  console.log(`npm run dev`);
}

main().catch((err: Error) => console.log(err.message));
