import { useLocation } from "react-router-dom";
import Dashboard from "../Dashboard";
import HomeDashboard from "../HomeDashboard";
import ConversationalDashboard from "../conversational-dashboard/ConversationalDashboard";
import { DashboardWrapperProps } from "../../../utility/types/DashboardWrapperType";
const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ conversationalWay }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let theme = searchParams.get("theme");
    if (theme === null) {
        theme = "0";
        const newUrl = `/dashboard?theme=${theme}`;
        window.history.replaceState(null, "", newUrl);
        localStorage.setItem("templateValue", "0");
        window.dispatchEvent(new Event("template-change"));
    }
    return conversationalWay ? <ConversationalDashboard /> : theme === "0" ? <HomeDashboard /> : <Dashboard />;
};

export default DashboardWrapper;
