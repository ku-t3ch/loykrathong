import AddKratong from "@/components/AddKratong";
import Kratong from "@/components/Kratong";
import { cdn } from "@/utils/cdn";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { Card, Form, Input } from "antd";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { MoveRightIcon } from "lucide-react";

interface WaveProps {
  animation: string;
}

const Wave = styled.div<WaveProps>`
  min-width: 5298px;
  height: 100%;
  background-image: url(${cdn}/wave.png);
  background-size: auto 100%;
  background-repeat: repeat-x;
  background-position: left top;
  animation: ${(props) => props.animation} linear 0s infinite normal none running wave-floating;
  backface-visibility: hidden;

  @keyframes wave-floating {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(1080px);
    }
  }
`;

const Background = styled.div`
  background-image: url(${cdn}/bg2.png);
  background-repeat: repeat-x;
  background-size: auto 100%;
  background-position: left top;
  animation: 238.41s linear 0s infinite normal none running animation-pass;
  @keyframes animation-pass {
    0% {
      background-position: 100% 0px;
    }
    100% {
      background-position: 0px 0px;
    }
  }
`;

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen">
        <img src={cdn + "/moon.webp"} className="moon" alt="moon-image" />
        <div className="overflow-hidden">
          <div className={clsx("relative min-h-[345px]")}>
            <img className="absolute left-1/2 top-[8rem] z-10 flex w-[24rem] -translate-x-1/2 items-center drop-shadow-md" src={cdn + "/logo.png"} alt="" />
            <Background className={clsx("absolute bottom-0 left-0 right-0 z-0 h-full min-w-[5298px]")}></Background>
          </div>
          <div className={clsx("relative min-h-[60vh]")}>
            <div className="absolute right-0 top-[3rem] z-[3] flex h-[150px] w-full justify-end">
              <Wave animation="40s" className="z-20" />
              <div
                className={clsx(
                  "absolute bottom-[7rem] z-10 flex gap-[10rem]",
                  css`
                    transform: translateX(0%);
                    animation: ${8 * 5}s linear 0s infinite normal none running floating1;
                  `,
                )}
              >
                <AnimatePresence>
                  {[...Array(5)].map((_, i) => (
                    <Kratong data={String(i)} key={i} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div className="absolute right-0 top-[9rem] z-[5] flex h-[150px] w-full justify-end">
              <Wave animation="30s" className="z-20" />
              <div
                className={clsx(
                  "absolute bottom-[8rem] z-10 flex gap-[12rem]",
                  css`
                    animation: ${10 * 5}s linear 0s infinite normal none running floating2;
                  `,
                )}
              >
                <AnimatePresence>
                  {[...Array(5)].map((_, i) => (
                    <Kratong data={String(i)} key={i} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div className="absolute left-0 right-0 top-[20rem] mx-auto flex max-w-lg flex-col items-center justify-center gap-10">
              <AddKratong />
              <div className="button-sm w-fit">คำอวยพรทั้งหมด</div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 text-white">Copyright © 2023 KU Tech</div>
      </div>
    </>
  );
}
