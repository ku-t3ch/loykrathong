import { cdn } from "@/utils/cdn";
import clsx from "clsx";
import { NextPage } from "next";

interface Props {
  className?: string;
}

const Kratong: NextPage<Props> = ({ className }) => {
  return (
    <div className={clsx("w-[10rem]", className)}>
      <img src={cdn + "/krathong/1.webp"} alt="" />
    </div>
  );
};

export default Kratong;
