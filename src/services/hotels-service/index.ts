import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import hotelRepository from '@/repositories/hotels-repository';

function cannotListHotelsError() {
  return {
    name: 'cannotListError',
    message: 'Cannot list Hotels',
  };
}

async function ListsHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType || !ticket.TicketType.includesHotel) {
    cannotListHotelsError();
  }
}

async function getHotel(userId: number) {
  await ListsHotels(userId);
  const hotels = await hotelRepository.findHotel();
  return hotels;
}

async function getHotelsByRoom(userId: number, hotelId: number) {
  await ListsHotels(userId);
  const hotelRoom = await hotelRepository.findRoomsForHotelId(hotelId);
  if (!hotelRoom) {
    throw notFoundError();
  }
  return hotelRoom;
}

const hotelService = {
  getHotel,
  getHotelsByRoom,
};
export default hotelService;
