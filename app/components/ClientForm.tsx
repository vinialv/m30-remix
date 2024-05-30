import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoaderCircle } from "lucide-react";

import { FormSchema } from "@/schema";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import InputDropArea from "./InputDropArea";

type FormProps = z.infer<typeof FormSchema>;
type AddressProps = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

interface FileWithName extends File {
  name: string;
}

export default function ClientForm() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileWithName[]>([]);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      preferenciaLigacao: false,
      preferenciaWhatsapp: false,
      preferenciaEmail: false,
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      complemento: "",
      cidade: "",
      estado: "",
      objetivoProjeto: "",
    },
  });

  const onSubmit = async (registro: FormProps) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("registro", JSON.stringify(registro));
    const validFiles = files.filter((file) =>
      [
        "application/pdf",
        "image/png",
        "image/jpg",
        "image/jpeg",
        "text/plain",
      ].includes(file.type)
    );
    validFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    await axios.post("/send", formData);
    setLoading(false);
    setFormSuccess(true);
  };

  const cep = watch("cep");
  const telefone = watch("telefone");

  const handleSetData = useCallback(
    (data: AddressProps) => {
      setValue("logradouro", data.logradouro);
      setValue("bairro", data.bairro);
      setValue("cidade", data.localidade);
      setValue("estado", data.uf);
    },
    [setValue]
  );

  const handleDataCep = useCallback(
    async (cep: string) => {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      handleSetData(data);
    },
    [handleSetData]
  );

  useEffect(() => {
    setValue("cep", cep.replace(/^(\d{5})(\d)/, "$1-$2"));
    if (cep.length != 9) return;
    handleDataCep(cep);
  }, [handleDataCep, cep]);

  useEffect(() => {
    const formattedTelefone = telefone
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2")
      .replace(/(\d{4})(\d{4})$/, "$1-$2");
    setValue("telefone", formattedTelefone);
  }, [telefone, setValue]);

  return (
    <>
      {!formSuccess ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 w-full max-w-96 space-y-6"
        >
          <div className="w-full flex justify-center">
            <img
              src="M30_Arquitetura.png"
              width={100}
              alt={"Imagem da logotipo da empresa M30 Arquitetura"}
            />
          </div>
          <div className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input {...register("nome")} aria-label="Nome" />
              {errors.nome?.message && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.nome?.message}
                </span>
              )}
            </div>
            <div>
              <Label>E-mail</Label>
              <Input {...register("email")} type="email" aria-label="E-mail" />
              {errors.email?.message && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div>
              <Label>Telefone</Label>
              <Input
                {...register("telefone")}
                type="tel"
                maxLength={15}
                aria-label="Telefone"
              />
              {errors.telefone?.message && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.telefone?.message}
                </span>
              )}
            </div>
            <div>
              <Label>Preferência para contato</Label>
              <div className="flex sm:mt-0 mt-2 sm:flex-row flex-col justify-between sm:justify-start sm:gap-8 gap-4">
                <div className="flex gap-2 items-center">
                  <Input
                    {...register("preferenciaLigacao")}
                    type="checkbox"
                    id="ligacao"
                    className="h-4 w-4"
                    aria-label="Ligação"
                  />
                  <label htmlFor="ligacao">Ligação</label>
                </div>
                <div className="flex gap-2 items-center ">
                  <Input
                    {...register("preferenciaWhatsapp")}
                    type="checkbox"
                    id="whatsapp"
                    className="h-4 w-4"
                    aria-label="WhatsApp"
                  />
                  <label htmlFor="whatsapp">WhatsApp</label>
                </div>
                <div className="flex gap-2 items-center">
                  <Input
                    {...register("preferenciaEmail")}
                    type="checkbox"
                    id="email"
                    className="h-4 w-4 bg-black"
                    aria-label="E-mail"
                  />
                  <label htmlFor="email" className="text-nowrap">
                    E-mail
                  </label>
                </div>
              </div>
            </div>
            <div>
              <Label>Objetivo do projeto</Label>
              <Textarea
                {...register("objetivoProjeto")}
                className="h-36"
                placeholder="Exemplo: Quero fazer o projeto da minha casa para morar, reformar apartamento para alugar, investimento, etc."
                aria-label="Objetivo do projeto"
              />
              {errors.objetivoProjeto?.message && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.objetivoProjeto?.message}
                </span>
              )}
            </div>
            <div>
              <Label>CEP do Projeto</Label>
              <Input
                {...register("cep")}
                inputMode="numeric"
                maxLength={9}
                aria-label="CEP"
              />
              {errors.cep?.message && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.cep?.message}
                </span>
              )}
            </div>
            <div>
              <Label>Logradouro</Label>
              <Input {...register("logradouro")} aria-label="Logradouro" />
              {errors.logradouro?.message && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.logradouro?.message}
                </span>
              )}
            </div>
            <div>
              <Label>Número</Label>
              <Input {...register("numero")} aria-label="Número do endereço" />
              {errors.numero?.message && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.numero?.message}
                </span>
              )}
            </div>
            <div>
              <Label>Bairro</Label>
              <Input {...register("bairro")} aria-label="Bairro" />
              {errors.bairro?.message && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.bairro?.message}
                </span>
              )}
            </div>
            <div>
              <Label>Complemento</Label>
              <Input {...register("complemento")} aria-label="Complemento" />
            </div>
            <div>
              <Label>Cidade</Label>
              <Input {...register("cidade")} aria-label="Cidade" />
              {errors.cidade?.message && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.cidade?.message}
                </span>
              )}
            </div>
            <div>
              <Label>Estado</Label>
              <Input {...register("estado")} aria-label="Estado" />
              {errors.estado?.message && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.estado?.message}
                </span>
              )}
            </div>
            <InputDropArea onFilesChange={setFiles} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Enviar"}
          </Button>
        </form>
      ) : (
        <div className="flex h-dvh w-full justify-center items-center">
          <img
            src="M30_Arquitetura.png"
            alt={"Imagem da logotipo da empresa M30 Arquitetura"}
            width={150}
            className="absolute top-8"
          />
          <p className="sm:text-3xl text-xl text-center font-lora font-light mt-8">
            Formulário enviado com sucesso!
          </p>
        </div>
      )}
    </>
  );
}
