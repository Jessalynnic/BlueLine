import React from "react";
import { getStatusColor } from "./statusColor";

export default function LicenseCard({ lic }) {
    const isPassport = lic.license_type === 'Passport';
    const labelBasis = isPassport ? 'basis-[75%]' : 'basis-[68%]';
    const divBasis   = isPassport ? 'basis-[30%]' : 'basis-[26%]';
    const statusColor = getStatusColor(lic.status);

    return (
        <div className="flex flex-col gap-2">
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
                <span className={`${statusColor}`}>{lic.status || "N/A"}</span>
            </div>
        </div>
    )
}