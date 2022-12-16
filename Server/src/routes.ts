import { Request, Response, Router } from 'express';
import HospedeController from './controllers/HospedeController';
import HotelController from './controllers/HotelController';
import QuartoController from './controllers/QuartoController';
import RegImobiliarioController from './controllers/RegImobiliarioController';
import ReservaController from './controllers/ReservaController';
const router = Router();

// Registro Imobiliario
router.post('/regImobiliario', RegImobiliarioController.store);
router.get('/regImobiliario', RegImobiliarioController.index);

// Hotel
router.post('/hotel', HotelController.store);
router.get('/hotel', HotelController.index);
router.put('/hotel/:id', HotelController.update);
router.delete('/hotel/:id', HotelController.delete);

// Reserva
router.post('/reserva', ReservaController.store);
router.get('/reserva', ReservaController.index);
router.put('/reserva/:id', ReservaController.update);
router.delete('/reserva/:id', ReservaController.delete);

// Quarto
router.post('/quarto', QuartoController.store);
router.get('/quarto', QuartoController.index);
router.put('/quarto/:id', QuartoController.update);
router.delete('/quarto/:id', QuartoController.delete);

// Hospede
router.post('/hospede', HospedeController.store);
router.get('/hospede', HospedeController.index);
router.put('/hospede/:cpf', HospedeController.update);
router.delete('/hospede/:cpf', HospedeController.delete);

export { router };
