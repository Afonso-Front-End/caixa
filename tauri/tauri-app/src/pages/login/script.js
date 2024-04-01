import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useScript = () => {
    const url_base = 'http://localhost:3001/'
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [usercpf, setUsercpf] = useState('');
    const [erro, setErro] = useState(null)
    const [sucess, setSucess] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleInputChange = () => {
        if (erro !== null || sucess !== null) {
            setErro('');
            setSucess('');
        }
    };

    const clear = () => {
        setUsername("")
        setUsercpf("")
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`${url_base}login`, {
                username,
                usercpf,
            });

            if (response.status === 201) {
                setSucess(response.data.message)
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('token-data', JSON.stringify(response.data.userdata));
                clear()
                navigate('/home')
                console.log(response)
                return
            } else {
                setErro(response.data.message)
                return
            }

        } catch (error) {
            console.error('Erro ao efetuar login do usuário:', error);
        } finally {
            setLoading(false)
        }
    };

    return {
        setUsername,
        setUsercpf,
        username,
        usercpf,
        handleLogin,
        handleInputChange,
        loading,
        erro,
        sucess,
    }
}

export default useScript;