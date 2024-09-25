import React from 'react';

export default function CartItems({ item, handleQuantityChange, handleRemoveAll }) {
    return (
        <div key={item.id} className="flex flex-col md:flex-row items-center border p-4 rounded-md shadow-sm mb-4">
            <img src={item.image} alt={item.name} className="w-full h-40 md:w-40 md:h-40 mb-4 md:mb-0 md:mr-8 object-cover" />
            <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="text-left mb-2 md:mb-0">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p>Quantity:</p>
                        <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            className="w-16 text-center border rounded-md p-1"
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                        />
                        <button
                            onClick={() => handleRemoveAll(item.id)}
                            className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                        >
                            Remove All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
