import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ActionButtons } from '../../components/ActionButtons';
import { Input } from '../../components/Input';

import styles from './index.module.css';
import { Button } from '../../components/Button';
import { ListItem } from '../../components/ListItem';
import { Item } from '../../components/Item';
import { Select } from '../../components/Select';
import { CheckBox } from '../../components/CheckBox';
import { IHotel } from '../Hotel';
import api from '../../services/api';
import { IQuarto } from '../Quarto';

interface IReserva {
  id: number;
  quarto_id: -1;
  hospede_cpf: '';
  data_checkin: '';
  data_checkout: '';
  preco: 0.0;
  num_quartos: 0;
  piscinas: {
    id: number;
    hotel_id: number;
    tipo: string;
  }[];
  quarto: IQuarto;
}

interface IHotelQuartos extends IHotel {
  quartos: IQuarto[];
  piscinas: {
    id: number;
    hotel_id: number;
    tipo: string;
  }[];
}

interface IPiscina {
  piscina_id: number;
}

export const Reserva = () => {
  const [mode, setMode] = useState(0);
  const [hotelId, setHotelId] = useState<number>();
  const [hoteis, setHoteis] = useState<IHotelQuartos[]>([]);
  const [hotel, setHotel] = useState<IHotelQuartos>();
  const [quartos, setQuartos] = useState<IQuarto[]>([]);
  const [reservas, setReservas] = useState<IReserva[]>([]);
  const [piscinas, setPiscinas] = useState<IPiscina[]>([]);
  const [reservaId, setReservaId] = useState<number>();

  const formik = useFormik({
    initialValues: {
      quarto_id: -1,
      hospede_cpf: '',
      data_checkin: '',
      data_checkout: '',
      preco: 0.0,
      num_quartos: 0,
    },
    onSubmit(values, { resetForm }) {
      if (mode === 0) {
        const data = {
          ...values,
          piscinas,
        };
        console.log(data);

        api.post('reserva', data).then((res) => {
          resetForm();
          setPiscinas([]);
        });
      } else if (mode === 2) {
        const data = {
          ...values,
          piscinas,
        };

        /*api.put(`reserva/${reservaId}`, data).then((res) => {
          resetForm();
          setPiscinas([]);
          listButton();
        });*/
      }
    },
  });

  useEffect(() => {
    api.get('hotel').then((res) => {
      setHoteis(res.data);
      if (res.data && res.data[0]) selectHotel(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    const quarto = quartos.find((q) => q.id === formik.values.quarto_id);
    if (quarto && formik.values.data_checkin && formik.values.data_checkout) {
      const date1 = new Date(formik.values.data_checkin);
      const date2 = new Date(formik.values.data_checkout);
      var difference_In_Time = date2.getTime() - date1.getTime();
      var difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
      const price =
        difference_In_Days * quarto.preco * formik.values.num_quartos;
      formik.setFieldValue('preco', price);
    }
  }, [
    formik.values.num_quartos,
    formik.values.quarto_id,
    formik.values.data_checkin,
    formik.values.data_checkout,
  ]);

  useEffect(() => {
    const hotel = hoteis.find((h) => h.id === hotelId);
    if (hotel) {
      setHotel(hotel);
      setQuartos(hotel?.quartos);
      selectQuarto(hotel?.quartos[0].id.toString());
    }
  }, [hotelId]);

  function createButton() {
    setMode(0);
    formik.resetForm();
  }

  function listButton() {
    setMode(1);
    api.get('reserva').then((res) => {
      setReservas(res.data);
    });
  }

  function selectHotel(value: string) {
    setHotelId(Number(value));
  }

  function selectQuarto(value: string) {
    formik.setFieldValue('quarto_id', Number(value));
  }

  function deleteReserva(index: number | string) {
    api.delete(`reserva/${index}`).then((res) => {
      listButton();
    });
  }

  function editReserva(index: number) {
    formik.setValues({
      quarto_id: reservas[index].quarto_id,
      hospede_cpf: reservas[index].hospede_cpf,
      preco: reservas[index].preco,
      data_checkin: reservas[index].data_checkin,
      data_checkout: reservas[index].data_checkout,
      num_quartos: reservas[index].num_quartos,
    });
    let filteredPiscinas = reservas[index].piscinas.map((piscina) => {
      return {
        piscina_id: piscina.id,
      };
    });
    setPiscinas(filteredPiscinas);
    setReservaId(reservas[index].id);
    setMode(2);
  }

  function selectPiscina(id: number) {
    const exists = piscinas.some((p) => p.piscina_id === id);
    if (exists) {
      const newPiscinas = piscinas.filter((p) => p.piscina_id !== id);
      setPiscinas(newPiscinas);
    } else {
      setPiscinas([...piscinas, { piscina_id: id }]);
    }
  }

  return (
    <>
      <ActionButtons createButton={createButton} listButton={listButton} />
      <h2 className={styles.title}>Reserva</h2>
      {mode === 1 ? (
        <div className={styles.listWrapper}>
          {reservas.map((reserva, index) => (
            <ListItem
              handleDelete={() => deleteReserva(reserva.id)}
              handleEdit={() => editReserva(index)}
            >
              <Item title='CPF do hóspede:' text={reserva.hospede_cpf} />
              <Item title='Quarto:' text={reserva.quarto.tipo_acomodacao} />
              <Item title='Data Check-in:' text={reserva.data_checkin} />
              <Item title='Data Check-out:' text={reserva.data_checkout} />
              <Item title='Preço:' text={reserva.preco.toFixed(0.2)} />
              <Item
                title='Número de quartos:'
                text={reserva.num_quartos.toString()}
              />
              <Item
                title='Piscinas:'
                text={reserva.piscinas
                  .map((piscina) => piscina.tipo)
                  .join(', ')}
              />
            </ListItem>
          ))}
        </div>
      ) : (
        <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
          <div className={styles.inputsWrapper}>
            <Input
              name='CPF do Hóspede'
              type='text'
              value={formik.values.hospede_cpf}
              onChange={formik.handleChange('hospede_cpf')}
            />
            <Select
              name='hotel'
              label='Selecione um hotel'
              value={hotelId}
              options={hoteis.map((hotel) => {
                return {
                  label: `${hotel.nome}, ${hotel.categoria}`,
                  value: hotel.id.toString(),
                };
              })}
              onChange={(e) => selectHotel(e.target.value)}
              style={{ marginTop: 0 }}
              disabled={mode === 2}
            />
            <Select
              name='quarto'
              label='Selecione um quarto'
              value={formik.values.quarto_id ?? ''}
              options={quartos.map((quarto) => {
                return {
                  label: `${quarto.tipo_acomodacao}, Capacidade: ${quarto.capacidade}`,
                  value: quarto.id.toString(),
                };
              })}
              onChange={(e) => selectQuarto(e.target.value)}
              style={{ marginTop: 0 }}
              disabled={mode === 2}
            />
            <Input
              name='Número de quartos'
              type='number'
              value={formik.values.num_quartos}
              onChange={formik.handleChange('num_quartos')}
            />
            <Input
              name='Preço'
              type='number'
              value={formik.values.preco}
              onChange={formik.handleChange('preco')}
              disabled
            />
            <Button isBlue style={{ marginTop: '5rem' }} type='submit'>
              Salvar
            </Button>
          </div>
          <div className={styles.inputsWrapper}>
            <Input
              name='Data de checkin'
              type='datetime-local'
              value={formik.values.data_checkin}
              onChange={formik.handleChange('data_checkin')}
            />
            <Input
              name='Data de checkout'
              type='datetime-local'
              value={formik.values.data_checkout}
              onChange={formik.handleChange('data_checkout')}
            />
            <hr className={styles.divisor} />
            <h3 className={styles.sectionTitle}>Piscinas</h3>
            {hotel?.piscinas.map((piscina) => (
              <CheckBox
                name={piscina.tipo}
                checked={piscinas.some((p) => p.piscina_id === piscina.id)}
                onClick={() => selectPiscina(piscina.id)}
              />
            ))}
          </div>
        </form>
      )}
    </>
  );
};
