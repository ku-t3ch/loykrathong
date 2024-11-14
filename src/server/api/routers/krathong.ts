import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import requestIp from "request-ip";
import { env } from "@/env.mjs";
import axios from "axios";
import FormData from "form-data";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  endpoint: `${process.env.S3_BUCKET_BASE_URL}`,
  forcePathStyle: true,
});

// Input validation schema
const authorSchema = z.object({
  name: z.string(),
  avatarUpload: z.string().optional(),
  avatar: z.string().optional(),
});

// Helper functions
const generateFileName = (suffix: string): string => {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000);
  return `${timestamp}-${randomSuffix}-${suffix}.png`;
};

const uploadAvatar = async (fileBase64: string, fileName: string): Promise<string> => {
  try {
    const buffer = Buffer.from(fileBase64.split(",")[1]!, "base64");
    
    console.log('Attempting to upload:', {
      fileName,
      bucketName: process.env.S3_BUCKET_NAME,
      endpoint: process.env.S3_BUCKET_BASE_URL
    });

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: "image/png",
      ACL: "public-read",
    });

    await s3Client.send(uploadCommand);
    return `${process.env.S3_BUCKET_BASE_URL}/${process.env.S3_BUCKET_NAME}/${fileName}`;
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw error;
  }
};

const verifyTurnstile = async (token: string, ip: string | null): Promise<void> => {
  const formData = new FormData();
  formData.append("secret", env.TURNSTILE_SECRET);
  formData.append("response", token);
  formData.append("remoteip", ip ?? "");

  const { data } = await axios({
    method: "post",
    maxBodyLength: Infinity,
    url: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    headers: { ...formData.getHeaders() },
    data: formData,
  });

  if (!data.success) {
    throw new Error("คุณไม่ผ่านการตรวจสอบ");
  }
};

export const krathongRouter = createTRPCRouter({
  send: publicProcedure
    .input(
      z.object({
        krathongImage: z.string(),
        blessing: z.string(),
        token: z.string(),
        author1: authorSchema,
        author2: authorSchema.optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { pb } = ctx;
      const { blessing, krathongImage, author1, author2 } = input;

      try {
        // Verify AWS configuration
        if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || 
            !process.env.AWS_REGION || !process.env.S3_BUCKET_NAME) {
          throw new Error("AWS configuration is incomplete");
        }

        // Verify Turnstile
        await verifyTurnstile(input.token, requestIp.getClientIp(ctx.req));

        // Base data for krathong record
        const baseData = {
          blessing,
          image: krathongImage,
          authorName: author1.name,
          created2: new Date().toISOString(),
        };

        // Handle avatar uploads and create record
        if (author2) {
          // Two authors case
          const [file1Url, file2Url] = await Promise.all([
            author1.avatarUpload ? uploadAvatar(author1.avatarUpload, generateFileName("author1")) : null,
            author2.avatarUpload ? uploadAvatar(author2.avatarUpload, generateFileName("author2")) : null,
          ]);

          await pb.collection("krathong").create({
            ...baseData,
            authorName2: author2.name,
            ...(file1Url ? { authorimageUpload: file1Url } : { authorimageDefault: author1.avatar }),
            ...(file2Url ? { authorimageUpload2: file2Url } : { authorimageDefault2: author2.avatar }),
          });
        } else {
          // Single author case
          const fileUrl = author1.avatarUpload 
            ? await uploadAvatar(author1.avatarUpload, generateFileName("author1"))
            : null;

          await pb.collection("krathong").create({
            ...baseData,
            ...(fileUrl ? { authorimageUpload: fileUrl } : { authorimageDefault: author1.avatar }),
          });
        }

        return { success: true };
      } catch (error) {
        console.error('Operation failed:', error);
        
        if (error instanceof Error) {
          if (error.message === "คุณไม่ผ่านการตรวจสอบ") throw error;
          if (error.message.includes('AWS')) {
            throw new Error("ไม่สามารถอัพโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง");
          }
        }
        
        throw new Error("เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาลองใหม่อีกครั้ง");
      }
    }),
});
