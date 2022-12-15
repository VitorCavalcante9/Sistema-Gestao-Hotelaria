import { Request, Response } from 'express';

import { appDataSource } from '../database';

import { Hotel } from '../models/Hotel';
import { RegistroImobiliario } from '../models/RegistroImobiliario';

class HotelController {
  async store(req: Request, res: Response) {
    const {
      nome,
      descricao: desc_hotel,
      categoria,
      reg_imobiliario: {
        num_registro,
        metragem,
        descricao,
        logradouro,
        numero,
        cep,
        bairro,
        cidade,
        estado,
        latitude,
        longitude,
      },
      setores,
      piscinas,
    } = req.body;

    const hotelRepository = appDataSource.getRepository(Hotel);
    const regImobiliarioRepository =
      appDataSource.getRepository(RegistroImobiliario);

    try {
      const regImobiliario = regImobiliarioRepository.create({
        num_registro,
        metragem,
        descricao,
        logradouro,
        numero,
        cep,
        bairro,
        cidade,
        estado,
        latitude,
        longitude,
      });

      await regImobiliarioRepository.save(regImobiliario);

      const hotel = await hotelRepository.create({
        nome,
        descricao: desc_hotel,
        categoria,
        reg_imobiliario_id: regImobiliario.num_registro,
        setores,
        piscinas,
      });

      await hotelRepository.save(hotel);

      return res.status(201).json(hotel);
    } catch (error) {
      throw new Error(error);
    }
  }

  async index(req: Request, res: Response) {
    const hotelRepository = appDataSource.getRepository(Hotel);

    const hoteis = await hotelRepository.find({
      relations: ['setores', 'quartos', 'piscinas', 'registro_imobiliario'],
    });

    return res.status(302).json(hoteis);
  }

  async update(req: Request, res: Response) {
    const { nome, descricao, categoria, reg_imobiliario_id } = req.body;

    const { id } = req.params;

    const hotelRepository = appDataSource.getRepository(Hotel);

    try {
      const hotel = await hotelRepository.findOneBy({
        id: Number(id),
      });

      const newHotel = {
        ...hotel,
        nome,
        descricao,
        categoria,
        reg_imobiliario_id: reg_imobiliario_id ?? hotel.reg_imobiliario_id,
      };

      await hotelRepository.update({ id: Number(id) }, newHotel);

      return res.json(newHotel);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const hotelRepository = appDataSource.getRepository(Hotel);

    try {
      await hotelRepository.delete({ id: Number(id) });

      return res.status(200).json({ message: 'Hotel deleted' });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new HotelController();
