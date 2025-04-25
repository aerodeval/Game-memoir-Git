import React from 'react'
const styles = {

    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid #ccc',
      borderTop: '4px solid #007BFF',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    text: {
      marginTop: '10px',
      fontSize: '16px',
      color: '#555',
    },
  };
  
export default function Loading() {
    return (
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"/>
    );
}

