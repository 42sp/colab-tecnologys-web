import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import CenterButtons from '@/components/TopBar/CenterButtons';
import UserMenu from '@/components/TopBar/UserMenu';
import TitleSide from '@/components/TopBar/TitleSide';
import './style.css';

interface TopBarProps {
  children: React.ReactNode;
}

const TopBar = (props: TopBarProps) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';

  // Gera as iniciais dinamicamente
  const getUserDisplayName = () => {
    if (!user || !user.name) return '';

    const names = user.name.trim().split(' ').filter(Boolean);
    const displayName =
      names.length >= 2 ? `${names[0]} ${names[1]}` : names[0];

    return `${displayName}`;
  };

  const displayName = getUserDisplayName();

  return (
    <div className={cn(bgColor, borderColor, 'top-bar-container border-b')}>
      <div className={cn(bgColor, borderColor, 'top-bar')}>
        <TitleSide />
        <CenterButtons />
        <UserMenu user={{ ...user, name: displayName }} />
      </div>
      {props.children}
    </div>
  );
};

export default TopBar;
