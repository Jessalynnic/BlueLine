import React, { useState, useEffect } from "react";
import johnDoe from '../../images/mugshots/john_doe.png';
import { fetchCriminalSSN, fetchCriminalLicenses } from '../../api/criminalApi';
import { LockClosedIcon } from "@heroicons/react/24/outline";

const getCriminalSSN = async (id) => {
    try {
        const ssn = await fetchCriminalSSN(id);
        return ssn;
    } catch (err) {
      throw new Error(`Failed to load SSN: ${err.message}`);
    }
};

const getCriminalLicenses = async (id) => {
    try {
        const licenses = await fetchCriminalLicenses(id);
        return licenses;
    } catch (err) {
      throw new Error(`Failed to load SSN: ${err.message}`);
    }
};

function getStatusColor(status) {
    return {
      Valid:     'text-green-600',
      Expired:   'text-red-600',
      Suspended: 'text-yellow-600',
    }[status] || 'text-gray-500';
}

const CriminalInformation = ({ criminal }) => {
    const [ssn, setSsn] = useState(null);
    const [licenses, setLicenses] = useState([]);
    const [loadingSSN, setLoadingSSN] = useState(false);
    const [loadingLicenses, setLoadingLicenses] = useState(false);

    const eyeColor = (() => {
        const { left_eye_color: L, right_eye_color: R } = criminal;
        if (!L || !R) return 'N/A';
        if (L === R)      return L;
        return `Heterochromia (${L}, ${R})`;
    })();

    useEffect(() => {
        if (!criminal.criminal_id) return;

        const fetchSSN = async () => {
            setLoadingSSN(true);
            try {
                const masked = await getCriminalSSN(criminal.criminal_id);
                setSsn(masked);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingSSN(false);
            }
        };
        fetchSSN();
    }, [criminal.criminal_id]);

    useEffect(() => {
        if (!criminal.criminal_id) return;

        const fetchLicenses = async () => {
            setLoadingLicenses(true);
            try {
                const licenses = await getCriminalLicenses(criminal.criminal_id);
                setLicenses(licenses);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingLicenses(false);
            }
        };
        fetchLicenses();
    }, [criminal.criminal_id]);
    
    let ssnDisplay;
    if (loadingSSN) {
      ssnDisplay = <div>Loading SSN…</div>;
    } else {
      ssnDisplay = (
        <>
          <span>{ssn || "N/A"}</span>
          <LockClosedIcon className="w-5 h-5" />
        </>
      );
    }

    console.log(`Fetched licenses for id ${criminal.criminal_id}`, licenses);

    return (
        <div className="flex flex-col flex-1 min-h-0">
            {/* Top PI Section */}
            <div className="flex flex-row gap-2 flex-none h-1/2">
                <div className="flex-shrink-0 basis-[25%]">
                    <img src={johnDoe} alt={criminal.first_name} className="w-full h-auto max-h-full min-w-[300px] object-contain"/>
                </div>

                <div className="flex flex-row flex-1">
                    {/* Left Column of Top PI Section */}
                    <div className="flex flex-1 flex-col gap-2 border-2">
                        <div className="flex flex-row w-full">
                            <div className="flex w-1/2 px-3">
                                <span className="font-medium">First Name:</span>
                            </div>
                            <div className="flex w-1/2">
                                <span>{criminal.first_name || "N/A"}</span>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="flex w-1/2 px-3">
                                <span className="font-medium">Birthdate:</span>
                            </div>
                            <div className="flex w-1/2">
                                <span>
                                    {criminal.date_of_birth ? new Date(criminal.date_of_birth).toLocaleDateString() : "N/A"}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="flex w-1/2 px-3">
                                <span className="font-medium">Gender:</span>
                            </div>
                            <div className="flex w-1/2">
                                <span>{criminal.gender || "N/A"}</span>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="flex w-1/2 px-3">
                                <span className="font-medium">Age:</span>
                            </div>
                            <div className="flex w-1/2">
                                <span>{criminal.age || "N/A"}</span>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="flex w-1/2 px-3">
                                <span className="font-medium">Phone Number:</span>
                            </div>
                            <div className="flex w-1/2">
                                <span>{criminal.phone_number || "N/A"}</span>
                            </div>
                        </div>
                        <div className="flex flex-row w-full border-2">
                            <div className="flex w-1/2 px-3">
                                <span className="font-medium">Address:</span>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <p>
                                    {criminal.address_street || ''}
                                </p>
                                <p>
                                    {(criminal.address_city || '') +
                                    (criminal.address_state_province ? `, ${criminal.address_state_province}` : '') +
                                    (criminal.address_postal_code ? `, ${criminal.address_postal_code}` : '')}
                                </p>
                            </div>
                        </div>
                    
                    </div> 

                    {/* Right Column of Top PI Section */}
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex flex-row w-full">
                            <div className="flex w-1/2">
                                <span className="font-medium">Last Name:</span>
                            </div>
                            <div className="flex w-1/2">
                                <span>{criminal.last_name || "N/A"}</span>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="flex w-1/2">
                                <span className="font-medium">Sex:</span>
                            </div>
                            <div className="flex w-1/2">
                                <span>{criminal.sex || "N/A"}</span>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="flex w-1/2">
                                <span className="font-medium">Pronouns:</span>
                            </div>
                            <div className="flex w-1/2">
                                <span>{criminal.pronouns || "N/A"}</span>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="flex w-1/2">
                                <span className="font-medium">Birthplace:</span>
                            </div>
                            <div className="flex w-1/2">
                                {criminal.pob_city ? `${criminal.pob_city}, ` : ''}
                                {criminal.pob_state_province ? `${criminal.pob_state_province}, ` : ''}
                                {criminal.country_of_citizenship || 'N/A'}
                            </div>
                        </div>
                        <div className="flex flex-row w-full border-2">
                            <div className="flex w-1/2">
                                <span className="font-medium">SSN:</span>
                            </div>
                            <div className="flex fle-row w-1/2">
                                {ssnDisplay}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row h-full pt-2 border-2">
                <div className="flex flex-row flex-1 gap-3">
                    {/* Physical Appearance Section */}
                    <div className="flex basis-[45%] flex-col gap-2">
                        <div className="w-full h-10 flex items-center justify-center bg-[#224168]">
                            <span className="font-medium text-white">Physical Appearance:</span>
                        </div>
                        <div className="flex flex-row flex-1">
                            {/* Left Column of Physical Appearance Section */}
                            <div className="flex w-1/2 flex-col gap-2">
                                <div className="flex flex-row w-full">
                                    <div className="flex w-1/3 px-3">
                                        <span className="font-medium">Height:</span>
                                    </div>
                                    <div className="flex w-1/2">
                                        {criminal.height_feet ? `${criminal.height_feet}' ` : ''}
                                        {criminal.height_inches ? `${criminal.height_inches} `: ''}
                                    </div>
                                </div>
                                <div className="flex flex-row w-full">
                                    <div className="flex w-1/3 px-3">
                                        <span className="font-medium">Eye Color:</span>
                                    </div>
                                    <div className="flex w-1/2">
                                        <span>{eyeColor}</span>
                                    </div>
                                </div>
                                <div className="flex flex-row w-full">
                                    <div className="flex w-1/3 px-3">
                                        <span className="font-medium">Tattoos:</span>
                                    </div>
                                    <div className="flex w-1/2">
                                        <span>{criminal.tattoos || "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Right Column of Physical Appearance Section */}
                            <div className="flex w-1/2 flex-col gap-2">
                                <div className="flex flex-row w-full">
                                    <div className="flex basis-[40%]">
                                        <span className="font-medium">Weight:</span>
                                    </div>
                                    <div className="flex w-full">
                                        {criminal.weight_lbs ? `${criminal.weight_lbs} lbs ` : ''}
                                    </div>
                                </div>
                                <div className="flex flex-row w-full">
                                    <div className="flex basis-[40%]">
                                        <span className="font-medium">Hair Color:</span>
                                    </div>
                                    <div className="flex w-full">
                                        <span>{criminal.hair_color || "N/A"}</span>
                                    </div>
                                </div>
                                <div className="flex flex-row w-full">
                                    <div className="flex basis-[40%]">
                                        <span className="font-medium">Marks:</span>
                                    </div>
                                    <div className="flex w-full">
                                        <span>{criminal.distinguishing_marks || "N/A"}</span>
                                    </div>
                                </div>
                            </div>            
                        </div>
                    </div>

                    {/* Licenses Section */}
                    <div className="flex flex-1 flex-col">
                        <div className="w-full h-10 flex items-center justify-center bg-[#224168]">
                            <span className="font-medium text-white">License(s)</span>
                        </div>
                        <div className="w-full h-24 border-2">
                            {loadingLicenses ? (
                                <div>Loading licenses…</div>
                            ) : licenses.length > 0 ? (
                                licenses.map(lic => {
                                    const isPassport = lic.license_type === 'Passport';
                                    const labelBasis = isPassport ? 'basis-[75%]' : 'basis-[68%]';
                                    const divBasis = isPassport ? 'basis-[30%]' : 'basis-[26%]';

                                    return (
                                        <div className="flex flex-col border-2 gap-2">
                                            <div key={lic.license_id} className="w-full px-2">
                                                <span className="font-medium">License Type: </span>
                                                <span >{lic.license_type}</span>
                                            </div>
                                            <div key={lic.license_id} className="flex flex-row w-full pl-2">
                                                <div className="flex flex-row basis-[30%]">
                                                    <div className="basis-[35%] pl-2 flex items-center">
                                                        <span className="font-medium">Lic #:</span>
                                                    </div>
                                                    <div className="flex flex-1 items-center">
                                                        <span>{lic.license_number || "N/A"}</span>
                                                    </div>
                                                </div>
                                                {!isPassport && (
                                                    <div className="flex flex-row basis-[15%]">
                                                        <div className="basis-[40%] flex items-center pl-2">
                                                            <span className="font-medium">Class: </span>
                                                        </div>
                                                        <div className="flex flex-1 items-center pl-2">
                                                            <span>{lic.license_class || "N/A"}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className={`flex flex-row ${divBasis}`}>
                                                    <div className={`flex items-center pl-2 ${labelBasis}`}>
                                                        <span className="font-medium">
                                                            {isPassport ? 'Country Issued:' : 'State Issued:'}
                                                        </span>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <span>
                                                        {lic.license_type === 'Passport'
                                                            ? (lic.country_issued || 'N/A')
                                                            : (lic.state_issued   || 'N/A')}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 flex-row">
                                                    <div className="basis-[45%] flex items-center">
                                                        <span className="font-medium">Exp Date:</span>
                                                    </div>
                                                    <div className="flex flex-1 items-center">
                                                        <span>{new Date(lic.expiration_date).toLocaleDateString() || "N/A"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-row w-full items-center justify-center gap-2">
                                                <span className="font-medium">Status:</span>
                                                <span className={`${getStatusColor(lic.status)}`}>{lic.status || "N/A"}</span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <span>N/A</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CriminalInformation;