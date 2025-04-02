// src/AdminPage.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Certifique-se de configurar seu firebase.js

function AdminPage() {
  // Estado para login fictício
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados para gerenciar vídeos
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ title: '', description: '', link: '' });
  const [editVideoId, setEditVideoId] = useState(null);
  const [editVideo, setEditVideo] = useState({ title: '', description: '', link: '' });

  // Consulta em tempo real dos vídeos (apenas se estiver logado)
  useEffect(() => {
    if (isLoggedIn) {
      const unsubscribe = db.collection('videos').onSnapshot((snapshot) => {
        const vids = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setVideos(vids);
      });
      return () => unsubscribe();
    }
  }, [isLoggedIn]);

  // Função para realizar o login fictício
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '123') {
      setIsLoggedIn(true);
    } else {
      alert('Credenciais inválidas!');
    }
  };

  // Função para adicionar um novo vídeo
  const handleAddVideo = async (e) => {
    e.preventDefault();
    await db.collection('videos').add(newVideo);
    setNewVideo({ title: '', description: '', link: '' });
  };

  // Função para deletar um vídeo
  const handleDeleteVideo = async (id) => {
    await db.collection('videos').doc(id).delete();
  };

  // Preparar para editar um vídeo
  const handleEditVideo = (video) => {
    setEditVideoId(video.id);
    setEditVideo({ title: video.title, description: video.description, link: video.link });
  };

  // Atualizar um vídeo existente
  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    await db.collection('videos').doc(editVideoId).update(editVideo);
    setEditVideoId(null);
    setEditVideo({ title: '', description: '', link: '' });
  };

  // Se não estiver logado, exibe o formulário de login
  if (!isLoggedIn) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Login Administrativo</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  // Se estiver logado, exibe o painel de administração
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Painel Administrativo - Gerenciar Vídeos</h1>

      {/* Formulário para adicionar novo vídeo */}
      <section>
        <h2>Adicionar Novo Vídeo</h2>
        <form onSubmit={handleAddVideo}>
          <input
            type="text"
            placeholder="Título"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Descrição"
            value={newVideo.description}
            onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Link do YouTube"
            value={newVideo.link}
            onChange={(e) => setNewVideo({ ...newVideo, link: e.target.value })}
            required
          />
          <button type="submit">Adicionar Vídeo</button>
        </form>
      </section>

      <hr />

      {/* Lista de vídeos existentes */}
      <section>
        <h2>Vídeos Existentes</h2>
        <ul>
          {videos.map((video) => (
            <li key={video.id} style={{ marginBottom: '1rem' }}>
              <strong>{video.title}</strong> - {video.description} -{' '}
              <a href={video.link} target="_blank" rel="noopener noreferrer">
                {video.link}
              </a>
              <div>
                <button onClick={() => handleDeleteVideo(video.id)}>Deletar</button>
                <button onClick={() => handleEditVideo(video)}>Editar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Formulário para editar vídeo */}
      {editVideoId && (
        <section>
          <h2>Editar Vídeo</h2>
          <form onSubmit={handleUpdateVideo}>
            <input
              type="text"
              placeholder="Título"
              value={editVideo.title}
              onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Descrição"
              value={editVideo.description}
              onChange={(e) => setEditVideo({ ...editVideo, description: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Link do YouTube"
              value={editVideo.link}
              onChange={(e) => setEditVideo({ ...editVideo, link: e.target.value })}
              required
            />
            <button type="submit">Atualizar Vídeo</button>
            <button type="button" onClick={() => setEditVideoId(null)}>
              Cancelar
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default AdminPage;
