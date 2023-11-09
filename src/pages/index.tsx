import Kratong from "@/components/Kratong";
import { cdn } from "@/utils/cdn";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import clsx from "clsx";

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
  animation: ${(props) => props.animation} linear 0s infinite normal none
    running animation-1cw62g9;
  backface-visibility: hidden;

  @keyframes animation-1cw62g9 {
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
  animation: 238.41s linear 0s infinite normal none running animation-hmfifo;
  @keyframes animation-hmfifo {
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
            <div className="absolute bottom-0 left-1/2 top-0 z-50 flex -translate-x-1/2 items-center">
              <div className="text-center text-3xl font-bold text-white">
                ลอยกระทง 2566
              </div>
            </div>
            <Background
              className={clsx(
                "absolute bottom-0 left-0 right-0 z-0 h-full min-w-[5298px]",
              )}
            ></Background>
          </div>
          <div className={clsx("relative min-h-screen", css``)}>
            <div className="pointer-events-none absolute left-0 top-[3rem] z-[3] flex h-[150px] w-full justify-end overflow-hidden">
              <Wave animation="40s" />
            </div>
            <div className="pointer-events-none absolute left-0 top-[9rem] z-[5] flex h-[150px] w-full justify-end ">
              <Wave animation="30s" className="z-20" />
              <div
                className="absolute top-0 left-0 w-full h-full "
                style={{ opacity: 0.5 }}
              >
                <div className="">

                </div>
              </div>
              {/* <div className="absolute bottom-0 z-10 flex -translate-y-[7.5rem] gap-5">
                <Kratong className="cursor-pointer" />
                <Kratong />
                <Kratong />
              </div> */}
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2">asdfasdf</div>
      </div>
    </>
  );
}
