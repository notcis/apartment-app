import { getBuildingsAndRoomTypes } from "@/actions/rooms.action";
import RoomForm from "../components/room-form";

export default async function CreateRoomPage() {
  const { buildings, types } = await getBuildingsAndRoomTypes();
  return (
    <div className="p-4 md:p-6 space-y-4">
      <h1 className="text-2xl font-bold">เพิ่มห้องใหม่</h1>
      <RoomForm mode="create" buildings={buildings} types={types} />
    </div>
  );
}
