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
        document.getElementById('duracao').value = '';
        document.getElementById('add-meta-modal').style.display = 'block';
    };

    // Função para abrir o modal de editar meta
    const openEditModal = (meta) => {
        document.getElementById('modal-title').textContent = 'Editar Meta';
        document.getElementById('meta-id').value = meta.id;
        document.getElementById('titulo').value = meta.titulo;
        document.getElementById('curso').value = meta.Curso.nome;
        document.getElementById('dia').value = meta.dia;
        document.getElementById('duracao').value = meta.duracao;
        document.getElementById('add-meta-modal').style.display = 'block';
    };

    // Fechar o modal
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('add-meta-modal').style.display = 'none';
    });

    // Salvar meta ao enviar o formulário
    document.getElementById('add-meta-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const meta = {
            id: document.getElementById('meta-id').value,
            titulo: document.getElementById('titulo').value,
            Curso: { nome: document.getElementById('curso').value },
            dia: document.getElementById('dia').value,
            duracao: document.getElementById('duracao').value
        };
        await saveMeta(meta);
        document.getElementById('add-meta-modal').style.display = 'none';
    });

    // Abrir modal de adicionar meta
    document.getElementById('add-meta-btn').addEventListener('click', openAddModal);

    // Função para gerar o calendário
    const generateCalendar = (year, month) => {
        const calendarBody = document.getElementById('calendarBody');
        calendarBody.innerHTML = '';

        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    const cell = document.createElement('td');
                    const cellText = document.createTextNode('');
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const cell = document.createElement('td');
                    const cellText = document.createTextNode(date);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    date++;
                }
            }

            calendarBody.appendChild(row);
        }
    };

    // Função para atualizar o calendário
    const updateCalendar = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        document.getElementById('monthYear').textContent = `${now.toLocaleString('default', { month: 'long' })} ${year}`;
        generateCalendar(year, month);
    };

    // Atualizar o calendário ao carregar a página
    updateCalendar();

    // Buscar e exibir as metas ao carregar a página
    fetchMetas();
});