

export const PriceFilter = ({selectedPrice, onChange}) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
           <select value={selectedPrice} onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : undefined          
           )}>
            <option value="">Select Max Price</option>
            {[300, 400, 500, 600, 700].map((price) => (
                <option value={price}>{price}</option>
            ))}
           </select>

        </div>
    );
  }