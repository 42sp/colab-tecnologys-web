import { ConstructionCard } from "@/components/Enterprises/ConstructionCard";
import { ConstructionsProvider, useConstructionsContext } from "@/contexts/ConstructionsContext";
import { Loader2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EnterpriseLayout from "@/components/Enterprises/EnterpriseLayout";
import GeneralInfo from "@/components/Enterprises/GeneralInfo";

// Componente para a Listagem com o Context
function ConstructionsList() {
  const { constructions, isLoading, error, refetch, cardData, filters, setFilters } = useConstructionsContext();
  const [search, setSearch] = useState(filters.search || "");

  const handleSearch = () => {
    setFilters({ ...filters, search: search });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Mapeamento dos dados dos cards
  const cards = [
    { label: "Total", value: cardData.total, icon: "🏠", color: "bg-gray-700" },
    { label: "Em Andamento", value: cardData.inProgress, icon: "🚧", color: "bg-blue-600" },
    { label: "Atrasadas", value: cardData.delayed, icon: "🚨", color: "bg-red-600" },
    { label: "Concluídas", value: cardData.completed, icon: "✅", color: "bg-green-600" },
  ];

  if (isLoading && constructions.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600">Carregando empreendimentos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 font-medium">❌ Erro ao carregar: {error}</p>
        <Button onClick={refetch} variant="link" className="text-red-600">Tentar Novamente</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Empreendimentos</h1>
        <p className="text-gray-500">Gerencie e acesse os detalhes de todas as construções.</p>
      </header>
      
      {/* Cards de Resumo */}
      {/* <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label} className="p-4 flex flex-col justify-between items-start border border-gray-200">
            <Badge className={`${card.color} text-white hover:${card.color} mb-2`}>{card.icon} {card.label}</Badge>
            <span className="text-3xl font-bold text-gray-900">{card.value}</span>
          </Card>
        ))}
      </div> */}

      {/* <Separator className="my-6" /> */}

      {/* Barra de Ações: Busca e Novo */}
      {/* <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-4 w-72 border-gray-300"
            />
          </div>
          <Button onClick={handleSearch} variant="secondary">Buscar</Button>
        </div> */}
        
        {/* Botão para Criar Novo Empreendimento (Assumindo rota de criação) */}
        {/* <Button className="bg-green-600 hover:bg-green-700 shadow-md text-white">
          <Plus className="w-4 h-4 mr-1" /> Novo Empreendimento
        </Button>
      </div> */}
      
      {/* <Separator /> */}

      {/* Lista de Empreendimentos (Grid de Cards) */}
      {constructions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {constructions.map((construction) => (
            <ConstructionCard key={construction.id} construction={construction} />
          ))}
        </div>
      ) : (
        <div className="text-center p-12 text-gray-500 border border-dashed rounded-lg">
          {filters.search ? (
            <p>Nenhum empreendimento encontrado para o termo "{filters.search}".</p>
          ) : (
            <p>Nenhum empreendimento cadastrado. Clique em "Novo Empreendimento" para começar.</p>
          )}
        </div>
      )}
    </div>
  );
}

// Wrapper que fornece o Contexto
export default function EnterprisesPage() {
  return (
    <ConstructionsProvider>
      <div className="container mx-auto py-8">
        <ConstructionsList />
      </div>
    </ConstructionsProvider>
  );
}