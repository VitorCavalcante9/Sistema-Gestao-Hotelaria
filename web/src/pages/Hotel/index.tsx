import { useFormik } from 'formik';
import { useState } from 'react';
import { ActionButtons } from '../../components/ActionButtons';
import { Input } from '../../components/Input';
import { AddOrTrashButton } from '../../components/AddOrTrashButton';

import styles from './index.module.css';
import { Button } from '../../components/Button';
import { ListItem } from '../../components/ListItem';
import { Item } from '../../components/Item';
import api from '../../services/api';

interface ISetor {
  setor: string;
}

interface IPiscina {
  tipo: string;
}

export interface IHotel {
  id: number;
  reg_imobiliario_id: string;
  nome: string;
  descricao: string;
  categoria: string;
  registro_imobiliario: {
    num_registro: string;
    metragem: number;
    descricao: string;
    logradouro: string;
    numero: number;
    cep: string;
    bairro: string;
    cidade: string;
    estado: string;
    latitude: number;
    longitude: number;
  };
  setores: ISetor[];
  piscinas: IPiscina[];
}

export const Hotel = () => {
  const [mode, setMode] = useState(0);
  const [setores, setSetores] = useState<ISetor[]>([{ setor: '' }]);
  const [piscinas, setPiscinas] = useState<IPiscina[]>([{ tipo: '' }]);
  const [hoteis, setHoteis] = useState<IHotel[]>([]);
  const [hotelId, setHotelId] = useState<number>();

  const formik = useFormik({
    initialValues: {
      nome: '',
      descricao: '',
      categoria: '',
      reg_imobiliario: {
        num_registro: '',
        metragem: 0,
        descricao: '',
        logradouro: '',
        numero: 0,
        cep: '',
        bairro: '',
        cidade: '',
        estado: '',
        latitude: 0.0,
        longitude: 0.0,
      },
    },
    onSubmit(values, { resetForm }) {
      if (mode === 0) {
        const data = {
          ...values,
          setores,
          piscinas,
        };
        api.post('hotel', data).then((res) => {
          resetForm();
          setSetores([{ setor: '' }]);
          setPiscinas([{ tipo: '' }]);
        });
      } else if (mode === 2) {
        const data = {
          ...values,
          setores,
          piscinas,
        };

        api.put(`hotel/${hotelId}`, data).then((res) => {
          resetForm();
          setSetores([{ setor: '' }]);
          setPiscinas([{ tipo: '' }]);
          listButton();
        });
      }
    },
  });

  function createButton() {
    setMode(0);
    formik.resetForm();
    setSetores([{ setor: '' }]);
    setPiscinas([{ tipo: '' }]);
  }

  function listButton() {
    setMode(1);
    api.get(`hotel`).then((res) => {
      setHoteis(res.data);
    });
  }

  function renameSetor(index: number, name: string) {
    let newSetores = setores.map((setor, i) => {
      if (index === i) return { setor: name };
      return setor;
    });
    setSetores(newSetores);
  }

  function addSetor() {
    setSetores([...setores, { setor: '' }]);
  }

  function removeSetor(index: number) {
    const filteredSetores = setores.filter((setor, i) => index !== i);
    setSetores(filteredSetores);
  }

  function renamePiscina(index: number, name: string) {
    let newPiscinas = piscinas.map((piscina, i) => {
      if (index === i) return { tipo: name };
      return piscina;
    });
    setPiscinas(newPiscinas);
  }

  function addPiscina() {
    setPiscinas([...piscinas, { tipo: '' }]);
  }

  function removePiscina(index: number) {
    const filteredPiscinas = piscinas.filter((piscina, i) => index !== i);
    setPiscinas(filteredPiscinas);
  }

  function deleteHotel(index: number | string) {
    api.delete(`hotel/${index}`).then((res) => {
      listButton();
    });
  }

  function editHotel(index: number) {
    formik.setValues({
      nome: hoteis[index].nome,
      descricao: hoteis[index].descricao,
      categoria: hoteis[index].categoria,
      reg_imobiliario: {
        num_registro: hoteis[index].reg_imobiliario_id,
        metragem: hoteis[index].registro_imobiliario.metragem,
        descricao: hoteis[index].registro_imobiliario.descricao,
        logradouro: hoteis[index].registro_imobiliario.logradouro,
        numero: hoteis[index].registro_imobiliario.numero,
        cep: hoteis[index].registro_imobiliario.cep,
        bairro: hoteis[index].registro_imobiliario.bairro,
        cidade: hoteis[index].registro_imobiliario.cidade,
        estado: hoteis[index].registro_imobiliario.estado,
        latitude: hoteis[index].registro_imobiliario.latitude,
        longitude: hoteis[index].registro_imobiliario.longitude,
      },
    });
    let filteredSetores = hoteis[index].setores.map((setor) => {
      return {
        setor: setor.setor,
      };
    });
    setSetores(filteredSetores);
    let filteredPiscinas = hoteis[index].piscinas.map((piscina) => {
      return {
        tipo: piscina.tipo,
      };
    });
    setPiscinas(filteredPiscinas);
    setHotelId(hoteis[index].id);
    setMode(2);
  }

  return (
    <>
      <ActionButtons createButton={createButton} listButton={listButton} />
      <h2 className={styles.title}>Hotel</h2>
      {mode === 1 ? (
        <div className={styles.listWrapper}>
          {hoteis.map((hotel, index) => (
            <ListItem
              handleDelete={() => deleteHotel(hotel.id)}
              handleEdit={() => editHotel(index)}
              key={hotel.id}
            >
              <Item title='Nome:' text={hotel.nome} />
              <Item title='Descição:' text={hotel.descricao} />
              <Item title='Categoria:' text={hotel.categoria} />
            </ListItem>
          ))}
        </div>
      ) : (
        <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
          <div className={styles.inputsWrapper}>
            <Input
              name='Nome'
              type='text'
              value={formik.values.nome}
              onChange={formik.handleChange('nome')}
            />
            <Input
              name='Descrição do Hotel'
              type='text'
              value={formik.values.descricao}
              onChange={formik.handleChange('descricao')}
            />
            <Input
              name='Categoria'
              type='text'
              value={formik.values.categoria}
              onChange={formik.handleChange('categoria')}
            />
            <hr className={styles.divisor} />
            <h3 className={styles.sectionTitle}>Setores</h3>
            <div className={styles.row}>
              <Input
                name=''
                type='text'
                placeholder='Nome do setor'
                value={setores[0].setor}
                onChange={(e) => renameSetor(0, e.target.value)}
              />
              {setores.length === 1 && <AddOrTrashButton onClick={addSetor} />}
            </div>
            {setores.map((setor, index) => {
              if (index !== 0)
                return (
                  <div className={styles.row} key={index}>
                    <Input
                      name=''
                      type='text'
                      placeholder='Nome do setor'
                      value={setor.setor}
                      onChange={(e) => renameSetor(index, e.target.value)}
                    />
                    <AddOrTrashButton
                      trash
                      onClick={() => removeSetor(index)}
                    />
                    {setores.length - 1 === index && (
                      <AddOrTrashButton onClick={addSetor} />
                    )}
                  </div>
                );
              return <></>;
            })}
            <hr className={styles.divisor} />
            <h3 className={styles.sectionTitle}>Piscinas</h3>
            <div className={styles.row}>
              <Input
                name=''
                placeholder='Tipo da piscina'
                type='text'
                value={piscinas[0].tipo}
                onChange={(e) => renamePiscina(0, e.target.value)}
              />
              {piscinas.length === 1 && (
                <AddOrTrashButton onClick={addPiscina} />
              )}
            </div>
            {piscinas.map((piscina, index) => {
              if (index !== 0)
                return (
                  <div className={styles.row} key={index}>
                    <Input
                      name=''
                      type='text'
                      placeholder='Tipo da piscina'
                      value={piscina.tipo}
                      onChange={(e) => renamePiscina(index, e.target.value)}
                    />
                    <AddOrTrashButton
                      trash
                      onClick={() => removePiscina(index)}
                    />
                    {piscinas.length - 1 === index && (
                      <AddOrTrashButton onClick={addPiscina} />
                    )}
                  </div>
                );
              return <></>;
            })}
            <Button isBlue style={{ marginTop: '5rem' }} type='submit'>
              Salvar
            </Button>
          </div>
          <div className={styles.inputsWrapper}>
            <Input
              name='Número Registro Imobiliário'
              type='text'
              value={formik.values.reg_imobiliario.num_registro}
              onChange={formik.handleChange('reg_imobiliario.num_registro')}
            />
            <Input
              name='Tamanho'
              type='text'
              value={formik.values.reg_imobiliario.metragem}
              onChange={formik.handleChange('reg_imobiliario.metragem')}
            />
            <Input
              name='Descrição no Registro Imobiliário'
              type='text'
              value={formik.values.reg_imobiliario.descricao}
              onChange={formik.handleChange('reg_imobiliario.descricao')}
            />
            <Input
              name='Logradouro'
              type='text'
              value={formik.values.reg_imobiliario.logradouro}
              onChange={formik.handleChange('reg_imobiliario.logradouro')}
            />
            <Input
              name='Número'
              type='number'
              value={formik.values.reg_imobiliario.numero}
              onChange={formik.handleChange('reg_imobiliario.numero')}
            />
            <Input
              name='CEP'
              type='text'
              value={formik.values.reg_imobiliario.cep}
              onChange={formik.handleChange('reg_imobiliario.cep')}
            />
            <Input
              name='Bairro'
              type='text'
              value={formik.values.reg_imobiliario.bairro}
              onChange={formik.handleChange('reg_imobiliario.bairro')}
            />
            <Input
              name='Cidade'
              type='text'
              value={formik.values.reg_imobiliario.cidade}
              onChange={formik.handleChange('reg_imobiliario.cidade')}
            />
            <Input
              name='Estado'
              type='text'
              value={formik.values.reg_imobiliario.estado}
              onChange={formik.handleChange('reg_imobiliario.estado')}
            />
            <Input
              name='Latitude'
              type='text'
              value={formik.values.reg_imobiliario.latitude}
              onChange={formik.handleChange('reg_imobiliario.latitude')}
            />
            <Input
              name='Longitude'
              type='text'
              value={formik.values.reg_imobiliario.longitude}
              onChange={formik.handleChange('reg_imobiliario.longitude')}
            />
          </div>
        </form>
      )}
    </>
  );
};
