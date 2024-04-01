import React from 'react';
import "./produtos.css"
import "./form-edit.css"
import useScript from './Script';


import { Search } from 'react-bootstrap-icons';

const Produtos = () => {
  const {
    list, confirmDelete,
    handleDelete, confirm,
    message, handleCancel,
    handleSelectProduct,
    form, product_id, product_name,
    product_code, product_price,
    product_unit, setProduct_name,
    setProduct_code, setProduct_price,
    setProduct_unit, handleEdit,
    sucess, erro,
    handleVoltar, handlePriceChange,
    handleSearch, setValueSearch,
    messageSearch, inputChangeSearch

  } = useScript()

  return (
    <div className='container-table'>
      <div className="content-table">

        <form className='pesquisa' onSubmit={handleSearch}>
          <div className='pesquisa-input'>
            <input type="text" placeholder='NOME/CODIGO' id='pesquisar' onChange={(e) => { setValueSearch(e.target.value), inputChangeSearch(e.target.value) }} />
            <button><Search color="black" size={25} /></button>
          </div>
          {messageSearch && (
            <div>
              <p id='erro'>{messageSearch}</p>
            </div>

          )}
        </form>

        <table className='table-lista'>
          <thead className='thead-lista'>
            <tr>
              <th>produto</th>
              <th>codigo</th>
              <th>valor</th>
              <th>unidade</th>
              <th>exluir</th>
              <th>editar</th>
            </tr>
          </thead>

          <tbody className='tbody-lista'>
            {list && list.map((product, index) => (
              <tr key={index}>
                <td>{product.product_name}</td>
                <td>{product.product_code}</td>
                <td>{parseFloat(product.product_price["$numberDecimal"]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                <td>{product.product_unit}</td>
                <td><button id='excluir' onClick={() => confirmDelete(product._id)}>excluir</button></td>
                <td><button id='editar' onClick={() => handleSelectProduct(product)}>editar</button></td>
              </tr>
            ))}
          </tbody>

        </table>


        {form && (
          <div className='container-form-edit'>
            <div className='content-form-edit'>

              <form className="form-edit-produtos" >
                <div className="form-edit-inputs">

                  <div className='div-input'>
                    <label >ID:</label>
                    <input type="text" id='id-produto' name='id' value={product_id} disabled />
                  </div>

                  <div className='div-input'>
                    <label>produto:</label>
                    <input type="text" id='produto' placeholder="produto" name='produto' value={product_name} onChange={(e) => setProduct_name(e.target.value)} />
                  </div>

                  <div className='div-input'>
                    <label>codigo:</label>
                    <input type="number" id='codigo' placeholder="codigo" name='codigo' value={product_code} onChange={(e) => setProduct_code(e.target.value)} />
                  </div>

                  <div className='div-input'>
                    <label>preco:</label>
                    R$<input type="text" id='preco' placeholder="preco" name='preco' value={product_price} onChange={handlePriceChange} />
                  </div>

                  <div className='div-input'>
                    <label>unidades:</label>
                    <input type="number" id='quantidade' placeholder="quantidade" name='quantidade' value={product_unit} onChange={(e) => setProduct_unit(e.target.value)} />
                  </div>

                </div>

                <div className="form-button-edit">
                  <button type="submit" id='salvar-edit' onClick={handleEdit}>
                    Salvar
                  </button>

                  <button type="button" id='cancelar-edit' onClick={handleVoltar}>
                    Voltar
                  </button>
                </div>
                {erro && (
                  <div>
                    <p id='erro'>{erro}</p>
                  </div>

                )}

                {sucess && (
                  <div>
                    <p id='sucess'>{sucess}</p>
                  </div>

                )}
              </form>


            </div>

          </div>
        )}

        {confirm && (
          <div className='confirm-cancel'>
            <div className="message">
              <p>{message ? `${message}` : 'Excluir item?'}</p>
              <div className='buttons-confirm-cancel'>
                <button id='confirm' onClick={handleDelete}>Confirmar</button>
                <button id='cancel' onClick={handleCancel}>Voltar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Produtos;
