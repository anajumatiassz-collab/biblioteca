const apiUrl = import.meta.env.VITE_API_URL?.trim() || 'http://localhost:8080';
const BASE_URL = `${apiUrl.replace(/\/+$/, '')}/api`;

async function tratarResposta(res) {
  if (!res.ok) {
    let mensagem = 'Ocorreu um erro na requisição.';

    try {
      const erro = await res.json();
      mensagem = erro.message || mensagem;
    } catch {
      // Se a resposta não tiver JSON, mantém a mensagem padrão
    }

    throw new Error(mensagem);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}

export async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  return tratarResposta(res);
}

export async function post(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return tratarResposta(res);
}

export async function put(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return tratarResposta(res);
}

export async function del(path) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
  });

  return tratarResposta(res);
}
