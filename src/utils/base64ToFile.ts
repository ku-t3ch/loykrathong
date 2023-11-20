import { File } from "buffer";

const base64ToFile = (data: string, filename: string) => {
  const base64 = data.split(",")[1];
  const buffer = Buffer.from(base64!, "base64");
  const file = new File([buffer], filename, {
    type: "image/png",
  });
  return file;
};

export default base64ToFile;
