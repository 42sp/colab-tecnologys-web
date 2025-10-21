import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { FormMessage } from "../ui/form-message";
import { constructionService } from "@/services/constructionService";
import type { Construction } from "@/types/construction.types";
import { useConstructionsContext } from "@/contexts/ConstructionsContext";
import { brazilianStates } from "@/utils/brazilianStates";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  city: z.string().min(1, "A cidade é obrigatória"),
  state: z.string().length(2, "Selecione um estado válido (UF)"),
  address: z.string().min(1, "O endereço é obrigatório"),
  start_date: z.string().optional(),
  expected_end_date: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditModalProps {
  construction: Construction | null;
  onClose: () => void;
}

// Função auxiliar para formatar a data para 'YYYY-MM-DD' para campos input[type=date]
const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
};

const EditConstructionModal: React.FC<EditModalProps> = ({
  construction,
  onClose,
}) => {
  const { refetch } = useConstructionsContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
      state: "",
      start_date: "",
      expected_end_date: "",
    },
  });

  // Preenche o formulário
  useEffect(() => {
    if (construction) {
      reset({
        name: construction.name,
        city: construction.city,
        state: construction.state,
        address: construction.address,
        start_date: formatDate(construction.start_date),
        expected_end_date: formatDate(construction.expected_end_date),
      });
    }
  }, [construction, reset]);

  // 3. Submissão do Formulário
  const onSubmit = async (values: FormValues) => {
    if (!construction) return;

    try {
      const dataToPatch: Partial<Construction> = {
        name: values.name,
        city: values.city,
        state: values.state,
        address: values.address,
        start_date: values.start_date
          ? values.start_date
          : null,
        expected_end_date: values.expected_end_date
          ? values.expected_end_date
          : null,
      };

      console.log("ID da Construção (PATCH):", construction.id);
      console.log("Payload de Atualização (dataToPatch):", dataToPatch);

      await constructionService.patch(construction.id, dataToPatch);
      await refetch();
      onClose();
    } catch (error) {
      console.error("Falha ao atualizar construção:", error);
    }
  };

  return (
    <Dialog open={!!construction} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Editar Construção
          </DialogTitle>
          <DialogDescription className="text-sm mb-4">
            Faça alterações em {construction?.name}. Clique em salvar quando
            terminar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo Nome da Obra  */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Obra</Label>
            <Input
              id="name"
              placeholder="Nome da Construção"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">UF</Label>
              <select
                id="state"
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.state ? "border-red-500" : ""
                }`}
                {...register("state")}
              >
                <option value="" disabled>
                  UF
                </option>
                {/* Mapeamento dos estados brasileiros */}
                {brazilianStates.map((state) => (
                  <option key={state.uf} value={state.uf}>
                    {state.uf} - {state.name}
                  </option>
                ))}
              </select>
              {errors.state && (
                <FormMessage>{errors.state.message}</FormMessage>
              )}
            </div>

            {/* Campo Cidade */}
            <div className="space-y-2 col-span-2 p-1">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                placeholder="São Paulo"
                {...register("city")}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && <FormMessage>{errors.city.message}</FormMessage>}
            </div>
          </div>

          {/* Campo Endereço */}
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              placeholder="Rua Exemplo, 123"
              {...register("address")}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <FormMessage>{errors.address.message}</FormMessage>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Campo Data Início */}
            <div className="space-y-2">
              <Label htmlFor="start_date">Data Início</Label>
              <Input
                id="start_date"
                type="date"
                {...register("start_date")}
                className={errors.start_date ? "border-red-500" : ""}
              />
              {errors.start_date && (
                <FormMessage>{errors.start_date.message}</FormMessage>
              )}
            </div>

            {/* Campo Previsão Término */}
            <div className="space-y-2">
              <Label htmlFor="expected_end_date">Previsão Término</Label>
              <Input
                id="expected_end_date"
                type="date"
                {...register("expected_end_date")}
                className={errors.expected_end_date ? "border-red-500" : ""}
              />
              {errors.expected_end_date && (
                <FormMessage>{errors.expected_end_date.message}</FormMessage>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditConstructionModal;
