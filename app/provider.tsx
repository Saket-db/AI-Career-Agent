"use client"
import { AuthContext } from '@/context/AuthContext';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useContext } from 'react'


function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user } = useUser();
    useEffect(() => {
        user && createNewUser();
    }, [user]);

    const createNewUser = async () => {
        const result = await axios.post('/api/user');
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Provider
// Custom hook to use auth
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

