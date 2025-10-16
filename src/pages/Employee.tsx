// import './style.css';

import FieldsEmployee from "@/components/Employee/FieldsEmployee";
import TableEmployee from "@/components/Employee/TableEmployees";

const Employee = () => {
	return (
		<div className="mt-10 mx-10">
			<h1 className="font-bold text-3xl mb-2">
				Lista de Funcionários
			</h1>
			<p className="text-gray-500 mb-7">
				Gerencie todos os funcionários da sua empresa
			</p>
			<FieldsEmployee />
			<TableEmployee />
		</div>
	);
}

export default Employee;