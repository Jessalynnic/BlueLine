import React, { useState } from 'react';

function CriminalTable({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentRecords = data.slice(indexOfFirst, indexOfLast);
    
    console.log("Current Records:", currentRecords);
   
    return (
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
    );
}

export default CriminalTable;