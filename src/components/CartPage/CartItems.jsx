import React from 'react';

export default function CartItems({ item, handleQuantityChange, handleRemoveAll }) {
    return (
        <div key={item.id} className="flex items-center border p-4 rounded-md shadow-sm mb-4">
            <img src={item.image} alt={item.name} className="w-40 h-40 mr-8" />
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div className="text-left">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-4">
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
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Remove All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
