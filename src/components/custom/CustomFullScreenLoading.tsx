import React from 'react';

export const CustomFullScreenLoading = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            {/* El Spinner */}
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>

            {/* Texto opcional */}
            <p className="mt-4 text-lg font-medium text-white animate-pulse">
                Cargando...
            </p>
        </div>
    );
};