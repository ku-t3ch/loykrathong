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

        if (input.author2) {
          const fileName1 = input.author1.name;
          const fileName2 = input.author2.name;
          let buffer1 = null;
          let buffer2 = null;
          let file1Url = null;
          let file2Url = null;

          // Handling first avatar upload
          if (input.author1.avatarUpload) {
            const file1 = input.author1.avatarUpload;
            buffer1 = Buffer.from(file1.split(",")[1]!, "base64");
          }

          // Handling second avatar upload
          if (input.author2.avatarUpload) {
            const file2 = input.author2.avatarUpload;
            buffer2 = Buffer.from(file2.split(",")[1]!, "base64");
          }

          if (buffer1 && buffer2) {
            const s3Params1 = {
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: fileName1,
              Body: buffer1,
              ContentType: "image/png",
              ACL: "public-read",
            };

            // S3 parameters for the second file
            const s3Params2 = {
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: fileName2,
              Body: buffer2,
              ContentType: "image/png",
              ACL: "public-read",
            };

            const s3Result1 = await s3.upload(s3Params1).promise();
            const s3Result2 = await s3.upload(s3Params2).promise();

            // Construct the file URLs
            file1Url = `https://${process.env.S3_BUCKET_BASE_URL}/${fileName1}`;
            file2Url = `https://${process.env.S3_BUCKET_BASE_URL}/${fileName2}`;

            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageUpload: file1Url,
              authorName2: input.author2.name,
              authorimageUpload2: file2Url,
              created2: new Date().toISOString(),
            });
          } else if (buffer1 && !buffer2) {
            const s3Params1 = {
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: fileName1,
              Body: buffer1,
              ContentType: "image/png",
              ACL: "public-read",
            };

            const s3Result1 = await s3.upload(s3Params1).promise();
            file1Url = `https://${process.env.S3_BUCKET_BASE_URL}/${fileName1}`;

            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageUpload: file1Url,
              authorName2: input.author2.name,
              authorimageDefault2: input.author2.avatar,
              created2: new Date().toISOString(),
            });
          } else if (!buffer1 && buffer2) {
            const s3Params2 = {
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: fileName2,
              Body: buffer2,
              ContentType: "image/png",
              ACL: "public-read",
            };

            const s3Result2 = await s3.upload(s3Params2).promise();
            file2Url = `https://${process.env.S3_BUCKET_BASE_URL}/${fileName2}`;
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
          let fileUrl = null;
          let buffer1 = null;

          if (input.author1.avatarUpload) {
            // file = base64ToFile(input.author1.avatarUpload, "krathong1.jpg");
            // file = input.author1.avatarUpload;
            const file = input.author1.avatarUpload;
            buffer1 = Buffer.from(file.split(",")[1]!, "base64");
          }

          if (buffer1) {
            const fileName1 = input.author1.name;
            const s3Params1 = {
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: fileName1,
              Body: buffer1,
              ContentType: "image/png",
              ACL: "public-read",
            };

            const s3Result1 = await s3.upload(s3Params1).promise();
            fileUrl = `https://${process.env.S3_BUCKET_BASE_URL}/${fileName1}`;
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
