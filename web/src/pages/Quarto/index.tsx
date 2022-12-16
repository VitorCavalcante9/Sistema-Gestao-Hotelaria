import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ActionButtons } from '../../components/ActionButtons';
import { Input } from '../../components/Input';
import { AddOrTrashButton } from '../../components/AddOrTrashButton';

import styles from './index.module.css';
import { Button } from '../../components/Button';
import { ListItem } from '../../components/ListItem';
import { Item } from '../../components/Item';
import { Select } from '../../components/Select';
import api from '../../services/api';
import { IHotel } from '../Hotel';

interface IAmenidade {
  tipo: string;
  descricao: string;
}

export interface IQuarto {
  id: number;
  hotel_id: number;
  status: string;
  preco: number;
  descricao: string;
  tamanho: number;
  status_limpeza: string;
  capacidade: number;
  tipo_acomodacao: string;
  politicas_uso: string;
  amenidades: IAmenidade[];
  hotel: {
    nome: string;
    categoria: string;
  };
}

export const Quarto = () => {
  const [mode, setMode] = useState(0);
  const [amenidades, setAmenidades] = useState<IAmenidade[]>([
    { tipo: '', descricao: '' },
  ]);
  const [hoteis, setHoteis] = useState<IHotel[]>([]);
  const [quartos, setQuartos] = useState<IQuarto[]>([]);
  const [quartoId, setQuartoId] = useState<number>();

  const formik = useFormik({
    initialValues: {
      hotel_id: -1,
      status: '',
      preco: 0.0,
      descricao: '',
      tamanho: 0,
      status_limpeza: '',
      tipo_acomodacao: '',
      politicas_uso: '',
      capacidade: 0,
    },
    onSubmit(values, { resetForm }) {
      if (mode === 0) {
        const data = {
          ...values,
          amenidades,
        };

        api.post('quarto', data).then((res) => {
          resetForm();
          setAmenidades([{ tipo: '', descricao: '' }]);
        });
      } else if (mode === 2) {
        const data = {
          ...values,
          amenidades,
        };

        api.put(`quarto/${quartoId}`, data).then((res) => {
          resetForm();
          setAmenidades([{ tipo: '', descricao: '' }]);
          listButton();
        });
      }
    },
  });

  useEffect(() => {
    api.get('hotel').then((res) => {
      setHoteis(res.data);
      if (res.data && res.data[0]) selectHotel(res.data[0].id);
    });
  }, []);

  function createButton() {
    setMode(0);
    formik.resetForm();
    setAmenidades([{ tipo: '', descricao: '' }]);
  }

  function listButton() {
    setMode(1);
    api.get('quarto').then((res) => {
      setQuartos(res.data);
    });
  }

  function renameAmenidadeTipo(index: number, tipo: string) {
    let newAmenidades = amenidades.map((amenidade, i) => {
      if (index === i) return { tipo: tipo, descricao: amenidade.descricao };
      return amenidade;
    });
    setAmenidades(newAmenidades);
  }

  function renameAmenidadeDesc(index: number, desc: string) {
    let newAmenidades = amenidades.map((amenidade, i) => {
      if (index === i) return { tipo: amenidade.tipo, descricao: desc };
      return amenidade;
    });
    setAmenidades(newAmenidades);
  }

  function addAmenidade() {
    setAmenidades([...amenidades, { tipo: '', descricao: '' }]);
  }

  function removeAmenidade(index: number) {
    const filteredAmenidades = amenidades.filter((_, i) => index !== i);
    setAmenidades(filteredAmenidades);
  }

  function selectHotel(value: string) {
    formik.setFieldValue('hotel_id', Number(value));
  }

  function deleteQuarto(index: number | string) {
    api.delete(`quarto/${index}`).then((res) => {
      listButton();
    });
  }

  function editQuarto(index: number) {
    formik.setValues({
      hotel_id: quartos[index].hotel_id,
      status: quartos[index].status,
      preco: quartos[index].preco,
      descricao: quartos[index].descricao,
      tamanho: quartos[index].tamanho,
      status_limpeza: quartos[index].status_limpeza,
      capacidade: quartos[index].capacidade,
      tipo_acomodacao: quartos[index].tipo_acomodacao,
      politicas_uso: quartos[index].politicas_uso,
    });
    let filteredAmenidades = quartos[index].amenidades.map((amenidade) => {
      return {
        tipo: amenidade.tipo,
        descricao: amenidade.descricao,
      };
    });
    setAmenidades(filteredAmenidades);
    setQuartoId(quartos[index].id);
    setMode(2);
  }

  return (
    <>
      <ActionButtons createButton={createButton} listButton={listButton} />
      <h2 className={styles.title}>Quartos</h2>
      {mode === 1 ? (
        <div className={styles.listWrapper}>
          {quartos.map((quarto, index) => (
            <ListItem
              handleDelete={() => deleteQuarto(quarto.id)}
              handleEdit={() => editQuarto(index)}
              key={quarto.id}
            >
              <div style={{ alignItems: 'flex-start' }} className={styles.row}>
                <div className={styles.block}>
                  <Item title='Nome do Hotel:' text={quarto.hotel.nome} />
                  <Item
                    title='Tipo de acomodação:'
                    text={quarto.tipo_acomodacao}
                  />
                  <Item title='Descrição:' text={quarto.descricao} />
                  <Item title='Status:' text={quarto.status} />
                  <Item title='Preço:' text={quarto.preco.toFixed(0.2)} />
                  <Item title='Tamanho:' text={quarto.tamanho.toString()} />
                  <Item
                    title='Capacidade:'
                    text={quarto.capacidade.toString()}
                  />
                  <Item
                    title='Status de Limpeza:'
                    text={quarto.status_limpeza}
                  />
                  <Item title='Políticas de uso:' text={quarto.politicas_uso} />
                </div>
                <div className={styles.block}>
                  <h3
                    style={{ marginBottom: '1.5rem' }}
                    className={styles.sectionTitle}
                  >
                    Amenidades
                  </h3>
                  {quarto.amenidades.map((amenidade) => (
                    <>
                      <Item title='Tipo de amenidade:' text={amenidade.tipo} />
                      <Item title='Descrição:' text={amenidade.descricao} />
                      <hr
                        style={{ marginBottom: '1.5rem' }}
                        className={styles.divisor}
                      />
                    </>
                  ))}
                </div>
              </div>
            </ListItem>
          ))}
        </div>
      ) : (
        <>
          <Select
            name='hotel'
            label='Selecione um hotel'
            value={formik.values.hotel_id ?? ''}
            options={hoteis.map((hotel) => {
              return {
                label: `${hotel.nome}, ${hotel.categoria}`,
                value: hotel.id.toString(),
              };
            })}
            onChange={(e) => selectHotel(e.target.value)}
            disabled={mode === 2}
          />
          <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
            <div className={styles.inputsWrapper}>
              <Input
                name='Descrição'
                type='text'
                value={formik.values.descricao}
                onChange={formik.handleChange('descricao')}
              />
              <Input
                name='Preço'
                type='number'
                value={formik.values.preco}
                onChange={formik.handleChange('preco')}
              />
              <Input
                name='Tamanho'
                type='number'
                value={formik.values.tamanho}
                onChange={formik.handleChange('tamanho')}
              />
              <Input
                name='Status de Limpeza'
                type='text'
                value={formik.values.status_limpeza}
                onChange={formik.handleChange('status_limpeza')}
              />
              <Input
                name='Capacidade'
                type='number'
                value={formik.values.capacidade}
                onChange={formik.handleChange('capacidade')}
              />
              <Input
                name='Tipo de acomodação'
                type='text'
                value={formik.values.tipo_acomodacao}
                onChange={formik.handleChange('tipo_acomodacao')}
              />
              <Input
                name='Políticas de uso'
                type='text'
                value={formik.values.politicas_uso}
                onChange={formik.handleChange('politicas_uso')}
              />
              <Button isBlue style={{ marginTop: '5rem' }} type='submit'>
                Salvar
              </Button>
            </div>
            <div className={styles.inputsWrapper}>
              <h3 className={styles.sectionTitle}>Amenidades</h3>
              <div className={styles.row}>
                <div className={styles.amenidades}>
                  <Input
                    name=''
                    type='text'
                    placeholder='Tipo de amenidade'
                    value={amenidades[0].tipo}
                    onChange={(e) => renameAmenidadeTipo(0, e.target.value)}
                  />
                  <Input
                    name=''
                    type='text'
                    placeholder='Descrição da amenidade'
                    value={amenidades[0].descricao}
                    onChange={(e) => renameAmenidadeDesc(0, e.target.value)}
                  />
                </div>
                {amenidades.length === 1 && (
                  <AddOrTrashButton onClick={addAmenidade} />
                )}
              </div>
              {amenidades.map((amenidade, index) => {
                if (index !== 0)
                  return (
                    <div className={styles.row} key={index}>
                      <div className={styles.amenidades}>
                        <Input
                          name=''
                          type='text'
                          placeholder='Tipo de amenidade'
                          value={amenidade.tipo}
                          onChange={(e) =>
                            renameAmenidadeTipo(index, e.target.value)
                          }
                        />
                        <Input
                          name=''
                          type='text'
                          placeholder='Descrição da amenidade'
                          value={amenidade.descricao}
                          onChange={(e) =>
                            renameAmenidadeDesc(index, e.target.value)
                          }
                        />
                      </div>
                      <AddOrTrashButton
                        trash
                        onClick={() => removeAmenidade(index)}
                      />
                      {amenidades.length - 1 === index && (
                        <AddOrTrashButton onClick={addAmenidade} />
                      )}
                    </div>
                  );
                return <></>;
              })}
            </div>
          </form>
        </>
      )}
    </>
  );
};
