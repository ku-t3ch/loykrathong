import { Krathong } from "@/interfaces/Krathong";
import { RecordModel } from "pocketbase";
import { pb } from "./pocketbase";
import { cdn } from "./cdn";

const fileNameToUrl = (
  fileName: string,
  defaultImage: string,
  data: Krathong,
) => {
  if (fileName) {
    const record = {
      id: data?.id,
      collectionId: data?.collectionId,
      collectionName: data?.collectionName,
    } as RecordModel;

    const url = pb.files.getUrl(record, fileName, { thumb: "100x250" });
    return url;
  } else {
    return cdn + defaultImage;
  }
};


export default fileNameToUrl;