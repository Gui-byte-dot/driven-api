import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotels, getHotelsByRoom } from '@/controllers/hotels-controllers';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getHotels).get('/:hotelId', getHotelsByRoom);

export { hotelsRouter };
