import React, { useState, useEffect } from "react";
import johnDoe from '../../images/mugshots/john_doe.png';
import { fetchCriminalSSN, fetchCriminalLicenses } from '../../api/criminalApi';
import { LockClosedIcon } from "@heroicons/react/24/outline";
import LicenseCard from "./criminalComponents/licenseCard";
import LeftThumb from "../../images/fingerprints/leftThumb.png";
import LeftPointer from "../../images/fingerprints/leftPointer.png";
import LeftMiddle from "../../images/fingerprints/leftMiddle.png";
import LeftRing from "../../images/fingerprints/leftRing.png";
import LeftPinky from "../../images/fingerprints/leftPinky.png";
import RightThumb from "../../images/fingerprints/rightThumb.png";
import RightIndex from "../../images/fingerprints/rightIndex.png";
import RightMiddle from "../../images/fingerprints/rightMiddle.png";
import RightRing from "../../images/fingerprints/rightRing.png";
import RightPinky from "../../images/fingerprints/rightPinky.png";

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

const CriminalInformation = ({ criminal }) => {
    const [ssn, setSsn] = useState(null);
    const [licenses, setLicenses] = useState([]);
    const [loadingSSN, setLoadingSSN] = useState(false);
    const [loadingLicenses, setLoadingLicenses] = useState(false);
    const fingerprints = [LeftThumb, LeftPointer, LeftMiddle, LeftRing, LeftPinky,
        RightThumb, RightIndex, RightMiddle, RightRing, RightPinky
    ];

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
        <div className="flex flex-col flex-1">
            {/* Top PI Section */}
            <div className="flex flex-row gap-2 flex-none">
                <div className="flex-shrink-0 basis-[25%]">
                    <img src={johnDoe} alt={criminal.first_name} className="w-full h-auto max-h-full min-w-[300px] object-contain"/>
                </div>

                <div className="flex flex-row flex-1">
                    {/* Left Column of Top PI Section */}
                    <div className="flex flex-1 flex-col gap-2">
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
                        <div className="flex flex-row w-full">
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
                        <div className="flex flex-row w-full">
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
            <div className="flex flex-row flex-1 min-h-0 max-h-42 pt-2">
                <div className="flex flex-row flex-1 max-h-48 gap-3">
                    {/* Physical Appearance Section */}
                    <div className="flex basis-[45%] flex-col gap-2">
                        <div className="w-full h-10 flex items-center justify-center bg-[#224168]">
                            <span className="font-medium text-white">Physical Appearance</span>
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
                    <div className="flex flex-1 flex-col min-h-0">
                        <div className="w-full h-10 flex items-center justify-center bg-[#224168]">
                            <span className="font-medium text-white">License(s)</span>
                        </div>
                        <div className="w-full flex items-center justify-end pr-2">
                            <span className="font-medium">{`${licenses.length} licenses on file`}</span>
                        </div>
                        <div className="flex-1 min-h-0 overflow-y-auto space-y-2 w-full p-2">
                            {loadingLicenses ? (
                                <div>Loading licenses…</div>
                            ) : licenses.length > 0 ? (
                                licenses.map(lic => (
                                <LicenseCard key={lic.license_id} lic={lic} />
                                ))
                            ) : (
                                <span>N/A</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 pt-2">
                <div className="w-full h-10 flex items-center justify-center bg-[#224168]">
                    <span className="font-medium text-white">Fingerprints</span>
                </div>
                <div className="flex flex-col flex-1 w-full gap-2 mb-4">
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col basis-[25%] items-center">
                            <img src={fingerprints[0]} alt="Left Thumb Fingerprint" className="w-32 h-auto mb-2"/>
                            <div className="flex w-full justify-center">
                                <span>Left Thumb</span>
                            </div>
                        </div>
                        <div className="flex flex-col basis-[25%] items-center justify-center">
                            <img src={fingerprints[1]} alt="Left Pointer Fingerprint" className="w-32 h-auto mb-2"/>
                            <div className="mt-auto flex w-full justify-center">
                                <span>Left Pointer</span>
                            </div>
                        </div>
                        <div className="flex flex-col basis-[25%] items-center justify-center">
                            <img src={fingerprints[2]} alt="Left Middle Fingerprint" className="w-32 h-auto mb-2"/>
                            <div className="mt-auto flex w-full justify-center">
                                <span>Left Middle</span>
                            </div>
                        </div>
                        <div className="flex flex-col basis-[25%] items-center justify-center">
                            <img src={fingerprints[3]} alt="Left Ring Fingerprint" className="w-32 h-auto mb-2"/>
                            <div className="mt-auto flex w-full justify-center">
                                <span>Left Ring</span>
                            </div>
                        </div>
                        <div className="flex flex-col basis-[25%] items-center justify-center">
                            <img src={fingerprints[4]} alt="Left Pinky Fingerprint" className="w-32 h-auto mb-2"/>
                            <div className="mt-auto flex w-full justify-center">
                                <span>Left Pinky</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col basis-[25%] items-center justify-center">
                            <img src={fingerprints[5]} alt="Right Thumb Fingerprint" className="w-32 h-auto mb-2"/>
                            <div className="mt-auto flex w-full justify-center">
                                <span>Right Thumb</span>
                            </div>
                        </div>
                        <div className="flex flex-col basis-[25%] items-center justify-center">
                            <img src={fingerprints[6]} alt="Right Index Fingerprint" className="w-32 h-auto mb-2"/>
                            <div className="mt-auto flex w-full justify-center">
                                <span>Right Index</span>
                            </div>
                        </div>
                        <div className="flex flex-col basis-[25%] items-center justify-center">
                            <img src={fingerprints[7]} alt="Right Middle Fingerprint" className="w-32 h-auto mb-2"/>
                            <div className="mt-auto flex w-full justify-center">
                                <span>Right Middle</span>
                            </div>
                        </div>
                        <div className="flex flex-col basis-[25%] items-center justify-center">
                            <img src={fingerprints[8]} alt="Right Ring Fingerprint" className="w-32 h-auto mb-2"/>
                            <div className="mt-auto flex w-full justify-center">
                                <span>Right Ring</span>
                            </div>
                        </div>
                        <div className="flex flex-col basis-[25%] items-center justify-center">
                            <img src={fingerprints[9]} alt="Right Pinky Fingerprint" className="w-32 h-auto mb-2"/>
                            <div className="mt-auto flex w-full justify-center">
                                <span>Right Pinky</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CriminalInformation;