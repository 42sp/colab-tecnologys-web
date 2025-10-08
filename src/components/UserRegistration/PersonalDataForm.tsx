import { cn } from '@/lib/utils';
import InputField from '../InputField';

const PersonalDataForm = () => {
	return (
		<div className='personal-data-form-container'>
			<h3 className={cn("text-xl font-bold bg-background")}>Dados Pessoais</h3>
			<InputField
				id='cpf'
				placeholder='000.000.000-00'
				label='CPF'
			/>
			<InputField
				id='nomecompleto'
				placeholder='Nome Completo'
				label='Nome Completo'
			/>
			<InputField
				id='telefonecelular'
				placeholder='(00) 00000-0000'
				label='Telefone Celular'
			/>
		</div>
	);
}

export default PersonalDataForm;