// import { useState } from 'react'
// import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import TopBar from './layouts/TopBar'
import Dashboard from './pages/Dashboard.tsx'
import Services from './pages/Services.tsx'
import Employee from './pages/Employee.tsx'
import Enterprises from './pages/Enterprises.tsx'
import UserRegistration from './pages/UserRegistration.tsx'
import ProtecteRoute from './components/ProtecteRoute.tsx'
import Login from './pages/Login.tsx'

function App() {
  return (
	<ThemeProvider defaultTheme="light" storageKey="segy-ui-theme">
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
	</ThemeProvider>
  )
}

export default App
