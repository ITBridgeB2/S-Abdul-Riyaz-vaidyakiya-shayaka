
import { Routes, Route } from "react-router-dom";

import HomePageComponent from './component/Home';
import RegisterPageComponent from "./component/register";
import LoginPageComponent from "./component/login";
import UserHomePageComponent from "./component/user/userHome";
import AdminDashboardComponent from "./component/Admin/adminDashboard";
import AdminHospitalComponent from "./component/Admin/adminHospitals";
import AdminManagerComponent from "./component/Admin/adminManager";
import ManagerDashboardComponent from "./component/manager/managerDashboard";
import MedicalHistoryComponent from './component/user/userMedicalRecords';
// 


function App() {
  return (
   <div>
    <Routes>
      <Route path="/" element={<HomePageComponent/>}/>
      <Route path="/register" element={<RegisterPageComponent/>}/>
      <Route path="/login" element={<LoginPageComponent/>}/>
      <Route path="/register" element={<RegisterPageComponent/>}/>
      <Route path="/userHome" element={<UserHomePageComponent/>}/>
      <Route path="/adminDashboard" element={<AdminDashboardComponent/>}/>
      <Route path="/adminHospital" element={<AdminHospitalComponent/>}/>
      <Route path="/adminManager" element={<AdminManagerComponent/>}/>
      <Route path="/managerDashboard" element={<ManagerDashboardComponent/>}/>
      <Route path="/medical-history" element={<MedicalHistoryComponent/>} />
      
    </Routes>
    </div>
  );
}

export default App;
