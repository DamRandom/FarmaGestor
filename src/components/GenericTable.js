import React from 'react';
import PropTypes from 'prop-types';
import '../css/table.css';

const GenericTable = ({ data, columns }) => {
  return (
    <table className="ventas-table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th className={column.className} key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} className={`columnas-${column.field.toLowerCase()}`}>
                {row[column.field]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

GenericTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired
    })
  ).isRequired
};

export default GenericTable;
