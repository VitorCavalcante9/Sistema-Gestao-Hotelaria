import { Request, Response } from 'express';

import { appDataSource } from '../database';

class BeneficioAssalariadoController {
  async store(req: Request, res: Response) {
    const { funcionario_cpf, tipo, valor } = req.body;

    const beneficioRepository = appDataSource.getRepository(
      'BeneficioAssalariado'
    );

    try {
      const beneficio = beneficioRepository.create({
        funcionario_cpf,
        tipo,
        valor,
      });

      await beneficioRepository.save(beneficio);

      return res.status(201).json(beneficio);
    } catch (error) {
      throw new Error(error);
    }
  }
  async index(req: Request, res: Response) {
    const beneficioRepository = appDataSource.getRepository(
      'BeneficioAssalariado'
    );

    try {
      const beneficio = await beneficioRepository.find();

      return res.status(200).json(beneficio);
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(req: Request, res: Response) {
    const { funcionario_cpf, tipo, valor } = req.body;
    const { id } = req.params;

    const beneficioRepository = appDataSource.getRepository(
      'BeneficioAssalariado'
    );

    try {
      const beneficio = await beneficioRepository.findOneBy({ id });

      if (!beneficio) {
        return res.status(404).json({ message: 'Beneficio não encontrado' });
      }

      const beneficioUpdated = await beneficioRepository.update(id, {
        funcionario_cpf,
        tipo,
        valor,
      });

      return res.status(200).json(beneficioUpdated);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const beneficioRepository = appDataSource.getRepository(
      'BeneficioAssalariado'
    );

    try {
      const beneficio = await beneficioRepository.findOneBy({ id });

      if (!beneficio) {
        return res.status(404).json({ message: 'Beneficio não encontrado' });
      }

      await beneficioRepository.delete(id);

      return res
        .status(200)
        .json({ message: 'Beneficio deletado com sucesso' });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new BeneficioAssalariadoController();
