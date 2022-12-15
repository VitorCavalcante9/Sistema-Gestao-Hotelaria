import { Request, Response } from 'express';

import { appDataSource } from '../database';
import { RegistroImobiliario } from '../models/RegistroImobiliario';

class RegImobiliarioController {
  async store(req: Request, res: Response) {
    const {
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
    } = req.body;
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

      return res.status(201).json(regImobiliario);
    } catch (err) {
      throw new Error(err);
    }
  }

  async index(_, res: Response) {
    const regImobiliarioRepository =
      appDataSource.getRepository(RegistroImobiliario);

    const registros = await regImobiliarioRepository.find();

    return res.json(registros);
  }

  async update(req: Request, res: Response) {
    const data: {
      metragem;
      descricao;
      logradouro;
      numero;
      cep;
      bairro;
      cidade;
      estado;
      latitude;
      longitude;
    } = req.body;
    const { num_registro } = req.params;

    const regImobiliarioRepository =
      appDataSource.getRepository(RegistroImobiliario);

    try {
      const regImobiliarioData = await regImobiliarioRepository.findOneBy({
        num_registro,
      });

      const newRegImobiliarioData = {
        ...regImobiliarioData,
        data,
      };

      await regImobiliarioRepository.update(
        num_registro,
        newRegImobiliarioData
      );

      return res.json(newRegImobiliarioData);
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(req: Request, res: Response) {
    const { num_registro } = req.params;

    const regImobiliarioRepository =
      appDataSource.getRepository(RegistroImobiliario);

    try {
      await regImobiliarioRepository.delete(num_registro);
      return res.json({ message: 'Deletado' });
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new RegImobiliarioController();
