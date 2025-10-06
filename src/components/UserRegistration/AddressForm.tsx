import InputField from '../InputField';
import './style.css';

const AddressForm = () => {
	return (
		<div className='address-form-container'>
			<h3 className="text-xl font-bold text-gray-900">Endereço</h3>
			<InputField
				id="cep"
				label="CEP"
				placeholder='00000-000'
			/>
			<div className='flex space-x-1'>
				<InputField
					id="rua"
					label="Rua"
					placeholder='Digite o nome da rua'
				/>
				<InputField
					id="numero"
					label="Número"
					placeholder='Nº'
				/>
			</div>
			<InputField
				id="complemento"
				label="Complemento"
				placeholder='Apto, Bloco, Casa'
			/>
			<InputField
				id="bairro"
				label="Bairro"
				placeholder='Digite o bairro'
			/>
			<div className='flex space-x-1'>
				<InputField
					id="cidade"
					label="Cidade"
					placeholder='Digite a cidade'
				/>
				<InputField
					id="estado"
					label="Estado"
					placeholder='Digite o estado'
				/>
			</div>
		</div>
	);
}

export default AddressForm;