import { useState } from "react";
import { useForm, Controller, UseFormSetValue, set } from "react-hook-form";
import axios from "axios";
import Input from "../Input";
import { FormData } from "../../App";

interface CepInputProps {
  setValue: UseFormSetValue<FormData>
  control: any;
}

export default function CepInput({ control, setValue }: CepInputProps) {
  const [loading, setLoading] = useState(false);

  const handleCepChange = async (cep: string) => {
    const cleanedCep = cep.replace(/\D/g, "");

    if (cleanedCep.length >= 8) {
      setLoading(true);
      try {
        const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cleanedCep}`);
        setValue("cep", cleanedCep);
      } catch (error) {
        console.error("CEP não encontrado");
        setValue("cep", "");
        control.setError("cep", {
          type: "manual",
          message: "CEP não encontrado"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Controller
        name="cep"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input 
            {...field}
            label="CEP"
            name="cep"
            error={error?.message}
            placeholder="Digite seu CEP"
            maxLength={9}
            onChange={(e) => {
              field.onChange(e);
              handleCepChange(e.target.value);
            }}
            
          />
        )}
      />
      {loading && <p>Buscando endereço...</p>}
    </div>
  );
}
