// import './style.css';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { Label } from './ui/label';

export interface InputFieldProps {
	id: string;
	placeholder?: string;
	label?: string;
	className?: string;
	type?: string;
}

const InputField = (props: InputFieldProps) => {
	return (
		<InputGroup className={`border-0 hover:border-0 focus:border-0 focus:shadow-none ${props.className}`}>
			<InputGroupInput type={props.type} id={props.id} placeholder={props.placeholder} />
			<InputGroupAddon align="block-start">
				<Label htmlFor={props.id} className="text-foreground">
					{props.label}
				</Label>
			</InputGroupAddon>
		</InputGroup>
	);
}

export default InputField;