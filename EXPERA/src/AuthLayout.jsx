import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Loader } from './components';

function AuthLayout({ children, authentication = true }) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (!authStatus && authStatus != authentication) {
            navigate('/login');
        }
        else if (authStatus && authStatus != authentication) {
            navigate('/')
        }
        setLoading(false);
    }, [authStatus, navigate, authentication])

    return !loading ? (
        <>
            {children}
        </>
    ) : (<div><Loader /></div>)
}

export default AuthLayout
