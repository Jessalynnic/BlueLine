import React, { useState } from 'react';
import johnDoe from '../../images/mugshots/john_doe.png';
import janeSmith from '../../images/mugshots/jane_doe.png';
import carlosRivera from '../../images/mugshots/rivera_carlos.png';
import emilyJohnson from '../../images/mugshots/emily_johnson.png';
import marcusLee from '../../images/mugshots/marcus_lee.png';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

function CriminalGrid({ data }) {
    const mugshots = [johnDoe, janeSmith, carlosRivera, emilyJohnson, marcusLee];
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(8);
    
    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentRecords = data.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(data.length / recordsPerPage);

    return (
        <div>
            <div className="max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {currentRecords.map((criminal) => (
                    <div key={criminal.criminal_id} className="bg-white rounded-xl shadow p-4 border border-gray-200">
                        <img src={mugshots[criminal.criminal_id - 1]} alt={criminal.first_name} className="w-32 h-auto mb-2"/>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                            {criminal.first_name && criminal.last_name ? `${criminal.last_name},
                             ${criminal.first_name}`: 'N/A'}
                        </h2>
                        <p className="text-sm text-gray-600">Age: {criminal.age || "N/A"}</p>
                        <p className="text-sm text-gray-600">
                            Date Processed: {criminal.date_processed ? new Date(criminal.date_processed).toLocaleDateString() : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                            Last Updated: {criminal.last_updated ? new Date(criminal.last_updated).toLocaleDateString() : 'N/A'}
                        </p>
                        <button className="mt-3 inline-block text-blue-600 hover:underline text-sm">
                        View Record
                        </button>
                    </div>
                    ))}
                </div>
            </div>
                <div className="flex justify-between items-center mt-2 mb-2 px-4">
                    <label className="text-sm">
                        Records per page:
                        <select
                            value={recordsPerPage}
                            onChange={(e) => {
                            setRecordsPerPage(Number(e.target.value));
                            setCurrentPage(1); // reset to page 1
                            }}
                            className="ml-2 px-2 py-1 border rounded"
                        >
                            {[8, 12, 16, 20].map((n) => (
                            <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </label>
                    <div className='flex flex-row items-center justify-center gap-2'>
                        {currentPage > 1 && (
                            <div
                                onClick={() => {
                                    if (currentPage > 1) {
                                    setCurrentPage((prev) => prev - 1);
                                    }
                                }}
                            >
                                <ChevronLeftIcon className="w-4 h-4" />
                            </div>
                        )}

                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>

                        {currentPage < totalPages && (
                            <div
                                onClick={() => {
                                    if (currentPage < totalPages) {
                                    setCurrentPage((prev) => prev + 1);
                                    }
                                }}
                            >
                                <ChevronRightIcon className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                </div>
        </div>
    );
}

export default CriminalGrid;