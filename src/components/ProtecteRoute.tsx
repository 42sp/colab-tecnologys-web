import TopBar from "@/layouts/TopBar";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtecteRoute = ({ children }: { children: ReactNode }) => {
	const accessToken = sessionStorage.getItem("accessToken");

	// if (!accessToken) return <Navigate to="/" replace />;

	return <TopBar>{children}</TopBar>;
};

export default ProtecteRoute;
