import { Button } from '@/components/ui/button';

function App() {

	return (
		<div className="flex flex-col justify-center min-h-screen p-4">
			<div className="w-full max-w-112 mx-auto gap-4 flex flex-col">
				<Button variant="default" size="lg" className="w-full">
					Explorar
				</Button>

				<Button variant="outline" size="lg" className="w-full">
					Descobrir Novidades
				</Button>

				<Button variant="secondary" size="lg" className="w-full">
					Ver Projetos
				</Button>

				<Button variant="ghost" size="lg" className="w-full">
					Acessar Perfil
				</Button>

			</div>
		</div>
	);
}

export default App;
