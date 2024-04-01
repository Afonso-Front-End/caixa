import axios from "axios";
import React, { useState, useEffect } from "react";

const useScript = () => {
    const [list, setList] = useState([]);
    const [selectProduct, setSelectProduct] = useState()
    const [confirm, setConfirm] = useState(false)
    const [message, setMessage] = useState("")
    const [form, setForm] = useState(false)
    const [product_id, setProduct_id] = useState("")
    const [product_name, setProduct_name] = useState("")
    const [product_code, setProduct_code] = useState("")
    const [product_price, setProduct_price] = useState("")
    const [product_unit, setProduct_unit] = useState("")
    const [erro, setErro] = useState("")
    const [sucess, setSuces] = useState("")
    const [valueSearch, setValueSearch] = useState("")
    const [messageSearch, setMessageSearch] = useState("")
    const url_base = 'http://localhost:3001/';

    const handlePriceChange = (event) => {
        const inputValue = event.target.value.replace(/[^\d]/g, '');

        const numericValue = parseFloat(inputValue);

        const formattedValue = !isNaN(numericValue) ? (numericValue / 100).toFixed(2) : '';

        setProduct_price(formattedValue);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${url_base}list-products`);
            if (response.status === 201) {
                const productList = Object.values(response.data);
                setList(productList[0]);
                return
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const confirmDelete = async (id) => {
        setConfirm(true)
        setSelectProduct(id)
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.delete(`${url_base}delete-product/${selectProduct}`);

            if (response.status === 201) {
                setMessage(response.data.message)
            } else {
                setMessage(response.data.message)
            }
        } catch (erro) {
            console.error('Erro ao excluir o produto:', erro);
        } finally {
            // setConfirm(false)
            fetchData();
        }
    }

    const handleCancel = () => {
        setConfirm(false)
        setSelectProduct("")
    }

    const handleSelectProduct = (product) => {
        if (product) {
            setForm(true)
            setProduct_id(product._id)
            setProduct_name(product.product_name)
            setProduct_code(product.product_code)
            setProduct_price(product.product_price["$numberDecimal"])
            setProduct_unit(product.product_unit)
        }
    }

    const handleEdit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.put(`http://localhost:3001/edit-product/${product_id}`, {
                product_name,
                product_code,
                product_price,
                product_unit,
            });
            if (response.status === 201) {
                setSuces(response.data.message)
            } else {
                setErro(response.data.message)
                //   console.log('Produto Atualizado:', response.data.updatedProduct);
            }
        } catch (erro) {
            setErro(erro.response.data.message)

        } finally {
            fetchData()
        }
    };

    const handleVoltar = () => {
        setForm(false)
        setProduct_id("")
        setProduct_name("")
        setProduct_code("")
        setProduct_price("")
        setProduct_unit("")
        setSuces("")
        setErro("")
    }

    const handleSearch = async (event) => {
        event.preventDefault()
        
        try {
            const response = await axios.get(`${url_base}search-products?query=${valueSearch}`);
            console.log(response)
            if (response.status === 200) {
                setList(response.data.products)
            } else {
                setMessageSearch(response.data.message)
            }
        } catch (erro) {
            setMessageSearch(erro.response.data.message)
        }
    };
    
    const inputChangeSearch = (value) => {
        setMessageSearch("")
        if(value.length === 0){
            fetchData() 
        }
    }

    return {
        list,
        confirmDelete,
        handleDelete,
        confirm,
        message,
        handleCancel,
        handleSelectProduct,
        form,
        product_id,
        product_name,
        product_code,
        product_price,
        product_unit,
        setProduct_id,
        setProduct_name,
        setProduct_code,
        setProduct_price,
        setProduct_unit,
        handleEdit,
        sucess,
        erro,
        handleVoltar,
        handlePriceChange,
        handleSearch,
        setValueSearch,
        messageSearch,
        inputChangeSearch,
    };
};

export default useScript;
