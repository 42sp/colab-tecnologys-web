import { useState } from 'react';
import PersonalDataForm from '@/components/UserRegistration/PersonalDataForm';
import AddressForm from '@/components/UserRegistration/AddressForm';
import ProfessionalInfo from '@/components/UserRegistration/ProfessionalInfo';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { cn } from '@/lib/utils';

interface UserData {
  // Dados Pessoais
  cpf: string;
  fullName: string;
  phone: string;

  // Endereço
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;

  // Informações Profissionais
  area: string;
  accessLevel: string;
  workGroups: string[];

  // Observações
  observations: string;

  // Foto
  profilePhoto?: File;
}

const UserRegistration = () => {
  const [userData, setUserData] = useState<UserData>({
    cpf: '',
    fullName: '',
    phone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    area: '',
    accessLevel: '',
    workGroups: ['Engenharia', 'Construção'],
    observations: '',
  });

  const handleDataChange = (field: keyof UserData, value: any) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Dados do usuário:', userData);
    // Aqui você implementaria a lógica de salvamento
  };

  const handleCancel = () => {
    // Lógica para cancelar/voltar
    window.history.back();
  };

  return (
    <div className={cn("m-10 p-10 shadow-sm rounded-lg border border-gray-200 bg-background h-[100vh]")}>
			<h3 className={cn("text-2xl font-bold text-primary")}>Cadastro de Usuário</h3>
			<ResizablePanelGroup
				direction="horizontal"
				className="rounded-lg"
			>
				<ResizablePanel >
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel>
							<PersonalDataForm />
						</ResizablePanel>
						<ResizableHandle />
						<ResizablePanel>
							<AddressForm />
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel>
					<ProfessionalInfo />
				</ResizablePanel>
			</ResizablePanelGroup>
			{/* <PersonalDataForm /> */}
			{/* <AddressForm /> */}
			{/* <ProfessionalInfo /> */}
    </div>
  );
};

export default UserRegistration;