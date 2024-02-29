import axios from "axios";

export const getDoctores = () => {
    return axios.get("http://127.0.0.1:8000/Doctor/Doctores");
}

export const postDoctores = (doctor) => {
    return axios.post("http://127.0.0.1:8000/Doctor/CrearDoctor", doctor);
}

export const putDoctores = (doctor) => {
    return axios.put(`http://127.0.0.1:8000/Doctor/EditarDoctor/${doctor.id}`, doctor);
}