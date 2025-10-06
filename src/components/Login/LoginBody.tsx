import { useEffect, useState } from 'react';
import './style.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Key, User } from 'lucide-react';
import { Password } from '@mui/icons-material';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';

const LoginBody = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();


	// const { login } = useAuth();
	// const $service = useServices();
	// const navigate = useNavigate();

	useEffect(() => {
		const loginStorage = localStorage.getItem("login");
		if (loginStorage) {
			const { email, password, rememberMe } = JSON.parse(loginStorage);
			setEmail(email);
			setPassword(password);
			setRememberMe(rememberMe);
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			// const response = await toast.promise(
			// 	$service.postAuthentication({
			// 		email,
			// 		password,
			// 		strategy: "local",
			// 	}),
			// 	{
			// 		pending: "Fazendo login...",
			// 		success: "Login realizado com sucesso 👌",
			// 		error: "Login ou senha incorretos 🤯",
			// 	}
			// );

			// if ([200, 201].includes(response.status)) {
			// 	const responseData = response.data as {
			// 		accessToken: string;
			// 		user: { id: number; email: string; name?: string };
			// 	};

			// 	const accessToken = responseData.accessToken;
			// 	const user = responseData.user;

			// 	sessionStorage.setItem("accessToken", accessToken);
			// 	await login(accessToken, user);

			// 	// Persistência do login caso o usuário marque "Remember me"
			// 	if (rememberMe) {
			// 		localStorage.setItem(
			// 			"login",
			// 			JSON.stringify({ email, password, rememberMe })
			// 		);
			// 	} else {
			// 		localStorage.removeItem("login");
			// 	}

			// 	navigate("/home");
			// }
		} catch (err) {
			console.error("Erro ao fazer login", err);
		}
	};

	return (
		<div className="max-sm:flex-3 sm:flex-2">
			{/* <ToastContainer position="top-center" hideProgressBar={true} /> */}
			<div className="login-body-Container">
				<h2 className="login-body-Title font-geist">Acesso ao Sistema</h2>

				<form className="login-body-Content" onSubmit={handleSubmit}>
					<InputGroup className='border-0 elevation-0 focus:border-0 focus:shadow-none hover:border-0 hover:shadow-none'>
						<InputGroupInput id="email" placeholder="Usuário ou E-mail" />
						<InputGroupAddon>
							<Label htmlFor="email"><User /></Label>
						</InputGroupAddon>
					</InputGroup>
					<InputGroup className='mt-5 border-0 elevation-0 focus:border-0 focus:shadow-none hover:border-0 hover:shadow-none'>
						<InputGroupInput type='password' id="password" placeholder="Senha" />
						<InputGroupAddon>
							<Label htmlFor="password"><Password /></Label>
						</InputGroupAddon>
					</InputGroup>

					<div className="login-body-rememberMeContainer">
						<div className="login-body-rememberMeCheckboxContainer">
							<Checkbox
								id="remember-me"
								checked={rememberMe}
								onCheckedChange={checked => setRememberMe(!!checked)}
							/>
							<Label
								htmlFor="remember-me"
								className="login-body-rememberMeLabel"
							>
								Lembrar de mim
							</Label>
						</div>
					</div>

					<Button type="submit" className="login-body-button" onClick={() => {navigate('/dashboard')}}>
						Acessar
					</Button>
					<Button variant="ghost" type="submit" className="mt-5">
						Esqueci minha senha
					</Button>
				</form>
				<div className="login-body-newConnectlyContainer">
					<span className="login-body-newConnectlyTitle">
						Primeiro acesso?
					</span>{" "}
					<Button variant="outline" className="login-body-newConnectlyLink">
						Solicitar cadastro
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginBody;