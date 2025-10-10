import { useNavigate } from 'react-router-dom';
import './style.css';
import { BotMessageSquare } from "lucide-react"
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SimCardOutlinedIcon from '@mui/icons-material/SimCardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import { Button } from '@/components/ui/button';

interface NavButtonProps {
	icon: React.ReactNode;
	text: string;
	onClick: () => void;
}

const NavButton = ({ icon, text, onClick }: NavButtonProps) => {
	return (
		<div>
			<Button
				variant="ghost"
				size="sm"
				className='top-bar-button cursor-pointer'
				onClick={onClick}
				title={text}
			>
				{icon}
				<span className='ml-2 hidden lg:inline'>{text}</span>
			</Button>

			<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 md:hidden">
				{text}
				<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
			</div>
		</div>
	);
};

const CenterButtons = () => {
	const navigate = useNavigate();

	return (
		<div className="flex space-x-1">
			<NavButton
				icon={<DashboardOutlinedIcon />}
				text="Dashboard"
				onClick={() => navigate('/dashboard')}
			/>
			<NavButton
				icon={<SimCardOutlinedIcon />}
				text="Serviços"
				onClick={() => navigate('/servicos')}
			/>
			<NavButton
				icon={<PersonOutlineOutlinedIcon />}
				text="Funcionários"
				onClick={() => navigate('/funcionarios')}
			/>
			<NavButton
				icon={<BusinessOutlinedIcon />}
				text="Empreendimentos"
				onClick={() => navigate('/empreendimentos')}
			/>

			<NavButton
				icon={<BotMessageSquare className='size-6'/>}
				text="Chat"
				onClick={() => navigate('/chat')}
			/>
		</div>
	);
}

export default CenterButtons;