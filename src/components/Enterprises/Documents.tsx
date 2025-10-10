import {
  UploadCloud,
  Folder,
  Search,
  FileText,
  Trash2,
  Eye,
  Download,
  Plus,
} from "lucide-react";

export default function Documents() {
  // Dados de exemplo para a tabela de documentos
  const documentsData = [
    {
      name: "Planta Baixa Térreo.pdf",
      icon: <FileText className="w-4 h-4 text-blue-600 mr-2" />,
      type: "Plantas",
      size: "2.4 MB",
      date: "12/05/2023",
      user: "Carlos Mendes",
    },
    {
      name: "Contrato Empreiteira XYZ.pdf",
      icon: <FileText className="w-4 h-4 text-blue-600 mr-2" />,
      type: "Contratos",
      size: "1.8 MB",
      date: "03/04/2023",
      user: "Rodrigo Silva",
    },
    {
      name: "Laudo Técnico Fundação.pdf",
      icon: <FileText className="w-4 h-4 text-blue-600 mr-2" />,
      type: "Laudos",
      size: "5.2 MB",
      date: "28/03/2023",
      user: "Paulo Soares",
    },
    {
      name: "Licença Ambiental.pdf",
      icon: <FileText className="w-4 h-4 text-blue-600 mr-2" />,
      type: "Licenças",
      size: "1.1 MB",
      date: "15/03/2023",
      user: "Rodrigo Silva",
    },
    {
      name: "Fotos da Obra - Março 2023",
      icon: <FileText className="w-4 h-4 text-blue-600 mr-2" />,
      type: "Outros",
      size: "8.7 MB",
      date: "10/04/2023",
      user: "João Pereira",
    },
    {
      name: "Orçamento Atualizado.xlsx",
      icon: <FileText className="w-4 h-4 text-blue-600 mr-2" />,
      type: "Outros",
      size: "1.3 MB",
      date: "05/05/2023",
      user: "Carlos Mendes",
    },
  ];

  // Lista de abas/filtros para documentos
  const filters = [
    { name: "Todos", active: true },
    { name: "Plantas", active: false },
    { name: "Contratos", active: false },
    { name: "Laudos", active: false },
    { name: "Licenças", active: false },
    { name: "Outros", active: false },
  ];

  // Mapeamento para as cores dos "tags" de tipo na tabela
  const tagColors = {
    Plantas: "bg-green-100 text-green-700",
    Contratos: "bg-blue-100 text-blue-700",
    Laudos: "bg-yellow-100 text-yellow-700",
    Licenças: "bg-indigo-100 text-indigo-700",
    Outros: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* HEADER DA PÁGINA: Título e Botão*/}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Folder className="w-6 h-6 mr-3 text-gray-700" />
          <h2 className="text-2xl font-semibold text-gray-900">Documentos</h2>
        </div>
        <button className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition cursor-pointer">
          <Plus className="w-5 h-5 mr-1" />
          Novo Documento
        </button>
      </header>

      {/* SEÇÃO 1: Área de Upload*/}
      <section className="mb-8">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50 h-96 flex flex-col items-center justify-center">
          <UploadCloud className="w-16 h-16 text-gray-400 mb-4" />

          <p className="text-xl font-medium text-gray-600 mb-2">
            Arraste arquivos para fazer upload
          </p>
          <p className="text-gray-500 mb-4 cursor-pointer">
            ou clique para selecionar arquivos
          </p>

          <button className="bg-gray-800 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition mb-3">
            Selecionar Arquivos
          </button>

          <p className="text-xs text-gray-500 mt-2">
            Formatos aceitos: PDF, DOCX, XLSX, JPG, PNG (máx. 20MB)
          </p>
        </div>
      </section>

      {/* SEÇÃO 2: Filtros e Busca*/}
      <section className="flex justify-between items-center mb-0 border-b border-gray-200">
        {/* Abas de Filtro */}
        <div className="flex gap-4">
          {filters.map((filter) => (
            <button
              key={filter.name}
              className={`py-1 text-sm font-medium transition cursor-pointer ${
                filter.active
                  ? "border-b-2 border-black text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Campo de Busca */}
        <div className="relative mb-2">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar documento"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64"
          />
        </div>
      </section>

      {/* SEÇÃO 3: Tabela de Documentos */}
      <section className="bg-white rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Cabeçalho da Tabela */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-5/12">
                Nome do Documento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                Tamanho
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                Data de Upload
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                Usuário
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12"></th>{" "}
              {/* Ações */}
            </tr>
          </thead>

          {/* Corpo da Tabela */}
          <tbody className="bg-white divide-y divide-gray-200">
            {documentsData.map((doc, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {/* Nome do Documento */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    {doc.icon}
                    {doc.name}
                  </div>
                </td>

                {/* Tipo (Tag) */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tagColors[doc.type]
                    }`}
                  >
                    {doc.type}
                  </span>
                </td>

                {/* Tamanho */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.size}
                </td>

                {/* Data de Upload */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.date}
                </td>

                {/* Usuário */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.user}
                </td>

                {/* Ações */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2 text-gray-500">
                    <button
                      title="Visualizar"
                      className="hover:text-blue-600 cursor-pointer"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      title="Baixar"
                      className="hover:text-green-600 cursor-pointer"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      title="Mais Opções"
                      className="hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
