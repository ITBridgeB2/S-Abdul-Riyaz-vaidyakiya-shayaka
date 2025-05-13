import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
// import HomePageComponent from './component/Home';
// import RegisterPageComponent from './component/register'
// import LoginPageComponent from './component/login'
// import UserHomePageComponent from './component/user/userHome';
// import AdminDashboardComponent from './component/Admin/adminDashboard';
// import AdminHospitalComponent from './component/Admin/adminHospitals';
// import AdminManagerComponent from './component/Admin/adminManager'
// import ManagerDashboardComponent from './component/manager/managerDashboard'
// import ManagerEmgMessageComponent from './component/manager/managerEmgMessages'
// import ContactPageComponent from './contact'
// import ServicesPageComponent from './service'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
   
    {/* <HomePageComponent></HomePageComponent> */}
    {/* <RegisterPageComponent></RegisterPageComponent> */}
    {/* <LoginPageComponent></LoginPageComponent> */}
    {/* <UserHomePageComponent></UserHomePageComponent> */}
    {/* <AdminDashboardComponent></AdminDashboardComponent> */}
    {/* <AdminHospitalComponent></AdminHospitalComponent> */}
    {/* <AdminManagerComponent></AdminManagerComponent> */}
    {/* <ManagerDashboardComponent></ManagerDashboardComponent> */}
    {/* <ManagerEmgMessageComponent></ManagerEmgMessageComponent> */}
    {/* <ContactPageComponent></ContactPageComponent> */}
    {/* <ServicesPageComponent></ServicesPageComponent> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
