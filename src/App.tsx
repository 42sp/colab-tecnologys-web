import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtecteRoute from "./components/ProtecteRoute";
import Login from "@/pages/Login";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Services from "./pages/Services";
import Chat from "./pages/Chat";
import UserRegistration from "@/pages/UserRegistration";

import GeneralInfo from "@/components/Enterprises/GeneralInfo";
import FloorsAndQuantities from "@/components/Enterprises/FloorsAndQuantities";
import Documents from "@/components/Enterprises/Documents";
import History from "@/components/Enterprises/History";
import EnterpriseLayout from "./components/Enterprises/EnterpriseLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

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
          path="/empreendimentos/"
          element={
            <ProtecteRoute>
              <EnterpriseLayout />
            </ProtecteRoute>
          }
        >
          <Route index element={<GeneralInfo />} />
          <Route path="andares" element={<FloorsAndQuantities />} />
          <Route path="documentos" element={<Documents />} />
          <Route path="historico" element={<History />} />
        </Route>

        <Route
          path="/cadastro-usuario"
          element={
            <ProtecteRoute>
              <UserRegistration />
            </ProtecteRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtecteRoute>
              <Chat />
            </ProtecteRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
