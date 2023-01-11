import { Extension } from "gnode-api";

const extensionInfo = {
  name: "My Extension",
  description: "My first G-Node extension",
  version: "0.1",
  author: "Your name",
};

const ext = new Extension(extensionInfo);
ext.run();
