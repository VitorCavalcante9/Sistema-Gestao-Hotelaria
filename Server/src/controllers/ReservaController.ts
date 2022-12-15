import { Request, Response } from 'express';

import { appDataSource } from '../database';
import { Piscina } from '../models/Piscina';

import { Reserva } from '../models/Reserva';

export class ReservaController {
  async store(req: Request, res: Response) {
    const {
      quarto_id,
      hospede_cpf,
      data_checkin,
      data_checkout,
      preco,
      num_quartos,
      piscinas: vetor_piscinas,
    } = req.body;

    const reservaRepository = appDataSource.getRepository(Reserva);
    const piscinaRepository = appDataSource.getRepository(Piscina);

    try {
      const piscinas_ids: Array<{ piscina_id: string }> = vetor_piscinas;
      let piscinas = [];

      const reserva = reservaRepository.create({
        quarto_id,
        hospede_cpf,
        data_checkin,
        data_checkout,
        preco,
        num_quartos,
      });

      for (const p of piscinas_ids) {
        const piscina = await piscinaRepository.findOneBy({
          id: Number(p.piscina_id),
        });

        if (!piscina) {
          return res.status(404).json({ message: 'Piscina não encontrada' });
        }

        piscinas.push(piscina);
      }

      reserva.piscinas = piscinas;

      await reservaRepository.save(reserva);

      return res.status(201).json(reserva);
    } catch (err) {
      throw new Error(err);
    }
  }

  async index(req: Request, res: Response) {
    const reservaRepository = appDataSource.getRepository(Reserva);
    try {
      const reservas = await reservaRepository.find({
        relations: ['piscinas'],
      });

      return res.status(200).json(reservas);
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      quarto_id,
      hospede_cpf,
      data_checkin,
      data_checkout,
      preco,
      num_quartos,
      piscinas: vetor_piscinas,
    } = req.body;

    const reservaRepository = appDataSource.getRepository(Reserva);
    const piscinaRepository = appDataSource.getRepository(Piscina);

    try {
      const reserva = await reservaRepository.findOneBy({ id: Number(id) });

      if (!reserva) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }

      await reservaRepository.update(id, {
        quarto_id,
        hospede_cpf,
        data_checkin,
        data_checkout,
        preco,
        num_quartos,
      });

      const piscinas_ids: Array<{ piscina_id: string }> = vetor_piscinas;
      let piscinas = [];

      for (const p of piscinas_ids) {
        const piscina = await piscinaRepository.findOneBy({
          id: Number(p.piscina_id),
        });

        if (!piscina) {
          return res.status(404).json({ message: 'Piscina não encontrada' });
        }

        piscinas.push(piscina);
      }

      reserva.piscinas = piscinas;

      await reservaRepository.save(reserva);

      return res
        .status(200)
        .json({ message: 'Reserva atualizada com sucesso' });
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const reservaRepository = appDataSource.getRepository(Reserva);
    try {
      const reserva = await reservaRepository.findOneBy({ id: Number(id) });

      if (!reserva) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }

      await reservaRepository.delete(id);

      return res.status(200).json({ message: 'Reserva deletada com sucesso' });
    } catch (err) {
      throw new Error(err);
    }
  }

  async reservar_piscina(req: Request, res: Response) {
    const { id } = req.params;
    const { piscina_id } = req.body;

    const reservaRepository = appDataSource.getRepository(Reserva);
    const piscinaRepository = appDataSource.getRepository(Piscina);

    try {
      const reserva = await reservaRepository.findOne({
        relations: {
          piscinas: true,
        },
        where: { id: Number(id) },
      });

      if (!reserva) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }

      const piscina = await piscinaRepository.findOneBy({
        id: Number(piscina_id),
      });

      if (!piscina) {
        return res.status(404).json({ message: 'Piscina não encontrada' });
      }

      reserva.piscinas.push(piscina);

      await reservaRepository.save(reserva);

      return res.json({ message: 'Reserva da piscina feita com sucesso' });
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new ReservaController();
