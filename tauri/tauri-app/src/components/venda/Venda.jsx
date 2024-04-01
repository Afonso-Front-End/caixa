import useVendas from "./UseVenda";
import "./venda.css"
const Vendas = () => {
    const { vendas, vendasPorData, handleClickData, dataSelecionada, handleFechar, handleVweItem, detalhe, viwe } = useVendas()
    return (
        <div className='container-table'>
            <div className="content-table">
                <h1>HISTORICO DE VENDAS</h1>
                <table className='table-lista'>
                    <thead className='thead-lista'>
                        <tr>
                            <th>DATA</th>
                            <th>VALOR</th>
                            <th>VENDAS</th>
                            <th>OPERADOR</th>
                            <th onClick={() => handleClickData(data)} >EXPANDIR</th>
                        </tr>
                    </thead>

                    <tbody className='tbody-lista'>
                        {Object.keys(vendasPorData).map((data) => (
                            <tr key={data}>
                                <td>{data}</td>
                                <td>
                                    {vendasPorData[data].reduce((acc, venda) => acc + venda.valorTotal, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </td>
                                <td>{vendasPorData[data].length}</td>
                                <td>{vendasPorData[data][0].items[0].username}</td>
                                <td>
                                    <button onClick={() => handleClickData(data)} id='editar'>EXPANDIR</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                {viwe && (
                    <div className="container-table-venda" style={{ zIndex: 100000, backgroundColor: "black" }}>
                        {/* style={{backgroundColor: "wheat"}} */}
                        <div className="content-table-venda" >
                            <table className='table-lista'>
                                <thead className='thead-lista'>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Valor</th>
                                        <th>Total</th>
                                        <th>Itens</th>
                                        <th>operador nome</th>
                                        <th>operador cpf</th>
                                        <th>data venda</th>
                                        <th>pagamento</th>
                                    </tr>
                                </thead>
                                <tbody className='tbody-lista'>
                                    {detalhe.items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item._id}</td>
                                            <td>{item.product_name}</td>
                                            <td>{item.product_price}</td>
                                            <td>{item.valor_total}</td>
                                            <td>{item.quantidade}</td>
                                            <td>{item.username}</td>
                                            <td>{item.usercpf}</td>
                                            <td>{detalhe.data_venda}</td>
                                            <td>{detalhe.tipoPagamento}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: "0.5rem" }}>
                                <button id='editar' onClick={handleFechar}>FECHAR</button>
                                <h1>
                                    Subtotal <br />
                                    {parseFloat(detalhe.valorTotal).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                </h1>
                            </div>
                        </div>
                    </div>
                )}

                {dataSelecionada && (
                    <div className="container-table-venda">
                        <div className="content-table-venda">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h2>Vendas de {dataSelecionada}</h2><button id='editar' onClick={handleFechar}>FECHAR</button>
                            </div>
                            <table className='table-lista'>
                                <thead className='thead-lista'>
                                    <tr>
                                        <th>ID</th>
                                        <th>Total</th>
                                        <th>Itens</th>
                                        <th>operador</th>
                                    </tr>
                                </thead>
                                <tbody className='tbody-lista'>
                                    {vendasPorData[dataSelecionada].map((venda, index) => (
                                        <tr key={venda._id} onClick={() => handleVweItem(index)} style={{ cursor: 'pointer' }}>
                                            <td>{venda._id}</td>
                                            <td>{venda.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                            <td>{venda.items.length}</td>
                                            <td>{venda.items[0].username}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div>
                                <h1>Subtotal</h1>
                                <h1>
                                    {vendasPorData[dataSelecionada].reduce((acc, venda) => acc + venda.valorTotal, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </h1>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Vendas;
