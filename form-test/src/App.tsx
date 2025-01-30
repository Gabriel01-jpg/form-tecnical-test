import './App.css'
import Input from './components/Input'
import CepInput from './components/InputCep'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useMutation } from './hooks/useMutation';
import { api } from './services/api';
import Spinner from './components/Spinner';
import { useQuery } from './hooks/useQuery';

import { FaTrash } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { Fragment, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export interface FormData {
  name: string;
  email: string;
  cep: string;
}

interface User {
  _id: string;
  _name: string;
  _email: string;
  _cep: string;
}

interface FormDataUpdate extends FormData {
  id: string;
}

function App() {
  const [updateId, setUpdateId] = useState<string | null>(null);

  const { data: users, isLoading: isUsersLoading, error, fetchData } = useQuery<User[]>({
    callbackFetch: async () => {
      const response = await api.get<User[]>('/users')
      return response.data;
    }
  })
  
  const { data, mutate, isLoading } = useMutation({
    callbackFetch: async (user: FormData) => {
      const response = await api.post('/users', user);
      return response.data;
    }
  })

  const { mutate: updateMutate } = useMutation({
    callbackFetch: async (user: FormDataUpdate) => {
      const response = await api.put('/users', user);
      return response.data;
    }
  })

  const schema = yup.object({
    name: yup.string().matches(/^[a-zA-Z ]+$/, 'Informe um nome sem número').required('Nome é obrigatório'),
    email: yup.string().email('Informe um email válido').required('Email é obrigatório').test('unique-email', 'Email já cadastrado', (value: string) => {
      if(!users) return true;
      if(updateId) return true;
      return !users?.some(user => user._email === value);
    }),
    cep: yup.string().min(8, "Informe um CEP com 8 dígitos.").required('CEP é obrigatório').matches(/^[0-9]+$/, 'Informe um CEP válido somente com números.')
  }).required();

  const { register, handleSubmit, formState:{ errors }, control, setValue, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    if(updateId) {
      try {
        await updateMutate({ id: updateId, ...data });
        setUpdateId(null);
        reset();
        toast.success('Usuário atualizado com sucesso');
      } catch (error: any) {
        if(error.response.data){
          toast.error(error.response.data.error);
        } else {
          toast.error('Não foi possível atualizar o usuário');
        }
      }
    } else {
      try {
        await mutate(data);
        reset();
        toast.success('Usuário cadastrado com sucesso');
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    fetchData();
  }

  const handleUpdate = async (updateId: string) =>{
    setUpdateId(updateId);
    const user = users?.find(user => user._id === updateId);
    if(!user) return;
    setValue('name', user._name);
    setValue('email', user._email);
    setValue('cep', user._cep);
    
  }

  const handleCancelUpdate = () => {
    setUpdateId(null);
    reset();
    setValue('cep', '');
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="form-container">
            {updateId && (
              <button type="button" onClick={handleCancelUpdate}>Cancelar atualização</button>
            )}
            <Input label="Nome" error={errors.name?.message} placeholder="Informe o nome"{...register('name')} />
            <Input label="Email" error={errors.email?.message} placeholder="Informe o email"  {...register('email')} />
            <CepInput control={control} setValue={setValue} />
          </div>
        </div>
        <div className="card">
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Spinner color='#FFF' size={25} />
            ) : updateId ? 'Atualizar' : 'Cadastrar'}
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CEP</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user => (
              <tr>
                <td>{user._name}</td>
                <td>{user._email}</td>
                <td>{user._cep}</td>
                <td style={{ display: 'flex', gap: '10px' }}>
                  <LuPencilLine cursor="pointer" onClick={() => handleUpdate(user._id)}/>
                  <FaTrash cursor="pointer" onClick={() => toast.info('Not implemented :(')} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <ToastContainer />
    </Fragment>
  )
}

export default App
