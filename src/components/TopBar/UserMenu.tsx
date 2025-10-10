import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ThemeToggle } from '../ThemeToggle';
import { Button } from '../ui/button';
import './style.css';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
}

interface UserMenuProps {
	user: User | null;
}

const UserMenu = (props: UserMenuProps) => {
	const navigate = useNavigate();
	const { toggleTheme, getIcon, getTooltip } = ThemeToggle();

	return (
		<div className='top-bar-right'>
			<div className="top-bar-divider hidden sm:block" />

			<div className="relative group">
				<Button variant="ghost" size="icon" title="Notificações" className='cursor-pointer'>
					<NotificationsNoneOutlinedIcon />
				</Button>
			</div>

			<div className="top-bar-divider hidden sm:block" />

			<Menubar className="border-0 shadow-none">
				<MenubarMenu>
					<MenubarTrigger className='cursor-pointer'>
						<Avatar>
							<AvatarImage src={`https://ui-avatars.com/api/?name=${props.user?.name || 'User'}&length=2`} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<span className='ml-2 hidden md:inline '>
							{props.user?.name}
						</span>
						<KeyboardArrowDownOutlinedIcon className="hidden sm:inline" />
					</MenubarTrigger>
					<MenubarContent>
						{/* <MenubarItem>
							New Tab <MenubarShortcut>⌘T</MenubarShortcut>
						</MenubarItem> */}
						<MenubarItem onClick={toggleTheme}>{getIcon()} Tema {getTooltip()}</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={() => {navigate('/cadastro-usuario')}}>Cadastro</MenubarItem>
						<MenubarSeparator />
						<MenubarItem onClick={() => {navigate('/')}}>Sair</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
}

export default UserMenu;