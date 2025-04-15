import React, { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

function CriminalTable({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentRecords = data.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(data.length / recordsPerPage);
    
    console.log("Current Records:", currentRecords);
   
    return (
        <div>
            <div className="overflow-y-auto max-h-[320px] border rounded">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Name</th>
                        <th className="py-2 px-4 border-b text-left">Age</th>
                        <th className="py-2 px-4 border-b text-left">Date Entered</th>
                        <th className="py-2 px-4 border-b text-left">Last Updated</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentRecords.map((criminal) => (
                        <tr key={criminal.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{criminal.name}</td>
                        <td className="py-2 px-4 border-b">{criminal.age}</td>
                        <td className="py-2 px-4 border-b">{criminal.dateEntered || "N/A"}</td>
                        <td className="py-2 px-4 border-b">{criminal.lastUpdated || "N/A"}</td>
                        <td className="py-2 px-4 border-b">
                            <button className="text-blue-600 hover:underline text-sm">
                            View
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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
                        {[10, 15, 20].map((n) => (
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

export default CriminalTable;