import { useState, useEffect } from 'react';
import './style.css';
import { Building } from 'lucide-react';
// import ApartmentIcon from '@mui/icons-material/Apartment';

const TitleSide = () => {
	const [title, setTitle] = useState('Sistema de Gestão de Obra - SEGY');
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const updateTitle = () => {
			const currentWidth = window.innerWidth;
			setWidth(currentWidth);

			if (currentWidth >= 1280) {
				setTitle('Sistema de Gestão de Obra - SEGY');
			} else if (currentWidth >= 1024) {
				setTitle('Sistema de Gestão - SEGY');
			} else if (currentWidth >= 768) {
				setTitle('Gestão de Obra');
			} else if (currentWidth >= 640) {
				setTitle('SEGY - Obras');
			} else {
				setTitle('SEGY');
			}
		};

		updateTitle();
		window.addEventListener('resize', updateTitle);

		return () => window.removeEventListener('resize', updateTitle);
	}, []);

	return (
		<div className="flex items-center">
			{width > 640 && <Building className="text-xl" />}
			<span className='ml-2 text-sm md:text-base font-semibold whitespace-nowrap'>
				{title}
			</span>
		</div>
	);
}

export default TitleSide;