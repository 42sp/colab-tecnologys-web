import { ShieldCheck } from 'lucide-react';
import './style.css';

const LoginFooter = () => {
	return (
		<div className="login-footer-container">
			<ShieldCheck className="h-4 w-4 mr-1" color="#000000" />
			Conexão segura • v.2.5.1
		</div>
	);
};

export default LoginFooter;