import { useEffect, useState } from 'react'
import { get, post, put } from '../services/api'

export default function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([])
  const [livros, setLivros] = useState([])
  const [form, setForm] = useState({
    livroId: '',
    nomeUsuario: ''
  })
  const [erro, setErro] = useState('')

  useEffect(() => {
    carregar()
    carregarLivros()
  }, [])

  function carregar() {
    get('/emprestimos')
      .then(setEmprestimos)
      .catch((erro) => setErro(erro.message))
  }

  function carregarLivros() {
    get('/livros')
      .then(setLivros)
      .catch((erro) => setErro(erro.message))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    if (!form.livroId) {
      setErro('Selecione um livro.')
      return
    }

    if (!form.nomeUsuario.trim()) {
      setErro('Informe o nome do usuário.')
      return
    }

    const dados = {
      livroId: Number(form.livroId),
      nomeUsuario: form.nomeUsuario.trim()
    }

    post('/emprestimos', dados)
      .then(() => {
        setForm({
          livroId: '',
          nomeUsuario: ''
        })

        carregar()
        carregarLivros()
      })
      .catch((erro) => {
        setErro(erro.message)
      })
  }

  function devolver(id) {
    setErro('')

    put(`/emprestimos/${id}/devolver`)
      .then(() => {
        carregar()
        carregarLivros()
      })
      .catch((erro) => {
        setErro(erro.message)
      })
  }

  return (
    <div>
      <h1>Emprestimos</h1>

      {erro && (
        <p style={{ color: 'red' }}>
          {erro}
        </p>
      )}

      <form className="card" onSubmit={handleSubmit}>
        <div className="field">
          <label>Livro</label>

          <select
            value={form.livroId}
            onChange={(e) =>
              setForm({
                ...form,
                livroId: e.target.value
              })
            }
          >
            <option value="">Selecione...</option>

            {livros.map((livro) => (
              <option key={livro.id} value={livro.id}>
                {livro.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Nome do usuario</label>

          <input
            value={form.nomeUsuario}
            onChange={(e) =>
              setForm({
                ...form,
                nomeUsuario: e.target.value
              })
            }
          />
        </div>

        <button type="submit">
          Emprestar
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Livro</th>
            <th>Usuario</th>
            <th>Status</th>
            <th>Previsao</th>
            <th>Acoes</th>
          </tr>
        </thead>

        <tbody>
          {emprestimos.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.livroId}</td>
              <td>{emp.nomeUsuario}</td>
              <td>{emp.status}</td>
              <td>{emp.dataDevolucaoPrevista}</td>

              <td>
                {emp.status === 'ATIVO' && (
                  <button onClick={() => devolver(emp.id)}>
                    Devolver
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}