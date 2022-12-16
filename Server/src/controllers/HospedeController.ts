import { Request, Response } from 'express';

import { appDataSource } from '../database';

import { Hospede } from '../models/Hospede';

class HospedeController {
  async store(req: Request, res: Response) {
    const data = req.body;

    const hospedeRepository = appDataSource.getRepository(Hospede);

    try {
      const hospede = hospedeRepository.create(data);

      await hospedeRepository.save(hospede);

      return res.status(201).json(hospede);
    } catch (err) {
      throw new Error(err);
    }
  }

  async index(req: Request, res: Response) {
    const hospedeRepository = appDataSource.getRepository(Hospede);

    try {
      const hospedes = await hospedeRepository.find();

      return res.json(hospedes);
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(req: Request, res: Response) {
    const { cpf } = req.params;
    const data = req.body;

    const hospedeRepository = appDataSource.getRepository(Hospede);

    try {
      const hospede = await hospedeRepository.findOneBy({ cpf });

      if (!hospede) {
        return res.status(404).json({ message: 'Hóspede não encontrado' });
      }

      await hospedeRepository.update(hospede.cpf, data);

      return res
        .status(200)
        .json({ message: 'Hóspede atualizado com sucesso' });
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(req: Request, res: Response) {
    const { cpf } = req.params;

    const hospedeRepository = appDataSource.getRepository(Hospede);

    try {
      const hospede = await hospedeRepository.findOneBy({ cpf });

      if (!hospede) {
        return res.status(404).json({ message: 'Hóspede não encontrado' });
      }

      await hospedeRepository.delete(hospede.cpf);

      return res.status(200).json({ message: 'Hóspede deletado com sucesso' });
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new HospedeController();
