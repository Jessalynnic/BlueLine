const baseURL = "http://localhost:5050/api/criminals/";

export const fetchAllCriminals = async () => {
    //console.log("Executing fetchAllCriminals from API");
    const res = await fetch(`${baseURL}fetchAll`);
    if (!res.ok) {
        throw new Error(`Error ${res.status}`);
    }
    return res.json();
};

export const fetchCriminalSSN = async (id) => {
    //console.log(`Executing fetchCriminalSSN for ID ${id}`);
    const res = await fetch(`${baseURL}${id}/ssn`);
    if (!res.ok) {
        throw new Error(`Error fetching SSN (status ${res.status})`);
    }
    const { ssn } = await res.json();
    return ssn;
};

export const fetchCriminalLicenses = async (id) => {
    //console.log(`Executing fetchCriminalLicenses for ID ${id}`);
    const res = await fetch(`${baseURL}${id}/licenses`);
    if (!res.ok) {
        throw new Error(`Error fetching licenses (status ${res.status})`);
    }
    return await res.json();
};

export const fetchCriminalLanguages = async (id) => {
    console.log(`Executing fetchCriminalLanguages for ID ${id}`);
    const res = await fetch(`${baseURL}${id}/languages`);
    if (!res.ok) {
        throw new Error(`Error fetching languages (status ${res.status})`);
    }
    return await res.json();
};