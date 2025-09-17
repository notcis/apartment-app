import z from "zod";

export const roomSchema = z.object({
  buildingId: z.coerce.number().int().min(1),
  floor: z.coerce.number().int().min(-10).max(200),
  number: z.string().min(1).max(50),
  typeId: z.coerce.number().int().optional().nullable(),
  baseRent: z.coerce.number().min(0),
  status: z
    .enum(["VACANT", "RESERVED", "OCCUPIED", "MAINTENANCE"])
    .default("VACANT"),
  remark: z.string().optional().nullable(),
});

export type RoomInput = z.infer<typeof roomSchema>;
