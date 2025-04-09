"use client";
import { CldVideoPlayer } from "next-cloudinary";
import 'next-cloudinary/dist/cld-video-player.css';

const publicId: string = "Videos/db3qhw1hgutdq544rozh";



export default async function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <CldVideoPlayer
        id="adaptive-bitrate-streaming"
        src={publicId}
        transformation={{
          streaming_profile: "hd",
        }}
        sourceTypes={["hls"]}
      />
    </div>
  );
}
