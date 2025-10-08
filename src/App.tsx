import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/pages/Login";
import ProtecteRoute from "./components/ProtecteRoute";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Services from "./pages/Services";
import Enterprises from "./pages/Enterprises";
import UserRegistration from "./pages/UserRegistration";
// import ProtecteRoute from "./components/ProtecteRoute";
// import Dashboard from "./pages/Dashboard";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Login />
					}
				/>
				<Route
					path="/dashboard"
					element={
						<ProtecteRoute>
							<Dashboard />
						</ProtecteRoute>
					}
				/>
				<Route
					path="/servicos"
					element={
						<ProtecteRoute>
							<Services />
						</ProtecteRoute>
					}
				/>
				<Route
					path="/funcionarios"
					element={
						<ProtecteRoute>
							<Employee />
						</ProtecteRoute>
					}
				/>
				<Route
					path="/empreendimentos"
					element={
						<ProtecteRoute>
							<Enterprises />
						</ProtecteRoute>
					}
				/>
				<Route
					path="/cadastro-usuario"
					element={
						<ProtecteRoute>
							<UserRegistration />
						</ProtecteRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
