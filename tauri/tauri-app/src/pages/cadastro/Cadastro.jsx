import React, { useState } from 'react';
import "./form.css"
import Tauri from '../../Tauri';
import useScript from './script';

const Cadastro = () => {
  const {
    setUsername, setUseremail,
    setUsercpf, handleCadastro,
    username, useremail,
    usercpf, type,
    setType, loading,
    erro, setErro,
    sucess, setSucess,
    handleInputChange,
  } = useScript()

  return (
    <div >
      <Tauri />

      {loading && (
        <div className="loader-container-login">
          <div className="loader-login"></div>
        </div>
      )}

      <div className='container-form-cadastro' onSubmit={handleCadastro}>
        <div className="content-form-cadastro">

          <form className='form-cadastro' noValidate>

            <input type="text" id="nome-cadastro" name="nome" placeholder='Digite seu nome' autoComplete='off' value={username} onChange={(e) => { setUsername(e.target.value), handleInputChange() }} />

            <input type="email" id="email-cadastro" name="email" placeholder='Digite seu email' autoComplete='off' value={useremail} onChange={(e) => { setUseremail(e.target.value), handleInputChange() }} pattern=".*" />

            <input type="number" id="cpf-cadastro" name="cpf" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" title="Digite um CPF válido (ex: 123.456.789-09)" placeholder='Digite seu CPF' autoComplete='off' value={usercpf} onChange={(e) => { setUsercpf(e.target.value), handleInputChange() }} />

            <div className="checkBox">

              <div className="check-operador">
                <input type="radio" name="operador" checked={type === "operador"} onChange={() => {setType("operador"), setErro("")}} />
                <label>Operador</label>
              </div>

              <div className="check-admin">
                <input type="radio" name="admin" checked={type === "admin"} onChange={() => {setType("admin"), setErro("")}} />
                <label>Admin</label>
              </div>

            </div>

            <button type="submit" id='enviar-cadastro'>Cadastrar</button>

            <span className="btn-link-login">
              <a href="/login">LOGIN</a>
            </span>

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

          <div className="detalhe"></div>
        </div>
      </div>
    </div>

  );
}

export default Cadastro;
