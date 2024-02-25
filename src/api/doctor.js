import axios from "axios";

export const getDoctores = () => {
    return axios.get("http://127.0.0.1:8000/Doctor/Doctores");
}

export const posDoctores = (doctor) => {
    return axios.pos("http://127.0.0.1:8000/Doctor/CrearDoctor", doctor);
}

export const putDoctores = (doctor) => {
    return axios.put(`http://127.0.0.1:8000/Doctor/${doctor.id}`, doctor);
}