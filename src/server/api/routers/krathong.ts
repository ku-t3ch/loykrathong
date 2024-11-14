import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import base64ToFile from "@/utils/base64ToFile";
import requestIp from "request-ip";
import { env } from "@/env.mjs";
import axios from "axios";
import FormData from "form-data";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadAvatar = async (fileBase64: string, fileName: string) => {
  const buffer = Buffer.from(fileBase64.split(",")[1]!, "base64");
  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
    Body: buffer,
    ContentType: "image/png",
    ACL: "public-read",
  };
  const s3Result = await s3.upload(s3Params).promise();
  return `https://${process.env.S3_BUCKET_BASE_URL}/${fileName}`;
};

export const krathongRouter = createTRPCRouter({
  send: publicProcedure
    .input(
      z.object({
        krathongImage: z.string(),
        blessing: z.string(),
        token: z.string(),
        author1: z.object({
          name: z.string(),
          avatarUpload: z.string().optional(),
          avatar: z.string().optional(),
        }),
        author2: z
          .object({
            name: z.string(),
            avatarUpload: z.string().optional(),
            avatar: z.string().optional(),
          })
          .optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { pb } = ctx;
      const { blessing, krathongImage } = input;

      try {
        const detectedIp = requestIp.getClientIp(ctx.req);
        let formData = new FormData();
        formData.append("secret", env.TURNSTILE_SECRET);
        formData.append("response", input.token);
        formData.append("remoteip", detectedIp!);

        let { data } = await axios({
          method: "post",
          maxBodyLength: Infinity,
          url: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          headers: {
            ...formData.getHeaders(),
          },
          data: formData,
        });

        if (!data.success) {
          throw new Error("คุณไม่ผ่านการตรวจสอบ");
        }

        const timestamp = Date.now();
        const randomSuffix = Math.floor(Math.random() * 1000);

        const fileName1 = `${timestamp}-${randomSuffix}-author1`;
        const fileName2 = `${timestamp}-${randomSuffix}-author2`;

        if (input.author2) {
          let file1: string | null = null;
          let file2: string | null = null;

          // Handling first avatar upload
          if (input.author1.avatarUpload) {
            file1 = input.author1.avatarUpload;
          }

          // Handling second avatar upload
          if (input.author2.avatarUpload) {
            file2 = input.author2.avatarUpload;
          }

          if (file1 && file2) {
            // Construct the file URLs
            const file1Url = await uploadAvatar(file1, fileName1);
            const file2Url = await uploadAvatar(file2, fileName2);

            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageUpload: file1Url,
              authorName2: input.author2.name,
              authorimageUpload2: file2Url,
              created2: new Date().toISOString(),
            });
          } else if (file1 && !file2) {
            const file1Url = await uploadAvatar(file1, fileName1);

            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageUpload: file1Url,
              authorName2: input.author2.name,
              authorimageDefault2: input.author2.avatar,
              created2: new Date().toISOString(),
            });
          } else if (!file1 && file2) {
            const file2Url = await uploadAvatar(file2, fileName2);
            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageDefault: input.author1.avatar,
              authorName2: input.author2.name,
              authorimageUpload2: file2Url,
              created2: new Date().toISOString(),
            });
          } else {
            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageDefault: input.author1.avatar,
              authorName2: input.author2.name,
              authorimageDefault2: input.author2.avatar,
              created2: new Date().toISOString(),
            });
          }
        } else {
          let file1: string | null = null;

          if (input.author1.avatarUpload) {
            file1 = input.author1.avatarUpload;
          }

          if (file1) {
            const fileUrl = await uploadAvatar(file1, fileName1);
            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageUpload: fileUrl,
              created2: new Date().toISOString(),
            });
          } else {
            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageDefault: input.author1.avatar,
              created2: new Date().toISOString(),
            });
          }
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "คุณไม่ผ่านการตรวจสอบ"
        ) {
          throw new Error("คุณไม่ผ่านการตรวจสอบ");
        }
        throw new Error("พระแม่คงคาไม่รับพรของท่าน กรุณาลองใหม่อีกครั้ง");
      }
    }),
});
