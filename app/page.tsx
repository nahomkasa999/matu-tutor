"use client";
import { CldVideoPlayer } from "next-cloudinary";
import 'next-cloudinary/dist/cld-video-player.css';
import { PrismaClient } from '@prisma/client';

const publicId: string = "Videos/db3qhw1hgutdq544rozh";


export default function Home() {



const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    const users = await prisma.user.findMany();
    console.log('Connected to the database successfully', users);
  } catch (error) {
    console.error('Failed to connect to the database', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();



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
