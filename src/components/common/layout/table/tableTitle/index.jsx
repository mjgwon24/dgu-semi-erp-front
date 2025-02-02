function TableTitle({ titles }) {
    return (
        <tr className="border-b border-gray-300 sticky top-0 bg-white">  
            {titles.map((title, index) => (
                <th key={index} className="px-4 py-1 border-b border-gray-300">{title}</th>
            ))}
        </tr>
    );
  }
export default TableTitle;