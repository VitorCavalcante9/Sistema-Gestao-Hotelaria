import { Request, Response } from 'express';

import { appDataSource } from '../database';

import { Funcionario } from '../models/Funcionario';

class FuncionarioController {
  async store(req: Request, res: Response) {
    const {
      cpf,
      hotel_id,
      nome,
      sobrenome,
      data_nascimento,
      sexo,
      salario,
      tipo_contrato,
      cargo,
      beneficios_assalariados,
      beneficios_comuns,
    } = req.body;

    const funcionarioRepository = appDataSource.getRepository(Funcionario);

    try {
      const funcionario = funcionarioRepository.create({
        cpf,
        hotel_id,
        nome,
        sobrenome,
        data_nascimento,
        sexo,
        salario,
        tipo_contrato,
        cargo,
        beneficios_assalariados,
        beneficios_comuns,
      });

      await funcionarioRepository.save(funcionario);

      return res.status(201).json(funcionario);
    } catch (err) {
      throw new Error(err);
    }
  }

  async index(req: Request, res: Response) {
    const funcionarioRepository = appDataSource.getRepository(Funcionario);

    try {
      const funcionarios = await funcionarioRepository.find({
        relations: ['beneficios_comuns', 'beneficios_assalariados'],
      });

      return res.status(200).json(funcionarios);
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(req: Request, res: Response) {
    const data: {
      cpf;
      hotel_id;
      nome;
      sobrenome;
      data_nascimento;
      sexo;
      salario;
      tipo_contrato;
      cargo;
    } = req.body;

    const { cpf } = req.params;

    const funcionarioRepository = appDataSource.getRepository(Funcionario);

    try {
      const funcionario = await funcionarioRepository.findOneBy({
        cpf,
      });

      if (!funcionario) {
        return res.status(404).json({ message: 'Funcionário não encontrado' });
      }

      funcionarioRepository.merge(funcionario, data);

      await funcionarioRepository.save(funcionario);

      return res.status(200).json(funcionario);
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(req: Request, res: Response) {
    const { cpf } = req.params;

    const funcionarioRepository = appDataSource.getRepository(Funcionario);

    try {
      const funcionario = await funcionarioRepository.findOneBy({
        cpf,
      });

      if (!funcionario) {
        return res.status(404).json({ message: 'Funcionário não encontrado' });
      }

      await funcionarioRepository.remove(funcionario);

      return res.status(204).json();
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new FuncionarioController();
