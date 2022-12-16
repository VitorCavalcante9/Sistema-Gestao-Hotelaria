import { Request, Response } from 'express';

import { appDataSource } from '../database';
import { Amenidade } from '../models/Amenidade';

import { Quarto } from '../models/Quarto';

class QuartoController {
  async store(req: Request, res: Response) {
    const data = req.body;

    const quartoRepository = appDataSource.getRepository(Quarto);

    try {
      const quarto = await quartoRepository.create(data);

      await quartoRepository.save(quarto);

      return res.status(201).json(quarto);
    } catch (err) {
      throw new Error(err);
    }
  }

  async index(req: Request, res: Response) {
    const quartoRepository = appDataSource.getRepository(Quarto);

    const quartos = await quartoRepository.find({
      relations: ['amenidades', 'hotel'],
    });

    return res.json(quartos);
  }

  async update(req: Request, res: Response) {
    const data = req.body;
    const { id } = req.params;

    const quartoRepository = appDataSource.getRepository(Quarto);
    const amenidadesRepository = appDataSource.getRepository(Amenidade);

    try {
      const quarto = await quartoRepository.findOneBy({
        id: Number(id),
      });

      delete data.hotel_id;

      await amenidadesRepository.delete({
        quarto_id: quarto.id,
      });

      const newQuarto = {
        ...quarto,
        ...data,
      };

      await quartoRepository.save(newQuarto);

      return res.json(newQuarto);
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const quartoRepository = appDataSource.getRepository(Quarto);

    try {
      await quartoRepository.delete({ id: Number(id) });

      return res.status(200).json({ message: 'Hotel deleted' });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new QuartoController();
