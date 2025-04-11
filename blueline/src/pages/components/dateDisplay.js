import React, { useState, useEffect } from "react";

function CurrentDateDisplay() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatted = dateTime.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });

    return (
        <div className="flex text-sm text-gray-700 px-4 justify-end">
          {formatted}
        </div>
    );
}

export default CurrentDateDisplay;