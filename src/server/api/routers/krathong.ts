import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import base64ToFile from "@/utils/base64ToFile";
import requestIp from "request-ip";
import { env } from "@/env.mjs";
import axios from "axios";
import FormData from "form-data";

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
          let file1 = null;
          let file2 = null;

          if (input.author1.avatarUpload) {
            file1 = base64ToFile(input.author1.avatarUpload, "krathong1.png");
          }

          if (input.author2.avatarUpload) {
            file2 = base64ToFile(input.author2.avatarUpload, "krathong2.png");
          }

          if (file1 && file2) {
            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageUpload: file1,
              authorName2: input.author2.name,
              authorimageUpload2: file2,
              created2: new Date().toISOString(),
            });
          } else if (file1 && !file2) {
            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageUpload: file1,
              authorName2: input.author2.name,
              authorimageDefault2: input.author2.avatar,
              created2: new Date().toISOString(),
            });
          } else if (!file1 && file2) {
            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageDefault: input.author1.avatar,
              authorName2: input.author2.name,
              authorimageUpload2: file2,
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
          let file = null;

          if (input.author1.avatarUpload) {
            file = base64ToFile(input.author1.avatarUpload, "krathong1.jpg");
          }

          if (file) {
            await pb.collection("krathong").create({
              blessing,
              image: krathongImage,
              authorName: input.author1.name,
              authorimageUpload: file,
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
        if (error instanceof Error && error.message === "คุณไม่ผ่านการตรวจสอบ") {
            throw new Error("คุณไม่ผ่านการตรวจสอบ");
        }
        throw new Error("Something went wrong");
      }
    }),
});
