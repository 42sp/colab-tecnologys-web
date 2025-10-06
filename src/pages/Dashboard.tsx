// import './style.css';

import Cards from "@/components/Dashboard/Cards";
import DashboardTable from "@/components/Dashboard/DashboardTable";
import Fields from "@/components/Dashboard/Fields";

const Dashboard = () => {
	return (
		<div className="px-20">
			<Cards />
			<Fields />
			<DashboardTable />
		</div>
	);
}

export default Dashboard;