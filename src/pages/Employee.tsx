// import './style.css';

import FieldsEmployee from "@/components/Employee/FieldsEmployee";
import TableEmployee from "@/components/Employee/TableEmployee";

const Employee = () => {
	return (
		<div className="mt-10 mx-10">
			<FieldsEmployee />
			<TableEmployee />
		</div>
	);
}

export default Employee;