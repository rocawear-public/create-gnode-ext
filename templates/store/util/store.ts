import fs from "fs-extra";
import { zip } from "zip-a-folder";

export async function main() {
  try {
    await fs.copy("store", "dist");
    await zip("dist", "./store/extension.zip");
  } catch (err) {
    console.error(err);
  }
}

main().catch((err) => console.log(err));
