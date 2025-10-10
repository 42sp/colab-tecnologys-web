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

const FooterService = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-3 border-t bg-gray-50 border-gray-300 rounded-b-md shadow-sm mt-1"
      )}
    >
      {/* Texto à esquerda */}
      <p className="text-sm text-gray-600 whitespace-nowrap">
        Mostrando <span className="font-medium">1–10</span> de{" "}
        <span className="font-medium">142</span> registros
      </p>

      {/* Paginação centralizada */}
      <Pagination className="flex justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="h-8 w-8 flex items-center justify-center border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md"
            >
              <ChevronsLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="h-8 w-8 flex items-center justify-center border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              className="h-8 w-8 bg-black text-white hover:bg-gray-800 rounded-md flex items-center justify-center"
            >
              1
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              className="h-8 w-8 flex items-center justify-center border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md"
            >
              2
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              className="h-8 w-8 flex items-center justify-center border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md"
            >
              3
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              className="h-8 w-8 flex items-center justify-center border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md"
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="h-8 w-8 flex items-center justify-center border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md"
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
        <Select>
          <SelectTrigger className="w-[100px] h-8 border-gray-300 text-sm cursor-pointer">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FooterService;
