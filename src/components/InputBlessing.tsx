import { randomBlessing, blessing } from "@/utils/blessing";
import { css } from "@emotion/css";
import { Input } from "antd";
import { Dice1Icon, Dice6Icon, DicesIcon } from "lucide-react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface Props {
  onChange?: (value: string) => void;
}

const InputBlessing: NextPage<Props> = ({ onChange }) => {
  const [Blessing, setBlessing] = useState("");

  useEffect(() => {
    const result = randomBlessing() as string;
    setBlessing(result);
  }, []);

  const onChangeBlessing = (e: any) => {
    onChange && onChange(e.target.value);
    setBlessing(e.target.value);
  };

  const onRandom = () => {
    setBlessing(randomBlessing()!);
  };

  return (
    <div className="relative flex flex-col gap-3">
      <Input.TextArea size="large" value={Blessing} onChange={onChangeBlessing} placeholder="คำอวยพร" rows={12} maxLength={120} />
      <div className="flex justify-between text-white">
        <button onClick={onRandom} className="button-sm">
          <DicesIcon size={20} />
        </button>
        <div>{120 - Blessing.length}</div>
      </div>
    </div>
  );
};

export default InputBlessing;
