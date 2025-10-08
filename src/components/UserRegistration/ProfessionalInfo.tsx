import InputField from '../InputField';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import './style.css';
import { Plus, X } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';

const ProfessionalInfo = () => {
	return (
		<div className='professional-information-container'>
			<h3 className={cn("text-xl font-bold bg-background")}>Informações Profissionais</h3>
			<InputField
				id="area"
				label='Área'
				placeholder='Digite a área'
			/>
			{/* <Label>Nível de Acesso</Label> */}
			{/* <Select>
				<SelectTrigger className="">
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Fruits</SelectLabel>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select> */}
			<InputField
				id="nivelacesso"
				label='Nível de Acesso'
				placeholder='Digite o nível de acesso'
			/>
			<InputField
				id='grupotrabalho'
				label='Grupo de trabalho'
				placeholder='Selecione um ou mais grupos'
			/>
			<div className='flex space-x-1 mt-5'>
				<Badge
					variant="secondary"
					className={cn("bg-secondary text-primary")}
				>
					Engenharia
					<X />
				</Badge>
				<Badge
					variant="secondary"
					className={cn("bg-secondary text-primary")}
				>
					Construção
					<X />
				</Badge>
				<Badge
					variant="secondary"
					className={cn("bg-primary text-secondary")}
				>
					<Plus />
					Adicionar
				</Badge>
			</div>

			<div className="grid w-full gap-3 mt-5">
				<Label htmlFor="observacoes">Observações</Label>
				<Textarea placeholder="Adicione informações adicionais relevantes sobre este usuáiro..." id="observacoes" />
			</div>
		</div>
	);
}

export default ProfessionalInfo;