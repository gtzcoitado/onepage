import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png'; // Ajuste o caminho se necessário

function AdminPage() {
  // Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Vídeos
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ titulo: '', descricao: '', link: '' });

  // Edição inline
  const [editVideoId, setEditVideoId] = useState(null);
  const [editVideo, setEditVideo] = useState({ titulo: '', descricao: '', link: '' });

  // Monta o token conforme a regra do Postman
  const computeToken = () => {
    const dataAtual = new Date();
    const diaAtual = ('0' + dataAtual.getDate()).slice(-2);
    const horaAtual = ('0' + dataAtual.getHours()).slice(-2);
    const minutoAtual = ('0' + dataAtual.getMinutes()).slice(-2);
    return (
      diaAtual + 'HT%s7wq$5a@51' + horaAtual + 'kas93jJD9(01$3!1' + minutoAtual + '4aeT5$a%'
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    // 1) Monta token
    const tokenString = computeToken();
    const url = `https://cafecomfinancasoficial.com/FinancasAPI/API/Token/ValidaLoginAdm?Login=${username}&Senha=${password}&Token=${tokenString}`;
  
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: username, senha: password, token: tokenString })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Login ou senha incorretos!');
        return res.json();
      })
      .then((data) => {
        if (!data || data.length === 0) {
          throw new Error('Nenhuma resposta. Verifique as credenciais.');
        }
  
        // Pega token e idUsuario retornados
        const usuario = data[0];
        const myToken = usuario.token;
        const myIdUsuario = usuario.idUsuario;
  
        // 2) Testa se o token realmente funciona
        return fetch("https://cafecomfinancasoficial.com/FinancasAPI/API/VideosYoutube/ListarTodos", {
          method: 'GET',
          headers: {
            'IDUsuario': myIdUsuario,
            'Token': myToken
          }
        })
          .then((res) => {
            // Se falhar, assume que a senha está errada
            if (!res.ok) throw new Error('Login ou senha incorretos!');
            return res.json();
          })
          .then(() => {
            // Se chegou aqui, então o token é mesmo válido
            setToken(myToken);
            setIdUsuario(myIdUsuario);
            setIsLoggedIn(true);
          });
      })
      .catch((err) => {
        alert(err.message || 'Login ou senha incorretos!');
        console.error(err);
      });
  };
  
  

  // LOGOUT
  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setIdUsuario(null);
  };

  // BUSCA VÍDEOS
  const fetchVideos = () => {
    if (!idUsuario || !token) return;
    fetch('https://cafecomfinancasoficial.com/FinancasAPI/API/VideosYoutube/ListarTodos', {
      method: 'GET',
      headers: {
        IDUsuario: idUsuario,
        Token: token
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar vídeos, status ' + res.status);
        return res.json();
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => console.error('Erro ao buscar vídeos', err));
  };

  // Carrega os vídeos após login
  useEffect(() => {
    if (isLoggedIn) {
      fetchVideos();
    }
  }, [isLoggedIn, idUsuario, token]);

  // ADICIONAR
  const handleAddVideo = (e) => {
    e.preventDefault();
    const videoData = {
      id: 0,
      titulo: newVideo.titulo,
      descricao: newVideo.descricao,
      link: newVideo.link
    };
    fetch('https://cafecomfinancasoficial.com/FinancasAPI/API/VideosYoutube/Salvar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        IDUsuario: idUsuario,
        Token: token
      },
      body: JSON.stringify(videoData)
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Erro ao adicionar vídeo, status ' + res.status);
        const text = await res.text();
        if (text && text.trim() !== '') {
          try {
            const json = JSON.parse(text);
            console.log('Retorno adicionar vídeo:', json);
          } catch (err) {
            console.error('Falha ao parsear JSON do adicionar vídeo:', text, err);
          }
        }
      })
      .then(() => {
        fetchVideos();
        setNewVideo({ titulo: '', descricao: '', link: '' });
      })
      .catch((err) => console.error('Erro ao adicionar vídeo', err));
  };

  // DELETAR
  const handleDeleteVideo = (videoId) => {
    fetch('https://cafecomfinancasoficial.com/FinancasAPI/API/VideosYoutube/Excluir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        IDUsuario: idUsuario,
        Token: token
      },
      body: JSON.stringify({
        idUsuario: idUsuario,
        iDs: videoId.toString()
      })
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Erro ao deletar vídeo, status ' + res.status);
        const text = await res.text();
        if (text && text.trim() !== '') {
          try {
            const json = JSON.parse(text);
            console.log('Retorno deletar vídeo:', json);
          } catch (err) {
            console.error('Falha ao parsear JSON do deletar vídeo:', text, err);
          }
        }
      })
      .then(() => {
        fetchVideos();
      })
      .catch((err) => console.error('Erro ao deletar vídeo', err));
  };

  // PREPARAR EDIÇÃO
  const handleEditVideo = (video) => {
    setEditVideoId(video.id);
    setEditVideo({
      titulo: video.titulo,
      descricao: video.descricao,
      link: video.link
    });
  };

  // ATUALIZAR
  const handleUpdateVideo = (e) => {
    e.preventDefault();
    const videoData = {
      id: editVideoId,
      titulo: editVideo.titulo,
      descricao: editVideo.descricao,
      link: editVideo.link
    };
    fetch('https://cafecomfinancasoficial.com/FinancasAPI/API/VideosYoutube/Salvar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        IDUsuario: idUsuario,
        Token: token
      },
      body: JSON.stringify(videoData)
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Erro ao atualizar vídeo, status ' + res.status);
        const text = await res.text();
        if (text && text.trim() !== '') {
          try {
            const json = JSON.parse(text);
            console.log('Retorno atualizar vídeo:', json);
          } catch (err) {
            console.error('Falha ao parsear JSON do atualizar vídeo:', text, err);
          }
        }
      })
      .then(() => {
        fetchVideos();
        setEditVideoId(null);
        setEditVideo({ titulo: '', descricao: '', link: '' });
      })
      .catch((err) => console.error('Erro ao atualizar vídeo', err));
  };

  // TELA DE LOGIN
  if (!isLoggedIn) {
    return (
      <div style={styles.loginContainer}>
        {/* Logo acima do login, centralizada */}
        <img
          src={logo}
          alt="Logo"
          style={{ width: '120px', marginBottom: '1rem', display: 'block', margin: '0 auto' }}
        />

        <div style={styles.loginBox}>
          <h1 style={styles.title}>Login Administrativo</h1>
          <form onSubmit={handleLogin} style={styles.loginForm}>
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.loginButton}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // TELA DE ADMIN
  return (
    <div style={styles.adminContainer}>

      {/* Div para logo no centro e botão logout na direita */}
      <div style={styles.headerLogo}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: '150px', display: 'block', margin: '0 auto' }}
        />
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      <h1 style={styles.mainTitle}>Painel Administrativo - Gerenciar Vídeos</h1>

      {/* Adicionar Novo Vídeo */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Adicionar Novo Vídeo</h2>
        <form onSubmit={handleAddVideo} style={styles.formRow}>
          <input
            type="text"
            placeholder="Título"
            value={newVideo.titulo}
            onChange={(e) => setNewVideo({ ...newVideo, titulo: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={newVideo.descricao}
            onChange={(e) => setNewVideo({ ...newVideo, descricao: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Link do YouTube"
            value={newVideo.link}
            onChange={(e) => setNewVideo({ ...newVideo, link: e.target.value })}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.addButton}>
            Adicionar Vídeo
          </button>
        </form>
      </section>

      <hr style={{ margin: '1.5rem 0' }} />

      {/* Lista de Vídeos */}
      <section style={styles.section}>
        <h2 style={styles.subtitle}>Vídeos Existentes</h2>
        <ul style={styles.videoList}>
          {videos.map((video) => {
            const isEditing = editVideoId === video.id;
            return (
              <li key={video.id} style={styles.videoItem}>
                {isEditing ? (
                  // Formulário inline
                  <form onSubmit={handleUpdateVideo} style={styles.formInline}>
                    <input
                      type="text"
                      placeholder="Título"
                      value={editVideo.titulo}
                      onChange={(e) => setEditVideo({ ...editVideo, titulo: e.target.value })}
                      required
                      style={styles.inputInline}
                    />
                    <input
                      type="text"
                      placeholder="Descrição"
                      value={editVideo.descricao}
                      onChange={(e) => setEditVideo({ ...editVideo, descricao: e.target.value })}
                      required
                      style={styles.inputInline}
                    />
                    <input
                      type="text"
                      placeholder="Link do YouTube"
                      value={editVideo.link}
                      onChange={(e) => setEditVideo({ ...editVideo, link: e.target.value })}
                      required
                      style={styles.inputInline}
                    />
                    <button type="submit" style={styles.updateButton}>
                      Atualizar Vídeo
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditVideoId(null)}
                      style={styles.cancelButton}
                    >
                      Cancelar
                    </button>
                  </form>
                ) : (
                  <>
                    <strong style={styles.videoTitle}>{video.titulo}</strong> -{' '}
                    {video.descricao} -{' '}
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      {video.link}
                    </a>
                    <div style={{ marginTop: '0.5rem' }}>
                      <button
                        style={styles.deleteButton}
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        Deletar
                      </button>
                      <button
                        style={styles.editButton}
                        onClick={() => handleEditVideo(video)}
                      >
                        Editar
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

// === ESTILOS INLINE ===
const styles = {
  // Login
  loginContainer: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    backgroundColor: '#fff',
    width: '350px',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#6B4226',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.7rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  loginButton: {
    backgroundColor: '#6B4226',
    color: '#fff',
    border: 'none',
    padding: '0.7rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },

  // Admin
  adminContainer: {
    maxWidth: '900px',
    margin: '2rem auto',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
  },
  headerLogo: {
    position: 'relative',
    marginBottom: '1rem',
  },
  logoutButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#666',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
  mainTitle: {
    fontSize: '1.6rem',
    color: '#6B4226',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  section: {
    marginBottom: '2rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#6B4226',
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  addButton: {
    backgroundColor: '#6B4226',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.6rem 1rem',
    cursor: 'pointer',
  },
  videoList: {
    listStyle: 'none',
    padding: 0,
  },
  videoItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: '1rem',
    padding: '1rem',
    borderRadius: '6px',
    boxShadow: '0 0 8px rgba(0,0,0,0.05)',
  },
  videoTitle: {
    color: '#6B4226',
  },
  link: {
    color: '#b45309',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#c0392b',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    cursor: 'pointer',
  },
  editButton: {
    backgroundColor: '#6B4226',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
  // Edição inline
  formInline: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    alignItems: 'center',
  },
  inputInline: {
    padding: '0.4rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  updateButton: {
    backgroundColor: '#6B4226',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#666',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    marginLeft: '0.5rem',
  },
};

export default AdminPage;
