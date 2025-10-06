import LoginHeader from "@/components/Login/LoginHeader";
import LoginBody from "@/components/Login/LoginBody";
import LoginFooter from "@/components/Login/LoginFooter";
import "./style.css";

const ScreenLogin = () => {
	return (
		<div className="pages-login-container">
			<LoginHeader />
			<LoginBody />
			<LoginFooter />
		</div>
	);
};

export default ScreenLogin;