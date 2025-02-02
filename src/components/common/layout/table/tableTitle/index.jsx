function TableTitle({ titles }) {
    return (
        <tr className="border-b border-gray-300 sticky top-0 bg-white px-[29px]">  
            {titles.map((title, index) => (
                <th key={index} className="border-b border-gray-300">{title}</th>
            ))}
        </tr>
    );
  }
export default TableTitle;