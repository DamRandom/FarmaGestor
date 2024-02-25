import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import UserManagement from '../components/pages/UserManagement';
import MedicineManager from '../components/pages/MedicineManager';
import PatientManagement from '../components/pages/patientManagement';
import VentasManagement from '../components/pages/SalesManagement';
import DoctorManagement from '../components/pages/doctorManagement';
import DateBookManagement from '../components/pages/dateBookManagement';





export const RouterInterno = () => {
    return (
        <>
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
