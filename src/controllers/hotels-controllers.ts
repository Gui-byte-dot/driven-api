import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotelTypes = await hotelService.getHotel(Number(userId));
    return res.status(httpStatus.OK).send(hotelTypes);
  } catch (error) {
    console.log(error);
  }
}

export async function getHotelsByRoom(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;

  try {
    const hotelTypesId = await hotelService.getHotelsByRoom(Number(userId), Number(hotelId));
    return res.status(httpStatus.OK).send(hotelTypesId);
  } catch (error) {}
}
