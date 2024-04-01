import axios from "axios";
import { useEffect, useState } from "react";
import useAcesso from "../home/Acesso";
const usePdv = () => {
    const { userData } = useAcesso()
    const [carrinho, setCarrinho] = useState([]);
    const [subtotal, setSubtotal] = useState("")
    const [troco, setTroco] = useState("")
    const [product_code, setProductCode] = useState("")
    const [product_unit, setProductUnit] = useState("   ")
    const [isDisabledInptCode, setIsDisabledInptCode] = useState(true)
    const [isDisabledInptUnit, setIsDisabledInptUnit] = useState(true)
    const [isDisabledInptAd, setIsDisabledInptAd] = useState(true)
    const [clientData, setClientData] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [messsage, setMessage] = useState("")
    const [valor, setValor] = useState("")
    const url_base = 'http://localhost:3001/'

    const fetchData = async () => {
        try {
            const response = await axios.get(`${url_base}carrinho`);
            if (response.status === 200) {
                setCarrinho(response.data.carrinho)
                setSubtotal(response.data.carrinho.subtotal)

                if (response.data.carrinho.items.length > 0) {
                    setIsDisabledInpt_CREDITO(false)
                    setIsDisabledInpt_DEBITO(false)
                    setIsDisabledInpt_DINHEIRO(false)
                    setIsDisabledInpt_PIX(false)
                    setIsDisabledInpt_APRAZO(false)
                    setIsDisabledInpt_CANCELAR(false)
                    setIsDisabledInpt_FINALIZAR(false)
                } else {
                    setIsDisabledInpt_CREDITO(true)
                    setIsDisabledInpt_DEBITO(true)
                    setIsDisabledInpt_DINHEIRO(true)
                    setIsDisabledInpt_PIX(true)
                    setIsDisabledInpt_APRAZO(true)
                    setIsDisabledInpt_CANCELAR(true)
                    setIsDisabledInpt_FINALIZAR(true)
                }

            } else {
                console.log(response.data)
            }
        } catch (error) {
            setSubtotal(0)
        }
    };


    const [isDisabled_CREDiTO, setIsDisabledInpt_CREDITO] = useState(true)
    const [isDisabled_DEBITO, setIsDisabledInpt_DEBITO] = useState(true)
    const [isDisabled_DINHEIRO, setIsDisabledInpt_DINHEIRO] = useState(true)
    const [isDisabled_PIX, setIsDisabledInpt_PIX] = useState(true)
    const [isDisabled_APRAZO, setIsDisabledInpt_APRAZO] = useState(true)
    const [isDisabled_CANCELAR, setIsDisabledInpt_CANCELAR] = useState(true)
    const [isDisabled_FINALIZAR, setIsDisabledInpt_FINALIZAR] = useState(true)

    useEffect(() => {
        fetchData();
    }, []);

    const inputChangeCode = (value) => {
        const valueTrim = value
        setProductCode(valueTrim)
        if (valueTrim.length > 0) {
            setIsDisabledInptUnit(false)
        } else {
            setIsDisabledInptUnit(true)
        }
    }

    const inputChangeUnit = (value) => {
        const valueTrim = value
        setProductUnit(value)
        if (valueTrim.length > 0) {
            setIsDisabledInptAd(false)
        } else {
            setIsDisabledInptAd(true)
        }
    }

    const handleAdicionar = async (event) => {
        event.preventDefault()

        const url_base_carrinho = 'http://localhost:3001/';
        try {
            const response = await axios.post(`${url_base_carrinho}to-ad-cart`, {
                username: userData.username,
                usercpf: userData.usercpf,
                product_code: product_code,
                quantidade: product_unit
            })

            if (response.status === 200) {
                fetchData()
                setIsDisabledInptAd(true)
                setIsDisabledInptCode(true)
                setIsDisabledInptUnit(true)
                // console.log(response)
            } else {
                console.log(response.data)
                setIsDisabledInptAd(true)
                setIsDisabledInptCode(true)
                setIsDisabledInptUnit(true)
            }

        } catch (error) {
            // console.log(error)
        } finally {
            setProductCode("")
            setProductUnit("")
        }
    }

    const confirmCancelarCompra = async (event) => {
        event.preventDefault()
        setConfirm(true)
    }

    const confirmVoltarCompra = async (event) => {
        event.preventDefault()
        setConfirm(false)
    }

    const cancelarCompra = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.delete(`${url_base}cancelar-compra`)
            if (response.status === 200) {
                fetchData()
                setMessage(response.data.message)
            } else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [typePagamento, setTypePagamento] = useState('');

    const options = [
        { value: 1, label: 'credito' },
        { value: 2, label: 'debito' },
        { value: 3, label: 'dinheiro' },
        { value: 4, label: 'pix' },
        { value: 5, label: 'prazo' }
    ];

    const selectPagamento = (value) => {
        const selectedOption = options.find(option => option.value === value);
        setTypePagamento(selectedOption.label);

        setIsDisabledInpt_CREDITO(selectedOption.value === 1);
        setIsDisabledInpt_DEBITO(selectedOption.value === 2);
        setIsDisabledInpt_DINHEIRO(selectedOption.value === 3);
        setIsDisabledInpt_PIX(selectedOption.value === 4);
        setIsDisabledInpt_APRAZO(selectedOption.value === 5);


        if (selectedOption.value === 5) {
            setClientData(true)
            // setIsInputEntrada(false)
        } else {
            setClientData(false)
            // setIsInputEntrada(true)
        }
        // if (selectedOption.label === "prazo") {
        //     setIsInputEntrada(true)
        // }else{
        //     setClientData(false)
        // }

    };

    const handleValorChange = (event) => {
        const inputValue = event.target.value.replace(/[^\d]/g, '');

        const numericValue = parseFloat(inputValue);

        const formattedValue = !isNaN(numericValue) ? (numericValue / 100).toFixed(2) : '';

        setValor(formattedValue);
    };
    
    const finalizarCompra = async (event) => {
        event.preventDefault()
        try{
            const response = await axios.post(`${url_base}finalizar-compra`,{
                tipoPagamento: typePagamento,
                valorPago: valor,
            })
            if (response.status === 200) {
                console.log(response.data.troco)
                setTroco(response.data.troco)
                fetchData()
            }else{
                console.log(response.data.message)
            }
        }catch{

        }
    }

    return {
        carrinho,
        subtotal,
        troco,
        inputChangeCode,
        inputChangeUnit,
        handleAdicionar,
        product_code,
        product_unit,
        isDisabledInptCode,
        isDisabledInptUnit,
        isDisabledInptAd,
        isDisabled_CREDiTO,
        isDisabled_DEBITO,
        isDisabled_DINHEIRO,
        isDisabled_PIX,
        isDisabled_APRAZO,
        isDisabled_CANCELAR,
        isDisabled_FINALIZAR,
        selectPagamento,
        clientData,
        confirmCancelarCompra,
        confirmVoltarCompra,
        confirm,
        cancelarCompra,
        messsage,
        valor,
        handleValorChange,
        finalizarCompra,
        setValor,
    }
}
export default usePdv;