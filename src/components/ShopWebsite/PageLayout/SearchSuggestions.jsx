import React, { useEffect, useRef } from 'react';

export default function SearchSuggestions({ suggestions, onSuggestionClick, isFocused, searchBarRef }) {
    const suggestionsRef = useRef(null);

    const getLeftPosition = (iconLeft) => {
        const screenWidth = window.innerWidth;

        if (screenWidth < 480) {
            // Mobile
            return 0; // Align to the left of the screen
        } else {
            // Desktop
            return iconLeft;
        }
    };

    useEffect(() => {
        const updateSuggestionsPosition = () => {
            if (searchBarRef.current && suggestionsRef.current) {
                const searchRect = searchBarRef.current.getBoundingClientRect();
                const suggestionsElement = suggestionsRef.current;

                suggestionsElement.style.top = `${searchRect.bottom + 8}px`;
                suggestionsElement.style.left = `${getLeftPosition(searchRect.left)}px`;
            }
        };

        if (isFocused) {
            updateSuggestionsPosition();
            window.addEventListener('resize', updateSuggestionsPosition);
        }

        return () => {
            window.removeEventListener('resize', updateSuggestionsPosition);
        };
    }, [isFocused, searchBarRef, suggestions]);

    return (
        isFocused && suggestions.length > 0 && (
            <div className="search-suggestions" ref={suggestionsRef}>
                {suggestions.map((product) => (
                    <div 
                        key={product.id} 
                        onMouseDown={() => onSuggestionClick(product.id)} 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            padding: '8px 16px', 
                            cursor: 'pointer', 
                            borderBottom: '1px solid #ddd' 
                        }}
                    >
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            style={{ width: '80px', height: '80px', marginRight: '16px', borderRadius: '12px' }} 
                        />
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                            <div style={{ color: '#888' }}>${product.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    );
}
