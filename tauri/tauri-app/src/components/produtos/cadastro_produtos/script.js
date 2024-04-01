import { useState } from "react";
import axios from 'axios';

const useScript = () => {
    const [product_name, setProduct_name] = useState("")
    const [product_code, setProduct_code] = useState("")
    const [product_price, setProduct_price] = useState("")
    const [product_unit, setProduct_unit] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")


    const handlePriceChange = (event) => {
        const inputValue = event.target.value.replace(/[^\d]/g, '');

        const numericValue = parseFloat(inputValue);

        const formattedValue = !isNaN(numericValue) ? (numericValue / 100).toFixed(2) : '';

        setProduct_price(formattedValue);
    };

    const clear = () => {
        setProduct_code("")
        setProduct_name("")
        setProduct_price("")
        setProduct_unit("")
    }

    const handleCadastro = async (event) => {
        event.preventDefault()
        const url_base = 'http://localhost:3001/products/';
        try {
            const response = await axios.post(`${url_base}register-product`, {
                product_code,
                product_name,
                product_price,
                product_unit,
            })

            if (response.status === 201) {
                setMessage(response.data.message)
            } else {
                setMessage(response.data.message)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            clear()
        }
    }

    return {
        product_code,
        product_name,
        product_price,
        product_unit,
        setProduct_code,
        setProduct_name,
        setProduct_price,
        setProduct_unit,
        handleCadastro,
        loading,
        message,
        handlePriceChange,
    }
}

export default useScript;