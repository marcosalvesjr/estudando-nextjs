"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserSchema = z.object({
  name: z
    .string()
    .nonempty("Nome obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("O e-mail é obrigatírio")
    .email("Formato inválido")
    .refine((email) => {
      return email.endsWith("@tech.com.br");
    }, "Apenas e-mail da tech.com.br"),
  password: z.string().min(6, "A senha precisa conter no mínimo 6 caracteres."),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty("Titulo obrigatório"),
        knowledge: z.coerce.number().min(1).max(100),
      })
    )
    .min(2, "Insira ao menos duas tecnologias"),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

export default function Form() {
  const [output, setOutput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techs",
  });

  function createUser(data: any) {
    console.log(data);
    setOutput(JSON.stringify(data, null, 2));
  }

  function addNewTech() {
    append({ title: "", knowledge: 0 });
  }

  return (
    <div className="flex flex-col items-center justify-center mt-5 gap-2">
      <h1 className="text-emerald-500 font-bold text-3xl">
        Formulário com ZOD
      </h1>
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col justify-center"
      >
        <label className="text-start font-bold" htmlFor="">
          Nome
        </label>
        <input
          className="border border-gray-200 p-2 rounded-md"
          {...register("name")}
          placeholder="Digite seu nome"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
        <label className="text-start font-bold" htmlFor="">
          E-mail
        </label>

        <input
          className="border border-gray-200 p-2 rounded-md"
          type="email"
          placeholder="Digite o e-mail"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <label className="text-start font-bold" htmlFor="">
          Senha
        </label>
        <input
          className="border border-gray-200 p-2 rounded-md"
          type="password"
          placeholder="Digite o e-mail"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-start font-bold" htmlFor="">
            Tecnologias
          </label>
          <button onClick={addNewTech} className="text-emerald-500">
            Adicionar
          </button>
        </div>

        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <div className="flex flex-col">
                <input
                  className="border border-gray-200 p-2 rounded-md"
                  type="text"
                  placeholder="Digite a tecnologia"
                  {...register(`techs.${index}.title`)}
                />
                {errors.techs?.[index]?.title && (
                  <span className="text-red-500">
                    {errors.techs?.[index]?.title.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  className="border border-gray-200 p-2 rounded-md"
                  type="number"
                  {...register(`techs.${index}.knowledge`)}
                />
                {errors.techs?.[index]?.knowledge && (
                  <span className="text-red-500">
                    {errors.techs?.[index]?.knowledge.message}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {errors.techs && (
          <span className="text-red-500">{errors.techs.message}</span>
        )}

        <button className="bg-emerald-500 mt-2 py-1 px-4 rounded-md text-white font-bold">
          Salvar
        </button>
      </form>
      <p>{output}</p>
    </div>
  );
}
