import { useState } from 'react';
import './style.css';
import CenterButtons from '@/components/TopBar/CenterButtons';
import UserMenu from '@/components/TopBar/UserMenu';
import TitleSide from '@/components/TopBar/TitleSide';
import { useTheme } from '@/hook/useTheme';
import { cn } from '@/lib/utils';

interface TopBarProps {
	children: React.ReactNode;
}

export interface User {
	name: string;
}

const TopBar = (props: TopBarProps) => {
  const [user] = useState<User | null>({ name: "Brian Ferreira" });
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-600" : "border-gray-300";

  return (
    <div className={cn(bgColor, borderColor, "top-bar-container border-b")}>
      <div className={cn(bgColor, borderColor, "top-bar")}>
        <TitleSide />
        <CenterButtons />
        <UserMenu user={user} />
      </div>
      {props.children}
    </div>
  );
};


export default TopBar;