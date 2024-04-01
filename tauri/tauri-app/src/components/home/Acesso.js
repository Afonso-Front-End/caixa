import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAcesso = () => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        const user = window.localStorage.getItem('token-data');
        const userData = JSON.parse(user);
    
        if (token) {
            setAuthenticated(true);
            setUserData(userData)
        } else {
            console.log("Token não encontrado");
            navigate('/login');
        }
        
    }, [navigate]);

    return {
        userData
    }
}

export default useAcesso;
