import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UserManagement from '../pages/UserManagement';
import MedicineManager from '../pages/MedicineManager';
import PatientManagement from '../pages/PatientManagement';
import VentasManagement from '../pages/SalesManagement';
import DoctorManagement from '../pages/DoctorManagement';
import DateBookManagement from '../pages/DateBookManagement';
import SearchBar from '../components/SearchBar';





export const RouterInterno = () => {
    return (
        <>
        <SearchBar/>
            <Routes>
                <Route path="HomePage" element={<HomePage />} />
                <Route path="/UserManagement" element={<UserManagement />} />
                <Route path="/MedicineManagement" element={<MedicineManager />} />
                <Route path="/PatientManagement" element={<PatientManagement />} />
                <Route path="/SalesManagement" element={<VentasManagement />} />
                <Route path="/DoctorManagement" element={<DoctorManagement />} />
                <Route path="/DateBookManagement" element={<DateBookManagement />} />
                <Route path="/" element={<Navigate to="HomePage" />} />
            </Routes>
        </>
    )
}
