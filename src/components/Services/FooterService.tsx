import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface FooterServiceProps {
  total: number;
  page: number;
  pageSize: number;
  dataLength: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

const PAGE_SIZE_OPTIONS = ["10", "20", "50", "100", "1000"];
const DEFAULT_PAGE_SIZE = 10;

const FooterService: React.FC<FooterServiceProps> = ({
  total,
  page,
  pageSize,
  dataLength,
  setPage,
  setPageSize,
}) => {

  const totalPages = Math.ceil(total / pageSize);
    const startRange = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const endRange = Math.min(page * pageSize, total);
    
    const canGoBack = page > 1;
    const canGoForward = page < totalPages;


    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (page > 3) pages.push('ellipsis');
            
            // Números ao redor da página atual
            let start = Math.max(2, page - 1);
            let end = Math.min(totalPages - 1, page + 1);
            
            if (page <= 3) end = 5;
            if (page >= totalPages - 2) start = totalPages - 4;
            
            for (let i = start; i <= end; i++) {
                if (i > 0 && i < totalPages) pages.push(i);
            }
            
            if (page < totalPages - 2) pages.push('ellipsis');
            pages.push(totalPages);
        }
        return pages.filter((p, i, arr) => p !== 'ellipsis' || arr[i-1] !== 'ellipsis');
    };

  return (
        <div
            className={cn(
                "flex items-center justify-between px-6 py-3 border-t bg-gray-50 border-gray-300 rounded-b-md shadow-sm mt-1"
            )}
        >
            {/* Texto à esquerda */}
            <p className="text-sm text-gray-600 whitespace-nowrap">
                Mostrando <span className="font-medium">{startRange}–{endRange}</span> de{" "}
                <span className="font-medium">{total}</span> registros
            </p>

            {/* Paginação centralizada */}
            <Pagination className="flex justify-center">
                <PaginationContent>
                    {/* Primeira Página */}
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => canGoBack && setPage(1)}
                            className={cn(
                                "h-8 w-8 flex items-center justify-center border border-gray-200 text-gray-600 rounded-md",
                                canGoBack ? "hover:text-black hover:bg-gray-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </PaginationLink>
                    </PaginationItem>
                    
                    {/* Página Anterior */}
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => canGoBack && setPage(page - 1)}
                            className={cn(
                                "h-8 w-8 flex items-center justify-center border border-gray-200 text-gray-600 rounded-md",
                                canGoBack ? "hover:text-black hover:bg-gray-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </PaginationLink>
                    </PaginationItem>

                    {/* Números de Página Dinâmicos */}
                    {getPageNumbers().map((p, index) => (
                        <PaginationItem key={index}>
                            {p === 'ellipsis' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    onClick={() => setPage(p as number)}
                                    isActive={p === page}
                                    className={cn(
                                        "h-8 w-8 flex items-center justify-center rounded-md text-sm cursor-pointer",
                                        p === page ? "bg-black text-white hover:bg-gray-800" : "border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100"
                                    )}
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* Próxima Página */}
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => canGoForward && setPage(page + 1)}
                            className={cn(
                                "h-8 w-8 flex items-center justify-center border border-gray-200 text-gray-600 rounded-md",
                                canGoForward ? "hover:text-black hover:bg-gray-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </PaginationLink>
                    </PaginationItem>
                    
                    {/* Última Página */}
                    <PaginationItem>
                        <PaginationLink
                            onClick={() => canGoForward && setPage(totalPages)}
                            className={cn(
                                "h-8 w-8 flex items-center justify-center border border-gray-200 text-gray-600 rounded-md",
                                canGoForward ? "hover:text-black hover:bg-gray-100 cursor-pointer" : "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

            {/* Itens por página à direita */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                    Itens por página:
                </span>
                <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
                    <SelectTrigger className="w-[100px] h-8 border-gray-300 text-sm cursor-pointer">
                        <SelectValue placeholder={String(DEFAULT_PAGE_SIZE)} />
                    </SelectTrigger>
                    <SelectContent>
                        {PAGE_SIZE_OPTIONS.map((size) => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default FooterService;