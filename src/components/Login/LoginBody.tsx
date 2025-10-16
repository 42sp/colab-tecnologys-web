import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { User, KeyRound, Loader2 } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const LoginBody = () => {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const loginId = cpf;

    try {
      await toast.promise(login(loginId, password, rememberMe), {
        pending: "Fazendo login...",
        success: "Login realizado com sucesso 👌",
        error: "Login ou senha incorretos 🤯",
      });
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Erro ao fazer login", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-sm:flex-3 sm:flex-2">
      <div className="login-body-Container">
        <h1 className="login-body-Title font-geist mt-2">Acesso ao Sistema</h1>

        <form className="login-body-Content" onSubmit={handleSubmit}>
          <InputGroup className="border-0 elevation-0 focus:border-0 focus:shadow-none hover:border-0 hover:shadow-none">
            <InputGroupInput
              id="cpf"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              autoComplete="username"
            />
            <InputGroupAddon>
              <Label htmlFor="cpf">
                <User />
              </Label>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup className="mt-5 border-0 elevation-0 focus:border-0 focus:shadow-none hover:border-0 hover:shadow-none">
            <InputGroupInput
              type="password"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <InputGroupAddon>
              <Label htmlFor="password">
                <KeyRound />
              </Label>
            </InputGroupAddon>
          </InputGroup>

          <div className="login-body-rememberMeContainer">
            <div className="login-body-rememberMeCheckboxContainer">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked: boolean) => setRememberMe(!!checked)}
              />
              <Label
                htmlFor="remember-me"
                className="login-body-rememberMeLabel cursor-pointer"
              >
                Lembrar de mim
              </Label>
            </div>
          </div>
          <Button
            type="submit"
            className="login-body-button cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Acessar"
            )}
          </Button>
          <Button
            variant="ghost"
            type="button"
            className="mt-5 cursor-pointer shadow-md w-[400px]"
          >
            Esqueci minha senha
          </Button>
        </form>
        <div className="login-body-newConnectlyContainer">
          <span className="login-body-newConnectlyTitle">Primeiro acesso?</span>{" "}
          <Button
            variant="outline"
            className="login-body-newConnectlyLink cursor-pointer"
          >
            Solicitar cadastro
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginBody;
