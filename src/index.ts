#!/usr/bin/env node

import inquirer from "inquirer";
import path from "path";
import fs from "fs-extra";

export async function init() {
  const { name } = await inquirer.prompt<{ name: string }>({
    name: "name",
    type: "input",
    message: "What is the name of the Extension?",
    validate: validateName,
    default: "my-app",
  });

  const dir = path.resolve(process.cwd(), name);
  const exist = await fs.exists(dir);

  if (exist) {
    throw new Error("Folder already exists, aborting...");
  }

  const { store } = await inquirer.prompt<{ store: string }>({
    name: "store",
    type: "list",
    choices: ["No", "Yes"],
    message: "Do you want use Extension Store template?",
  });

  return {
    name,
    dir,
    store: store === "Yes" ? true : false,
  };
}

export async function copyBaseTemplate(dir: string) {
  try {
    await fs.copy(path.join(__dirname, "../", "templates", "base"), path.join(dir)).catch((err) => {
      throw new Error(err);
    });
    await fs.rename(path.join(dir, "_gitignore"), path.join(dir, ".gitignore")).catch((err) => {
      throw new Error(err);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export async function copyStoreTemplate(dir: string) {
  try {
    await fs.copy(path.join(__dirname, "../", "templates", "store"), path.join(dir, "store")).catch((err) => {
      throw new Error(err);
    });

    await fs.move(path.join(dir, "store", "util"), path.join(dir, "util")).catch((err) => {
      throw new Error(err);
    });

    await fs
      .move(path.join(dir, "util", "package.json"), path.join(dir, "package.json"), { overwrite: true })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

function validateName(name: string) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(name);
}

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
