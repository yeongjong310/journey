/* eslint-disable @typescript-eslint/ban-ts-comment */

"use client";

import MyElement3D from "./MyElement3D";
import dynamic from "next/dynamic";
const FiberCanvas = dynamic<
  // @ts-expect-error
  React.ComponentProps<typeof import("@react-three/fiber").Canvas>
  // @ts-expect-error
>(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false });

export function Canvas() {
  return (
    <FiberCanvas className="w-full h-full">
      <MyElement3D />
    </FiberCanvas>
  );
}
