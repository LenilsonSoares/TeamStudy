document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '/entrar';
        return;
    }

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                document.getElementById('profile-picture').src = userData.foto || 'assets/default.png';
                document.getElementById('user-name').textContent = userData.nome || 'Usuário';
                document.getElementById('welcome-message').textContent = `Olá, ${userData.nome}!`;
            } else {
                const errorData = await response.text();
                console.error(`Erro ao obter dados do usuário: ${errorData}`);
                throw new Error('Erro ao obter dados do usuário');
            }
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
            document.getElementById('profile-picture').src = 'assets/default.png';
            document.getElementById('user-name').textContent = 'Erro ao obter dados do usuário';
        }
    };

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/dashboard', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const dashboardData = await response.json();
                document.getElementById('courses-completed').textContent = dashboardData.coursesCompleted;
                document.getElementById('study-days').textContent = dashboardData.studyDays;
                document.getElementById('average-progress').textContent = `${dashboardData.averageProgress}%`;

                const classHistoryContainer = document.getElementById('class-history');
                classHistoryContainer.innerHTML = '';
                dashboardData.classHistory.forEach(item => {
                    const classItem = document.createElement('div');
                    classItem.className = 'item';
                    classItem.innerHTML = `
                        <img src="${item.icon}" alt="${item.title} icon" width="40" height="40"/>
                        <div class="details">
                            <h4>${item.title}</h4>
                            <p>${item.category}</p>
                        </div>
                        <div class="time">${item.timeAgo}</div>
                    `;
                    classHistoryContainer.appendChild(classItem);
                });

                const courseHistoryContainer = document.getElementById('course-history');
                courseHistoryContainer.innerHTML = '';
                dashboardData.courseHistory.forEach(item => {
                    const courseItem = document.createElement('div');
                    courseItem.className = 'item';
                    courseItem.innerHTML = `
                        <img src="${item.icon}" alt="${item.title} icon" width="40" height="40"/>
                        <div class="details">
                            <h4>${item.title}</h4>
                            <p>${item.status}</p>
                            <div class="progress-bar">
                                <div class="progress ${item.progressColor}" style="width: ${item.progressPercentage}%;"></div>
                            </div>
                        </div>
                    `;
                    courseHistoryContainer.appendChild(courseItem);
                });
            } else {
                const errorData = await response.text();
                console.error(`Erro ao obter dados do dashboard: ${errorData}`);
                throw new Error('Erro ao obter dados do dashboard');
            }
        } catch (error) {
            console.error('Erro ao obter dados do dashboard:', error);
            alert('Erro ao obter dados do dashboard. Por favor, tente novamente mais tarde.');
        }
    };

    await fetchUserData();
    await fetchDashboardData();
});