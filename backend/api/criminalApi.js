const baseURL = "http://localhost:5000/api/criminals/";

export const fetchAllCriminals = async () => {
    const res = await fetch(`${baseURL}fetchAll`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
};