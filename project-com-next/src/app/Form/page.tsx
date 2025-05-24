"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserSchema = z.object({
  name: z
    .string()
    .nonempty()
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
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

export default function Form() {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  function createUser(data: any) {
    console.log(data);
    setOutput(JSON.stringify(data, null, 2));
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
        <label className="text-start font-bold" htmlFor="">
          E-mail
        </label>

        <input
          className="border border-gray-200 p-2 rounded-md"
          type="email"
          placeholder="Digite o e-mail"
          {...register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <label className="text-start font-bold" htmlFor="">
          Senha
        </label>
        <input
          className="border border-gray-200 p-2 rounded-md"
          type="password"
          placeholder="Digite o e-mail"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <button className="bg-emerald-500 mt-2 py-1 px-4 rounded-md text-white font-bold">
          Salvar
        </button>
      </form>
      <p>{output}</p>
    </div>
  );
}
