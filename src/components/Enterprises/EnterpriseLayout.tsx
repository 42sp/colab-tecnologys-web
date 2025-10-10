// src/pages/Enterprises/EnterpriseLayout.tsx
import { NavLink, Outlet } from "react-router-dom";
import Breadcrumb from "@/components/Services/BreadcrumbService";

export default function EnterpriseLayout() {
  return (
    <div>
      <div className="mt-5 ml-5">
        <Breadcrumb />

        <h1 className="font-bold text-3xl my-5">Edição de Empreendimento</h1>
      </div>

      <div className="flex justify-center gap-6 border-b border-t border-gray-300 mb-2 bg-gray-200 w-full">
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-black pb-2 bg-white rounded-xs pt-1 px-2 font-semibold"
              : "text-gray-500 pb-2 hover:text-black font-semibold pt-1 px-2"
          }
        >
          Informações Gerais
        </NavLink>

        <NavLink
          to="andares"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-black pb-2 bg-white rounded-xs pt-1 px-2 font-semibold"
              : "text-gray-500 pb-2 hover:text-black font-semibold pt-1 px-2 "
          }
        >
          Andares e Quantitativos
        </NavLink>

        <NavLink
          to="documentos"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-black pb-2 bg-white rounded-xs pt-1 px-2 font-semibold"
              : "text-gray-500 pb-2 hover:text-black font-semibold pt-1 px-2"
          }
        >
          Documentos
        </NavLink>

        <NavLink
          to="historico"
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-black pb-2 bg-white rounded-xs pt-1 px-2 font-semibold"
              : "text-gray-500 pb-2 hover:text-black font-semibold pt-1 px-2"
          }
        >
          Histórico
        </NavLink>
      </div>

      {/* Conteúdo da aba */}
      <Outlet />
    </div>
  );
}
