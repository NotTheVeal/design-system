import React from 'react';

const Table: React.FC<TableProps> = ({ className, headers, data }) => {
    return (
        <table className={`ps-table ${className}`}>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="ps-table-header">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="ps-table-row">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="ps-table-cell">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <style jsx>{`
                :root {
                    --ps-primary-color: #005BA6;
                    --ps-midnight-color: #002F48;
                    --ps-header-bg: var(--ps-primary-color);
                    --ps-row-default-bg: #fff;
                    --ps-row-hover-bg: #f0f0f0;
                    --ps-row-selected-bg: #e0e0e0;
                    --ps-row-striped-bg: #f9f9f9;
                    --ps-border-color: #DCDCDC;
                    --ps-header-text-color: #555;
                    --ps-cell-text-color: #222;
                    --ps-border-radius: 4px;
                    --ps-header-height: 42px;
                    --ps-row-height: 48px;
                    --ps-cell-padding-x: 16px;
                    --ps-cell-padding-y: 12px;
                    --ps-header-padding-y: 10px;
                }
                .ps-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .ps-table-header {
                    background: var(--ps-header-bg);
                    color: var(--ps-header-text-color);
                    font-size: var(--ps-typography-header-font-size);
                    font-weight: var(--ps-typography-header-font-weight);
                    height: var(--ps-header-height);
                    padding: var(--ps-header-padding-y) var(--ps-cell-padding-x);
                    text-align: left;
                }
                .ps-table-row {
                    height: var(--ps-row-height);
                }
                .ps-table-cell {
                    padding: var(--ps-cell-padding-y) var(--ps-cell-padding-x);
                    background: var(--ps-row-default-bg);
                    color: var(--ps-cell-text-color);
                    border: 1px solid var(--ps-border-color);
                }
                .ps-table-row:hover {
                    background: var(--ps-row-hover-bg);
                }
                .ps-table-row.selected {
                    background: var(--ps-row-selected-bg);
                }
                .ps-table-row:nth-child(odd) .ps-table-cell {
                    background: var(--ps-row-striped-bg);
                }
                .ps-table-cell:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(0, 147, 244, 0.3);
                }
            `}</style>
        </table>
    );
};

interface TableProps {
    className?: string;
    headers: string[];
    data: string[][];
}

export default Table;
