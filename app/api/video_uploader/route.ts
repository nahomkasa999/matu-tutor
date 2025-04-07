import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCldImageUrl } from "next-cloudinary";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

interface CloudinaryUplaodResult {
  public_id: string;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (userId === undefined) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const file = (formData.get("file") as File) || null;

    console.log(file);

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUplaodResult>(
      (resolve, reject) => {
        const uplaodStream = cloudinary.v2.uploader.upload_stream(
          {
            folder: "Videos",
            resource_type: "video",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUplaodResult);
          }
        );
        uplaodStream.end(buffer);
      }
    );

    return NextResponse.json({ publicId: result.public_id }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ mssg: "error happend while uploading" });
  }
}
