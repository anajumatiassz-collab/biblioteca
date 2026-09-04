import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get, post, put } from '../services/api'

export default function FormLivro() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    quantidadeTotal: 1
  })

  const [erro, setErro] = useState('')

  useEffect(() => {
    if (id) {
      get(`/livros/${id}`)
        .then(setForm)
        .catch((erro) => {
          setErro(erro.message)
        })
    }
  }, [id])

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    const quantidade = Number(form.quantidadeTotal)

    if (!Number.isInteger(quantidade) || quantidade < 0) {
      setErro('A quantidade total deve ser um número inteiro maior ou igual a zero.')
      return
    }

    if (!form.titulo.trim()) {
      setErro('O título é obrigatório.')
      return
    }

    if (!form.autor.trim()) {
      setErro('O autor é obrigatório.')
      return
    }

    const dados = {
      ...form,
      quantidadeTotal: quantidade
    }

    const requisicao = id
      ? put(`/livros/${id}`, dados)
      : post('/livros', dados)

    requisicao
      .then(() => navigate('/livros'))
      .catch((erro) => {
        setErro(erro.message)
      })
  }

  return (
    <div>
      <h1>{id ? 'Editar Livro' : 'Novo Livro'}</h1>

      {erro && (
        <p style={{ color: 'red' }}>
          {erro}
        </p>
      )}

      <form className="card" onSubmit={handleSubmit}>
        <div className="field">
          <label>Titulo</label>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Autor</label>
          <input
            name="autor"
            value={form.autor}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>ISBN</label>
          <input
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Quantidade total</label>
          <input
            type="number"
            min="0"
            step="1"
            name="quantidadeTotal"
            value={form.quantidadeTotal}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Salvar
        </button>
      </form>
    </div>
  )
}