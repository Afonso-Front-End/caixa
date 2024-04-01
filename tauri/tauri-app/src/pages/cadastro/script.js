import React, { useState } from 'react';
import axios from 'axios';

const useScript = () => {
    const url_base = 'http://localhost:3001/'

    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [usercpf, setUsercpf] = useState('');
    const [type, setType] = useState("")
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
        setUseremail("")
        setUsercpf("")
        setType("")
    }

    const handleCadastro = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`${url_base}cadastro`, {
                username,
                useremail,
                usercpf,
                role: type,
            });

            if (response.status === 201) {
                setSucess(response.data.message)
                clear()
                return
            } else {
                setErro(response.data.message)
                return
            }

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        } finally {
            setLoading(false)
        }
    };

    return {
        setUsername,
        setUseremail,
        setUsercpf,
        username,
        useremail,
        usercpf,
        type,
        setType,
        handleCadastro,
        handleInputChange,
        loading,
        erro,
        setErro,
        sucess,
        setSucess,
    }
}

export default useScript;