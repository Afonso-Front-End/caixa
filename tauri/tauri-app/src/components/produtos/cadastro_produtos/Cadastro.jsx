import "./cadastro.css"
import useScript from "./script";

const CadastroProdutos = () => {

  const {

    product_code, product_name,
    product_price, product_unit,
    setProduct_code, setProduct_name,
    setProduct_price, setProduct_unit,
    handleCadastro, loading,
    message, handlePriceChange,
    

  } = useScript()
  return (
    <div className='container-cadastro-produtos'>
      <div className="content-cadastro-produtos">

        <form className="form-cadastrar-produtos" onSubmit={handleCadastro}>
          <div className="form-cadastrar-produtos-inputs">

            <div className='div-input-cadastrar'>
              <label>produto</label>
              <input type="text" id="produto-cadastrar" placeholder="Produto" name="produto" onChange={(event) => setProduct_name(event.target.value)}
                value={product_name} />
            </div>

            <div className='div-input-cadastrar'>
              <label >codigo</label>
              <input type="number" id="codigo-cadastrar" placeholder="Codigo" name="codigo" onChange={(event) => setProduct_code(event.target.value)}
                value={product_code} />

            </div>

            <div className='div-input-cadastrar'>
              <label>preco</label>R$
              <input type="text" id="preco-cadastrar" placeholder="Preco" name="preco"
                value={product_price} onChange={handlePriceChange} />
            </div>

            <div className='div-input-cadastrar'>
              <label >unidades</label>
              <input type="number" id="quantidade-cadastrar" placeholder="Quantidade" name="quantidade" onChange={(event) => setProduct_unit(event.target.value)}
                value={product_unit} />
            </div>

            <div className="form-button-cadastrar-produtos">
              <button type="submit" id='salvar' >
                Salvar
              </button>
              <button type="button" id='limpar' >
                Limpar
              </button>
            </div>
          </div>
        </form>

        {/* ${feedBack ? 'feedBack-active' : ''} */}

        {message && (
          <div className={`feedBack`}>

            {loading && (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            )}
            <p>{message}</p>

          </div>
        )}



      </div>
    </div>
  )
}

export default CadastroProdutos;