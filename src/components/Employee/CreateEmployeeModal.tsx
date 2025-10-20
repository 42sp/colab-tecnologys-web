import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeService } from "@/services/employeeService";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { brazilianStates } from "@/utils/brazilianStates";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Formatação do telefone
const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const numbers = value.replace(/\D/g, "");
  const length = numbers.length;
  if (length <= 2) return `(${numbers}`;
  if (length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
    7,
    11
  )}`;
};

// Schema incluindo dados do user (cpf, password)
export const employeeFormSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório.")
    .max(100, "Máximo de 100 caracteres."),
  email: z.string().email("Formato de e-mail inválido."),
  password: z.string().min(6, "Senha mínima de 6 caracteres."),
  cpf: z.string().min(11, "CPF inválido").max(11, "CPF inválido"),
  date_of_birth: z.string().refine((val) => {
    const birth = new Date(val);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDif = today.getMonth() - birth.getMonth();
    return age > 18 || (age === 18 && monthDif >= 0);
  }, "O funcionário deve ter mais de 18 anos."),
  phone: z
    .string()
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Telefone inválido (mínimo 10 dígitos)"
    )
    .refine(
      (val) => val.replace(/\D/g, "").length <= 11,
      "Telefone inválido (máximo 11 dígitos)"
    ),
  address: z.string().min(3, "O endereço é obrigatório"),
  city: z.string().min(1, "A cidade é obrigatória"),
  state: z.string().min(2, "O estado é obrigatório"),
  postcode: z
    .string()
    .regex(/^[0-9]*$/, "O CEP deve conter apenas números.")
    .optional(),
  photo: z.string().optional(),
});

type FormData = z.infer<typeof employeeFormSchema>;

const CreateEmployeeModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpf: "",
      date_of_birth: "",
      phone: "",
      photo: "",
      address: "",
      city: "",
      state: "",
      postcode: "",
    },
  });

const onSubmit = async (data: FormData) => {
  setLoading(true);
  try {
    console.log("📤 Enviando dados completos do funcionário:", data);

    await employeeService.create({
      ...data,
      phone: data.phone.replace(/\D/g, ""),
      role_id: "0cc1e385-a2b4-4b3a-b1c4-014d9d1016b5",
    });

    console.log("✅ Funcionário criado com sucesso!");
    onSuccess();
    reset();
  } catch (err) {
    console.error("❌ Erro ao criar funcionário:", err);
  } finally {
    setLoading(false);
  }
};



  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatPhoneNumber(e.target.value);
      setValue("phone", formattedValue, { shouldValidate: true });
    },
    [setValue]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 py-2"
        >
          {/* GRUPO 1: INFORMAÇÕES PESSOAIS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-1">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                placeholder="Somente números"
                {...register("cpf")}
                maxLength={11}
              />
              {errors.cpf && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cpf.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <Label htmlFor="date_of_birth">Data de Nascimento</Label>
              <Input
                id="date_of_birth"
                type="date"
                {...register("date_of_birth")}
              />
              {errors.date_of_birth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date_of_birth.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                {...register("phone")}
                onChange={handlePhoneChange}
                maxLength={15}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <hr className="my-2" />

          {/* GRUPO 2: ENDEREÇO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" {...register("address")} />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" {...register("city")} />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <Label htmlFor="state">Estado</Label>
              <Select
                onValueChange={(value) =>
                  setValue("state", value, { shouldValidate: true })
                }
                defaultValue={""}
              >
                <SelectTrigger id="state">
                  <SelectValue placeholder="Selecione um estado" />
                </SelectTrigger>
                <SelectContent>
                  {brazilianStates.map((state) => (
                    <SelectItem key={state.uf} value={state.uf}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div className="col-span-1">
              <Label htmlFor="postcode">CEP (opcional)</Label>
              <Input id="postcode" {...register("postcode")} />
              {errors.postcode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.postcode.message}
                </p>
              )}
            </div>
          </div>

          {/* FOTO */}
          <div>
            <Label htmlFor="photo">Foto (URL opcional)</Label>
            <Input id="photo" {...register("photo")} />
          </div>

          {/* BOTÕES */}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              className="bg-black text-white hover:bg-gray-800"
              type="submit"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar Funcionário"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEmployeeModal;
