import React, { useEffect, useState } from "react";
import "../style/style.css";

const TableScreen = () => {
    const [tableData, setTableData] = useState([]); // storing tableData
    const [pagination, setPagination] = useState(1); // storing current page
    const rowsPerPage = 5;

    useEffect(() => {
        // Handling fetch API
        const handleFetchAPI = async () => {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
                )
                const data = await response.json();
                const ratedtableData = data.filter(
                    (project) => project["percentage.funded"] > 200
                );
                setTableData(ratedtableData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

        }
        handleFetchAPI(); // calling fetch API
    }, []);

    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    const handleChangePage = (page) => {
        setPagination(page);
    };

    const renderTableRows = () => {
        const startIndex = (pagination - 1) * rowsPerPage;
        const currentRows = tableData.slice(startIndex, startIndex + rowsPerPage);

        return currentRows.map((project, index) => (
            <tr key={index}>
                <td>{startIndex + index + 1}</td>
                <td>{project["percentage.funded"]}</td>
                <td>{project["amt.pledged"]}</td>
            </tr>
        ));
    };

    return (
        <div className="main-container">
            <h1 className="table-main-heading">Highly Rated Kickstarter Projects</h1>
            <table className="table-inner-container">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Percentage Funded</th>
                        <th>Amount Pledged</th>
                    </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handleChangePage(index + 1)}
                        className={pagination === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TableScreen;
