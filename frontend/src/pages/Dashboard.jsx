import { useEffect, useState } from 'react'
import { get } from '../services/api'

export default function Dashboard() {
  const [livros, setLivros] = useState([])
  const [emprestimos, setEmprestimos] = useState([])
  const [erro, setErro] = useState('')

  useEffect(() => {
    carregarDados()
  }, [])

  function carregarDados() {
    setErro('')

    Promise.all([
      get('/livros'),
      get('/emprestimos')
    ])
      .then(([livrosData, emprestimosData]) => {
        setLivros(livrosData)
        setEmprestimos(emprestimosData)
      })
      .catch((erro) => {
        setErro(erro.message)
      })
  }

  const totalLivros = livros.length

  const disponiveis = livros.reduce(
    (acc, livro) => acc + (livro.quantidadeDisponivel || 0),
    0
  )

  const ativos = emprestimos.filter(
    (emprestimo) => emprestimo.status === 'ATIVO'
  ).length

  return (
    <div>
      <h1>Painel da Biblioteca</h1>

      {erro && (
        <p style={{ color: 'red' }}>
          {erro}
        </p>
      )}

      <div className="grid">
        <div className="card">
          <div>Titulos cadastrados</div>
          <div className="stat">{totalLivros}</div>
        </div>

        <div className="card">
          <div>Exemplares disponiveis</div>
          <div className="stat">{disponiveis}</div>
        </div>

        <div className="card">
          <div>Emprestimos ativos</div>
          <div className="stat">{ativos}</div>
        </div>
      </div>
    </div>
  )
}