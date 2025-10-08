import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import './style.css';

const FooterService = () => {
	return (
		<div className='flex mt-5 mx-5'>
			<span className='text-sm text-gray-600 mt-2 text-nowrap'>
				Mostrando 1-6 de 142 registros
			</span>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#" isActive>1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">
							2
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">3</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			<span className='text-sm text-gray-600 mt-2 text-nowrap'>
				Itens por página:
			</span>
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='10'>10</SelectItem>
					<SelectItem value='20'>20</SelectItem>
					<SelectItem value='30'>30</SelectItem>
				</SelectContent>
			</Select>
		</div>

	);
}

export default FooterService;