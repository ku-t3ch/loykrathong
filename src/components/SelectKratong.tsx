import { cdn } from "@/utils/cdn";
import krathong from "@/utils/krathong";
import clsx from "clsx";
import { CheckIcon } from "lucide-react";
import { NextPage } from "next";
import { useState } from "react";

interface Props {
  onSelect?: (index: number) => void;
}

const SelectKratong: NextPage<Props> = ({ onSelect }) => {
  const [KratongIndexSelect, setKratongIndexSelect] = useState(0);

  return (
    <div className="mt-3 grid grid-cols-3 gap-3">
      {krathong.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setKratongIndexSelect(index);
            onSelect && onSelect(index);
          }}
          className={clsx("relative flex w-full cursor-pointer justify-center rounded-lg px-5 py-2 hover:bg-black/40", KratongIndexSelect === index ? "bg-black/40" : "bg-black/10")}
        >
          {index === KratongIndexSelect && (
            <div className="absolute right-2 top-2 flex h-[1rem] w-[1rem] md:h-[2rem] md:w-[2rem] items-center justify-center rounded-full bg-green-500">
              <CheckIcon />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 top-0 select-none" />
          <img src={cdn + "/" + item} className="object-contain" alt="" />
        </div>
      ))}
    </div>
  );
};

export default SelectKratong;
