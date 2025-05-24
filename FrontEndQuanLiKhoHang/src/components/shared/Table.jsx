import React from 'react';

const Table = ({ 
  columns, 
  data, 
  emptyState, 
  startIdx = 0,
  rowClassName = "hover:bg-gray-50 transition-colors",
  ...props 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full" {...props}>
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((column, idx) => (
              <th
                key={idx}
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center">
                {emptyState}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item.id || idx} className={rowClassName}>
                {columns.map((column, colIdx) => (
                  <td key={colIdx} className="px-6 py-4">
                    {column.render ? (
                      column.render(item, startIdx + idx)
                    ) : (
                      <div className="text-sm text-gray-900">
                        {item[column.accessor]}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 