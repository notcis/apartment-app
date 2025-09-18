import { prisma } from "@/lib/prisma";

const buildings = [{ name: "อาคาร 5 ชั้น" }];

const roomTypes = [
  {
    name: "ห้องเปล่า",
    description: "ห้องเปล่า ไม่มีเฟอร์นิเจอร์",
    defaultRent: 2500,
    defaultDeposit: 3000,
  },
  {
    name: "ห้องเฟอร์นิเจอร์",
    description: "ห้องที่มีเฟอร์นิเจอร์ครบครัน",
    defaultRent: 3000,
    defaultDeposit: 3000,
  },
];

const seedBuildings = async () => {
  await prisma.building.createMany({ data: buildings });
  console.log("Seeded buildings");
};

const seedRoomTypes = async () => {
  await prisma.roomType.createMany({ data: roomTypes });
  console.log("Seeded room types");
};

//seedBuildings();

//seedRoomTypes();
