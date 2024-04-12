import React, { useState, useEffect } from "react";
import "./ResultsTable.css";
import ResultModal from "./ResultModal";

const ResultsTable = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [url, setUrl] = useState("");
    const [depth, setDepth] = useState(1);

    //**********************

    const [selectedResult, setSelectedResult] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleRowClick = (result) => {
        setSelectedResult(result);
        setModalIsOpen(true);
    };

    const toggleModal = () => {
        setModalIsOpen(false);
    };

    //*********************

    useEffect(() => {
        // Replace this fetch with your actual data source
        fetch("http://localhost:8080/api/v1/results")
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const indexOfLastRecord = currentPage * 5;
    const indexOfFirstRecord = indexOfLastRecord - 5;
    const currentResults = data.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleScan = () => {
        // Replace this with your actual POST API
        const requestBody = { "url":url, "depth":depth };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        }
        fetch("http://localhost:8080/api/v1/scanregister", requestOptions)
            .then((response) => response.text())
            .then((data) => console.log("Scan result:", data))
            .catch((error) => console.error("Error scanning:", error));
    };

    return (
        <div className="ResultsTable">
            <div className="formContainer">
                <form>
                    <input
                        type="text"
                        placeholder="Enter URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <input
                        type="number"
                        min="1"
                        placeholder="Enter Depth"
                        value={depth}
                        onChange={(e) => setDepth(e.target.value)}
                    />
                    <button type="button" onClick={handleScan}>
                        Scan
                    </button>
                </form>
            </div>
            <h1>Results</h1>
            <div className="allBookmarks">All Results</div>
            <div className="tableContainer">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>URL</th>
                        <th>Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentResults.map((item) => (
                        <tr key={item.id} onClick={() => handleRowClick(item)}>
                            <td>{item.id}</td>
                            <td>{item.url}</td>
                            <td>{JSON.stringify(item.result)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                {data.length > 5 &&
                    Array.from({ length: Math.ceil(data.length / 5) }, (_, i) => i + 1).map(
                        (page) => (
                            <button
                                key={page}
                                className={`paginationButton ${currentPage === page ? "active" : ""}`}
                                onClick={() => paginate(page)}
                            >
                                {page}
                            </button>
                        )
                    )}
            </div>
            <ResultModal isOpen={modalIsOpen} toggle={toggleModal} result={selectedResult} />
        </div>
    );
};

export default ResultsTable;