"use server";

import { prisma } from "@/lib/prisma";
import { roomSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";

export async function createRoom(input: unknown) {
  try {
    const data = roomSchema.parse(input);
    await prisma.room.create({ data });
    revalidatePath("/(admin)/rooms");
    return { success: true, message: "Room created successfully" };
  } catch (error) {
    console.error("Error creating room:", error);
    return { success: false, message: "Error creating room" };
  }
}

export async function updateRoom(id: number, input: unknown) {
  try {
    const data = roomSchema.parse(input);
    await prisma.room.update({ where: { id }, data });
    revalidatePath("/(admin)/rooms");
    revalidatePath(`/(admin)/rooms/${id}`);
    return { success: true, message: "Room updated successfully" };
  } catch (error) {
    console.error("Error updating room:", error);
    return { success: false, message: "Error updating room" };
  }
}

export async function deleteRoom(id: number) {
  await prisma.room.delete({ where: { id } });
  revalidatePath("/(admin)/rooms");
  return { ok: true };
}
