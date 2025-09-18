"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CREATE_ROOM_DEFAULT_VALUES } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

const formSchema = z.object({
  buildingId: z.number().min(1, { message: "Building is required" }),
  floor: z.number().min(1, { message: "Floor is required" }),
  number: z.string().min(1, { message: "Room number is required" }),
  typeId: z.number().min(1, { message: "Room type is required" }),
  baseRent: z.number().min(0),
  status: z.string().min(1, { message: "Status is required" }),
  remark: z.string().optional(),
});

export default function RoomForm({
  buildings,
  types,
  mode,
  id,
}: {
  buildings: { id: number; name: string }[];
  types: { id: number; name: string }[];
  mode: "create" | "edit";
  id?: number;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: mode === "create" ? CREATE_ROOM_DEFAULT_VALUES : undefined,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="buildingId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อาคาร</FormLabel>
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(v) => field.onChange(Number(v))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกอาคาร" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {buildings.map((b) => (
                    <SelectItem key={b.id} value={String(b.id)}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="floor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชั้น</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เลขห้อง</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ประเภทห้อง</FormLabel>
              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(v) => field.onChange(Number(v))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="(ไม่ระบุ)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types.map((t) => (
                    <SelectItem key={t.id} value={String(t.id)}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="baseRent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ค่าเช่าพื้นฐาน (฿/เดือน)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>สถานะห้อง</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสถานะ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="VACANT">ว่าง</SelectItem>
                  <SelectItem value="RESERVED">จอง</SelectItem>
                  <SelectItem value="OCCUPIED">อยู่</SelectItem>
                  <SelectItem value="MAINTENANCE">ซ่อมบำรุง</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remark"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>หมายเหตุ</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="md:col-span-2 flex items-center gap-2">
          <Button type="submit">บันทึก</Button>
        </div>
      </form>
    </Form>
  );
}
