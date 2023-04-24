import { prisma } from '@/config';

async function findHotel() {
  return prisma.hotel.findMany();
}

async function findRoomsForHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findHotel,
  findRoomsForHotelId,
};

export default hotelRepository;
