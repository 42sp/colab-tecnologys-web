import { useState } from 'react';
import './style.css';
import CenterButtons from '@/components/TopBar/CenterButtons';
import UserMenu from '@/components/TopBar/UserMenu';
import TitleSide from '@/components/TopBar/TitleSide';
import { cn } from '@/lib/utils';

interface TopBarProps {
	children: React.ReactNode;
}

export interface User {
	name: string;
}

const TopBar = (props: TopBarProps) => {
	const [user, setUser] = useState<User | null>({name: 'Brian Ferreira'});

	return (
		<div className={cn("bg-background", "top-bar-container")}>
			<div className={cn("bg-background", "top-bar")}>
				<TitleSide />
				<CenterButtons />
				<UserMenu user={user} />
			</div>
			{props.children}
		</div>
	);
}

export default TopBar;