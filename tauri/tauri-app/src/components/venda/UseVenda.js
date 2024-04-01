import axios from 'axios'
import { useEffect, useState } from 'react';

const useVendas = () => {
    const url_base = 'http://localhost:3001/';
    const [vendas, setVendas] = useState([]);
    const [vendasPorData, setVendasPorData] = useState({});
    const [dataSelecionada, setDataSelecionada] = useState(null);
    const [detalhe, setDetalhe] = useState([])
    const [viwe, setViwe] = useState(false)

    // console.log(vendasPorData)
    // console.log(dataSelecionada)
    const fetchData = async () => {
        try {
            const response = await axios.get(`${url_base}list-vendas`);
            if (response.status === 200) {
                setVendas(response.data.historico);
                organizarVendasPorData(response.data.historico);
            }
        } catch (error) {
            console.error('Erro ao buscar as vendas:', error);
        }
    };
    
    const organizarVendasPorData = (vendas) => {
        const vendasOrganizadas = {};
        vendas.forEach((venda) => {
            const dataVenda = new Date(venda.data_venda).toLocaleDateString('pt-BR');
            if (!vendasOrganizadas[dataVenda]) {
                vendasOrganizadas[dataVenda] = [];
            }
            vendasOrganizadas[dataVenda].push(venda);
        });
        setVendasPorData(vendasOrganizadas);
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const handleFechar = () => {
        setDataSelecionada(null)
    }
    
    const handleClickData = (data) => {
        setDataSelecionada(data);
    };

    const handleVweItem = (index) => {
        setViwe(true)
        console.log(vendasPorData[dataSelecionada][index])
        setDetalhe(vendasPorData[dataSelecionada][index])
    }

    return{
        vendas,
        handleClickData,
        vendasPorData,
        dataSelecionada,
        handleFechar,
        handleVweItem,
        detalhe,
        viwe,
    }

}

export default useVendas;

