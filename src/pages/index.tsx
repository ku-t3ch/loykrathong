import AddKratong from "@/components/AddKratong";
import Kratong from "@/components/Kratong";
import { Krathong } from "@/interfaces/Krathong";
import { cdn } from "@/utils/cdn";
import { pb } from "@/utils/pocketbase";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import _ from "lodash";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

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

    const [Krathongs1, setKrathongs1] = useState<Krathong[]>([])
    const [Krathongs2, setKrathongs2] = useState<Krathong[]>([])

    const [KeyRerender, setKeyRerender] = useState(0)

    const getData = async () => {
        pb.autoCancellation(false)
        const records = await pb.collection('krathong').getFullList<Krathong>({
            sort: '-created',
            perPage: 10,
        });

        const per = Math.ceil(records.length / 2) > 5 ? 5 : Math.ceil(records.length / 2)

        setKrathongs1(records.slice(0, per))
        setKrathongs2(records.slice(per, 10))
    }



    useEffect(() => {
        getData();

        pb.collection('krathong').subscribe<Krathong>('*', function (e) {
            if (Krathongs1.length < Krathongs2.length) {
                setKrathongs1(pre => [e.record, ...pre])
                setKrathongs1(pre => pre.slice(0, 5))
            } else if (Krathongs2.length < Krathongs1.length) {
                setKrathongs2(pre => [e.record, ...pre])
                setKrathongs2(pre => pre.slice(0, 5))
            } else {
                setKrathongs1(pre => [e.record, ...pre])
                setKrathongs1(pre => pre.slice(0, 5))
            }
        });

    }, [])

    return (
        <>
            <div className="relative min-h-screen">
                <motion.img src={cdn + "/moon.webp"} className="moon" alt="moon-image" />
                <div className="overflow-hidden">
                    <div className={clsx("relative min-h-[345px]")}>
                        <img className="absolute left-1/2 top-[8rem] z-10 flex w-[24rem] -translate-x-1/2 items-center drop-shadow-md" src={cdn + "/logo.png"} alt="" />
                        <Background className={clsx("absolute bottom-0 left-0 right-0 z-0 h-full min-w-[5298px]")}></Background>
                    </div>
                    <div className={clsx("relative min-h-[60vh]")}>
                        <div className="absolute right-0 top-[3rem] z-[3] flex h-[150px] w-full justify-end">
                            <Wave animation="40s" className="z-20" />
                            <div
                                key={KeyRerender}
                                className={clsx(
                                    "absolute bottom-[8.5rem] z-10 flex gap-[10rem]",
                                    css`
                    transform: translateX(0%);
                    animation: ${8 * Krathongs1.length}s linear 0s infinite normal none running floating1;
                  `,
                                )}
                            >
                                <AnimatePresence >
                                    {Krathongs1.map((krathong, i) => (
                                        <Kratong data={krathong} key={i} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="absolute right-0 top-[9rem] z-[5] flex h-[150px] w-full justify-end">
                            <Wave animation="30s" className="z-20" />
                            <div
                                key={KeyRerender}
                                className={clsx(
                                    "absolute bottom-[8.5rem] z-10 flex gap-[12rem]",
                                    css`
                    animation: ${10 * Krathongs2.length}s linear 0s infinite normal none running floating2;
                  `,
                                )}
                            >
                                <AnimatePresence>
                                    {Krathongs2.map((krathong, i) => (
                                        <Kratong data={krathong} key={i} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="absolute left-0 right-0 top-[14rem] z-10 mx-auto flex max-w-lg flex-col items-center justify-center gap-10">
                            <AddKratong />
                            <Link href="/blessing" className="button-sm w-fit">คำอธิษฐานทั้งหมด</Link>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
