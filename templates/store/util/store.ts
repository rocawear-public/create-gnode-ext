import fs from "fs-extra";
import { zip } from "zip-a-folder";
import path from "path";

export async function main() {
  const exists = await fs.exists("dist/extension.zip");

  try {
    await fs.copy("store", "dist");
    if (exists) {
      await fs.remove("dist/extension.zip");
    }
    await zip("dist", "./store/extension.zip");
  } catch (err) {
    console.error(err);
  }
}

main().catch((err) => console.log(err));
