document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '/entrar';
        return;
    }

    // Função para buscar e exibir as metas
    const fetchMetas = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/goals', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const metas = await response.json();
                const metasList = document.getElementById('metas-list');
                metasList.innerHTML = '';

                metas.forEach(meta => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${meta.titulo}</td>
                        <td><img src="${meta.Curso.imagem}" alt="Icon for ${meta.Curso.nome}"> ${meta.Curso.nome}</td>
                        <td>${meta.dia}</td>
                        <td>${meta.duracao} Horas</td>
                        <td class="actions">
                            <i class="fas fa-edit" style="color: #ffc107;" data-id="${meta.id}"></i>
                            <i class="fas fa-trash" style="color: red;" data-id="${meta.id}"></i>
                        </td>
                    `;
                    metasList.appendChild(row);
                });

                // Adicionar evento de edição
                document.querySelectorAll('.fa-edit').forEach(button => {
                    button.addEventListener('click', async (e) => {
                        const metaId = e.target.getAttribute('data-id');
                        const meta = metas.find(m => m.id == metaId);
                        openEditModal(meta);
                    });
                });

                // Adicionar evento de exclusão
                document.querySelectorAll('.fa-trash').forEach(button => {
                    button.addEventListener('click', async (e) => {
                        const metaId = e.target.getAttribute('data-id');
                        await deleteMeta(metaId);
                        fetchMetas();
                    });
                });
            } else {
                const errorData = await response.json();
                alert(`Erro ao obter metas: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Erro ao conectar com o servidor');
        }
    };

    // Função para excluir uma meta
    const deleteMeta = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/goals/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro ao excluir meta: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Erro ao conectar com o servidor');
        }
    };

    // Função para adicionar ou editar uma meta
    const saveMeta = async (meta) => {
        const method = meta.id ? 'PUT' : 'POST';
        const url = meta.id ? `http://localhost:3000/api/goals/${meta.id}` : 'http://localhost:3000/api/goals';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(meta)
            });

            if (response.ok) {
                fetchMetas();
            } else {
                const errorData = await response.json();
                alert(`Erro ao salvar meta: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Erro ao conectar com o servidor');
        }
    };

    // Função para abrir o modal de adicionar meta
    const openAddModal = () => {
        document.getElementById('modal-title').textContent = 'Adicionar Meta';
        document.getElementById('meta-id').value = '';
        document.getElementById('titulo').value = '';
        document.getElementById('curso').value = '';
        document.getElementById('dia').value = '';
        document.getElementById('hora').value = '';
        document.getElementById('duracao').value = '';
        document.getElementById('add-meta-modal').style.display = 'block';
    };

    // Função para abrir o modal de editar meta
    const openEditModal = (meta) => {
        document.getElementById('modal-title').textContent = 'Editar Meta';
        document.getElementById('meta-id').value = meta.id;
        document.getElementById('titulo').value = meta.titulo;
        document.getElementById('curso').value = meta.curso_id;
        document.getElementById('dia').value = meta.dia;
        document.getElementById('hora').value = meta.hora;
        document.getElementById('duracao').value = meta.duracao;
        document.getElementById('add-meta-modal').style.display = 'block';
    };

    // Evento para abrir o modal de adicionar meta
    document.getElementById('add-meta-btn').addEventListener('click', openAddModal);

    // Evento para fechar o modal de adicionar meta
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('add-meta-modal').style.display = 'none';
    });

    // Evento para adicionar ou editar uma meta
    document.getElementById('add-meta-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('meta-id').value;
        const titulo = document.getElementById('titulo').value;
        const curso_id = document.getElementById('curso').value;
        const dia = document.getElementById('dia').value;
        const hora = document.getElementById('hora').value;
        const duracao = document.getElementById('duracao').value;

        const meta = { id, titulo, curso_id, dia, hora, duracao };
        await saveMeta(meta);
        document.getElementById('add-meta-modal').style.display = 'none';
    });

    // Função para buscar e exibir os cursos no select
    const fetchCursos = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/courses', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const cursos = await response.json();
                const cursoSelect = document.getElementById('curso');
                cursoSelect.innerHTML = '';

                cursos.forEach(curso => {
                    const option = document.createElement('option');
                    option.value = curso.id;
                    option.textContent = curso.nome;
                    cursoSelect.appendChild(option);
                });
            } else {
                const errorData = await response.json();
                alert(`Erro ao obter cursos: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Erro ao conectar com o servidor');
        }
    };

    // Inicializar a página
    fetchMetas();
    fetchCursos();
});