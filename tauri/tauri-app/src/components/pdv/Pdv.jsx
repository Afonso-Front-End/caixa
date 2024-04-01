import React from 'react';
import "./pdv.css"
import { FaCcMastercard, FaCreditCard, FaPix, FaRectangleList } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import usePdv from './PdvScript';
const Pdv = () => {
    const {
        carrinho, subtotal,
        inputChangeCode, handleAdicionar,
        product_code, product_unit,
        inputChangeUnit, isDisabledInptCode,
        isDisabledInptUnit, isDisabledInptAd,
        isDisabled_CREDiTO, isDisabled_DEBITO,
        isDisabled_DINHEIRO, isDisabled_PIX,
        isDisabled_APRAZO, selectPagamento,
        clientData, isDisabled_CANCELAR,
        isDisabled_FINALIZAR,
        confirmCancelarCompra, confirm,
        cancelarCompra, messsage,
        confirmVoltarCompra, handleValorChange,
        valor, finalizarCompra,
        troco,
    } = usePdv()

    return (
        <div className="container-pdv">
            <div className="content-pdv">

                <div className="table_opracoes">

                    <div className='container-table-tela'>
                        <p>PRODUTOS LANCADOS</p>
                        <table className="table-tela">
                            <thead className="thead-tela">
                                <tr>
                                    <th>nome produto</th>
                                    <th>codigo</th>
                                    {/* <th>produto</th> */}
                                    <th>quantidade</th>
                                    <th>valor unitario</th>
                                    <th>total</th>
                                </tr>
                            </thead>
                            <tbody className='tbody-tela'>
                                {carrinho && carrinho.items && carrinho.items.map((produto, index) => (
                                    <tr key={index}>
                                        <td>{produto.product_name}</td>
                                        <td>{produto.product_code}</td>
                                        <td>{produto.quantidade}</td>
                                        <td>{parseFloat(produto.product_price["$numberDecimal"]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                        <td>{parseFloat(produto.total["$numberDecimal"]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>


                        </table>
                    </div>

                    <div className='operacoes' >
                        <form onSubmit={handleAdicionar}>
                            <div className='btn-operacoes' >
                                <input
                                    type="number"
                                    placeholder='0000000000'
                                    id='operacao-codigo'

                                    autoComplete='off'
                                    value={product_code}
                                    onChange={(event) => inputChangeCode(event.target.value)}
                                />

                                <input type="number"
                                    placeholder='unidade'
                                    id='opreracao-unidade'

                                    autoComplete='off'
                                    value={product_unit}
                                    onChange={(event) => inputChangeUnit(event.target.value)}

                                    disabled={isDisabledInptUnit}
                                />
                                <input type="submit"
                                    id='opreracao-adicionar'
                                    value="Adicionar"
                                    disabled={isDisabledInptAd}
                                />
                            </div>
                        </form>

                        <div className='form-pagamento'>
                            <p>formas de pagamento</p>
                            <div className='collun-01 collun'>
                                <div id='credito'>
                                    <button disabled={isDisabled_CREDiTO} onClick={() => selectPagamento(1)}>
                                        <FaCcMastercard size={30} className='icon' />
                                    </button>
                                    <p>credito</p>
                                </div>
                                <div id='debito'>
                                    <button disabled={isDisabled_DEBITO} onClick={() => selectPagamento(2)}>
                                        <FaCreditCard size={30} className='icon' />
                                    </button>
                                    <p>debito</p>
                                </div>
                            </div>
                            <div className='collun-02 collun'>
                                <div id='dinheiro'>
                                    <button disabled={isDisabled_DINHEIRO} onClick={() => selectPagamento(3)}>
                                        <FaMoneyCheckAlt size={30} className='icon' />
                                    </button>
                                    <p>dinheiro</p>
                                </div>
                                <div id='pix'>
                                    <button disabled={isDisabled_PIX} onClick={() => selectPagamento(4)}>
                                        <FaPix size={30} className='icon' />
                                    </button>
                                    <p>pix</p>
                                </div>
                                <div id='a-prazo'>
                                    <button disabled={isDisabled_APRAZO} onClick={() => selectPagamento(5)}>
                                        <FaRectangleList size={30} className='icon' />
                                    </button>
                                    <p>A Prazo</p>
                                </div>
                            </div>

                            {clientData && (
                                <div className='data-cliente'>
                                    <input type="text" name="" id="nome_client" placeholder='Nome do cliente' onChange={(e) => setClientNome(e.target.value)} />
                                    <input type="number" name="" id="cpf_client" placeholder='CPF do cliente' onChange={(e) => setClientCpf(e.target.value)} />
                                </div>
                            )}
                        </div>

                        <div>
                            <div className='entrada-dinheiro'>

                                <div id='entrada-dinheiro-total'>
                                    <p>recebido</p>
                                    <div className='input-valor-recebido'>
                                        R$<input type="text" placeholder='00,00' autoComplete='off' value={valor} onChange={handleValorChange} />
                                    </div>      
                                </div>

                                <div id='saida-dinheiro-troco'>
                                    <p>troco</p>
                                    <button disabled>
                                        {troco === '' ? parseFloat(0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : parseFloat(troco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                    </button>

                                </div>

                            </div>

                            <form className='finalizar-pagamento' onSubmit={finalizarCompra}>

                                <div className='finalizar'>
                                    <div id='cancelar-compra'>
                                        <button disabled={isDisabled_CANCELAR} onClick={confirmCancelarCompra}>
                                            cancelar
                                        </button>
                                    </div>
                                    <div id='finalizar-compra'>
                                        <button disabled={isDisabled_FINALIZAR} onClick={finalizarCompra}>
                                            finalizar
                                        </button>
                                    </div>
                                </div>

                                {confirm && (
                                    <div className='confirm-cancel'>
                                        <div className="message" style={{ textAlign: "center" }}>
                                            {messsage ? `${messsage}` : 'Cancelar compra?'}
                                            <p></p>
                                            <div className='buttons-confirm-cancel'>
                                                <button id='confirm' onClick={cancelarCompra}>Confirmar</button>
                                                <button id='cancel' onClick={confirmVoltarCompra}>Voltar</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </form>
                        </div>
                    </div>
                </div>

                <div className="tela-buttons">
                    <div className="btn-subtotal" >

                        <div>
                            <p>caixa aberto</p>

                        </div>

                        <div>
                            <p>Subtotal</p>
                            <h1>{subtotal === 0 ? parseFloat(0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : parseFloat(subtotal["$numberDecimal"]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h1>
                            {/* <h1>{parseFloat(subtotal["$numberDecimal"]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h1> */}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Pdv;