
import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

const PrintLeaveData = () => {



    const [leaveData, setLeaveData] = useState([]);
    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    console.log(token)
    const getdata = async () => {

        const res = await fetch(`/api/v1/studentProfile/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);
        if (res.status === 404) {
            console.error("404 Error: Resource not found");
            // Handle the error appropriately, e.g., display an error message to the user
        }

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setLeaveData(data.user.leave)
            console.log(leaveData)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])





    return (
        <>
            <div>
                {/* Display other components related to student profile */}
                <div>
                    <h2>Leave Data</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveData.map((leaveEntry, index) => (
                                <tr key={index}>
                                    <td>{leaveEntry.startDate}</td>
                                    <td>{leaveEntry.endDate}</td>
                                    <td>{leaveEntry.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PrintLeaveData