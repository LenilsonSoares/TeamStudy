document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '/entrar';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/courses', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const courses = await response.json();
            const coursesList = document.getElementById('courses-list');
            coursesList.innerHTML = '';

            courses.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.className = 'course-card';

                courseCard.innerHTML = `
                    <img src="${course.imagem}" alt="${course.nome} course image"/>
                    <h2>${course.nome}</h2>
                    <p>${course.descricao}</p>
                    <p class="course-duration">${course.duracao} H</p>
                    <button class="start-btn">Iniciar!</button>
                `;

                coursesList.appendChild(courseCard);
            });
        } else {
            const errorData = await response.json();
            alert(`Erro ao buscar cursos: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
});