import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  createDoggo: publicProcedure
    .input(
      z.object({
        color: z.string(),
        name: z.string()
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.dog.create({
        data: {
          color: input.color,
          name: input.name
        }
      })
    }),
  getAllDoggos: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.dog.findMany();
    })
});
