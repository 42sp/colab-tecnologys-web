import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import { useTheme } from '@/hook/useTheme'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (theme === 'dark') {
      return <DarkModeIcon sx={{ fontSize: 16 }} />
    } else if (theme === 'light') {
      return <LightModeIcon sx={{ fontSize: 16 }} />
    } else {
      // system theme
      return <SettingsBrightnessIcon sx={{ fontSize: 16 }} />
    }
  }

  const getTooltip = () => {
    switch (theme) {
      case 'light':
        return 'Modo claro (clique para escuro)'
      case 'dark':
        return 'Modo escuro (clique para sistema)'
      case 'system':
        return 'Modo sistema (clique para claro)'
      default:
        return 'Alternar tema'
    }
  }

  return {
		toggleTheme,
		getIcon,
		getTooltip
	}
}

export { ThemeToggle }