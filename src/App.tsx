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
import LogToggleButton from "./components/Logger/LogToggleButton.tsx";
import { LogProvider } from "./components/Logger/LogContext";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ConstructionsProvider } from "./contexts/ConstructionsContext.tsx";
import { EmployeesProvider } from "./contexts/EmployeesContext.tsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <AuthProvider>
          <LogProvider>
            <EmployeesProvider>
              <ConstructionsProvider>
                <LogToggleButton />
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
                    <Route path="servicos" element={<Services />} />
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
              </ConstructionsProvider>
            </EmployeesProvider>
          </LogProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
