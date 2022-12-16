import { useFormik } from 'formik';
import { useState } from 'react';
import { ActionButtons } from '../../components/ActionButtons';
import { Input } from '../../components/Input';

import styles from './index.module.css';
import { Button } from '../../components/Button';
import { ListItem } from '../../components/ListItem';
import { Item } from '../../components/Item';
import { Select } from '../../components/Select';
import api from '../../services/api';

interface IHospede {
  cpf: string;
  nome: string;
  sobrenome: string;
  email: string;
  data_nascimento: string;
  sexo: string;
}

export const Hospede = () => {
  const [mode, setMode] = useState(0);
  const [cpf, setCpf] = useState<string>();
  const [hospedes, setHospedes] = useState<IHospede[]>([]);

  const formik = useFormik({
    initialValues: {
      cpf: '',
      nome: '',
      sobrenome: '',
      email: '',
      data_nascimento: '',
      sexo: 'M',
    },
    onSubmit(values, { resetForm }) {
      if (mode === 0) {
        api.post('hospede', values).then((res) => {
          resetForm();
        });
      } else if (mode === 2) {
        api.put(`hospede/${cpf}`, values).then((res) => {
          resetForm();
          listButton();
        });
      }
    },
  });

  function createButton() {
    setMode(0);
    formik.resetForm();
  }

  function listButton() {
    setMode(1);
    api.get('hospede').then((res) => {
      setHospedes(res.data);
    });
  }

  function selectSexo(value: string) {
    formik.setFieldValue('sexo', value);
  }

  function deleteHospede(cpf: number | string) {
    api.delete(`hospede/${cpf}`).then((res) => {
      listButton();
    });
  }

  function editHospede(index: number) {
    formik.setValues({
      cpf: hospedes[index].cpf,
      nome: hospedes[index].nome,
      sobrenome: hospedes[index].sobrenome,
      email: hospedes[index].email,
      data_nascimento: hospedes[index].data_nascimento,
      sexo: hospedes[index].sexo,
    });
    setCpf(hospedes[index].cpf);
    setMode(2);
  }

  function formatDate(date: string) {
    const numbers = date.split('-');
    return `${numbers[2]}/${numbers[1]}/${numbers[0]}`;
  }

  return (
    <>
      <ActionButtons createButton={createButton} listButton={listButton} />
      <h2 className={styles.title}>Hospede</h2>
      {mode === 1 ? (
        <div className={styles.listWrapper}>
          {hospedes.map((hospede, index) => (
            <ListItem
              handleDelete={() => deleteHospede(hospede.cpf)}
              handleEdit={() => editHospede(index)}
            >
              <Item title='CPF:' text={hospede.cpf} />
              <Item title='Nome:' text={hospede.nome} />
              <Item title='Sobrenome:' text={hospede.sobrenome} />
              <Item title='Email:' text={hospede.email} />
              <Item
                title='Data de Nascimento:'
                text={formatDate(hospede.data_nascimento)}
              />
              <Item title='Sexo:' text={hospede.sexo} />
            </ListItem>
          ))}
        </div>
      ) : (
        <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
          <div className={styles.inputsWrapper}>
            <Input
              name='CPF'
              type='text'
              value={formik.values.cpf}
              onChange={formik.handleChange('cpf')}
            />
            <Input
              name='Nome'
              type='text'
              value={formik.values.nome}
              onChange={formik.handleChange('nome')}
            />
            <Input
              name='Sobrenome'
              type='text'
              value={formik.values.sobrenome}
              onChange={formik.handleChange('sobrenome')}
            />
            <Button isBlue style={{ marginTop: '5rem' }}>
              Salvar
            </Button>
          </div>
          <div className={styles.inputsWrapper}>
            <Input
              name='Email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange('email')}
            />
            <Input
              name='Data de Nascimento'
              type='date'
              value={formik.values.data_nascimento}
              onChange={formik.handleChange('data_nascimento')}
            />
            <Select
              name='sexo'
              label='Selecione seu sexo'
              value={formik.values.sexo}
              options={[
                { label: 'Masculino', value: 'M' },
                { label: 'Feminino', value: 'F' },
                { label: 'Outro', value: 'Outro' },
              ]}
              onChange={(e) => selectSexo(e.target.value)}
              style={{ marginTop: 0 }}
            />
          </div>
        </form>
      )}
    </>
  );
};
