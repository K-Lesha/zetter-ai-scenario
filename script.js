// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Flow cards toggle
document.querySelectorAll('.flow-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const details = this.nextElementSibling;
        const isActive = details.classList.contains('active');
        
        // Close all other flow details and reset their buttons
        document.querySelectorAll('.flow-details').forEach(detail => {
            detail.classList.remove('active');
        });
        document.querySelectorAll('.flow-toggle').forEach(btn => {
            btn.textContent = 'Подробнее';
        });
        
        // Toggle current
        if (!isActive) {
            details.classList.add('active');
            this.textContent = 'Скрыть';
        } else {
            details.classList.remove('active');
            this.textContent = 'Подробнее';
        }
    });
});

// Spoiler functionality
document.querySelectorAll('.spoiler-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isActive = this.classList.contains('active');
        
        if (!isActive) {
            this.classList.add('active');
            content.classList.add('active');
        } else {
            this.classList.remove('active');
            content.classList.remove('active');
        }
    });
});

// Accordion functionality
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const item = this.parentElement;
        const content = item.querySelector('.accordion-content');
        const isActive = item.classList.contains('active');
        
        // Close all accordions
        document.querySelectorAll('.accordion-item').forEach(accItem => {
            accItem.classList.remove('active');
            accItem.querySelector('.accordion-content').classList.remove('active');
        });
        
        // Open clicked one if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            content.classList.add('active');
        }
    });
});

// Timeline toggle
document.querySelectorAll('.timeline-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const details = this.nextElementSibling;
        const isActive = details.classList.contains('active');
        
        if (!isActive) {
            details.classList.add('active');
            this.textContent = 'Скрыть';
        } else {
            details.classList.remove('active');
            this.textContent = 'Детали';
        }
    });
});

// Modal functionality
const modal = document.getElementById('modal');
const modalBody = modal.querySelector('.modal-body');
const modalClose = modal.querySelector('.modal-close');

// Screen cards modal
const screenData = {
    1: {
        title: 'Главная страница',
        content: `
            <h3>Главная страница</h3>
            <p>Таблица всех референсов с фильтрами и сортировкой. Основной рабочий экран приложения, где пользователь видит все свои референсы и может управлять ими.</p>
            <ul>
                <li>Интерактивная таблица с референсами</li>
                <li>Фильтры по статусу, креатору, дате</li>
                <li>Сортировка по различным параметрам</li>
                <li>Быстрый доступ к действиям</li>
            </ul>
        `
    },
    2: {
        title: 'Авторизация',
        content: `
            <h3>Авторизация</h3>
            <p>Вход/регистрация пользователей. Обеспечивает безопасный доступ к системе.</p>
            <ul>
                <li>Форма входа</li>
                <li>Регистрация новых пользователей</li>
                <li>Восстановление пароля</li>
            </ul>
        `
    },
    3: {
        title: 'Добавление референса',
        content: `
            <h3>Добавление референса</h3>
            <p>Форма загрузки видео или вставки ссылки. Позволяет пользователю добавить новый референс для работы.</p>
            <ul>
                <li>Загрузка видеофайла</li>
                <li>Вставка ссылки на видео</li>
                <li>Автоматическая обработка после загрузки</li>
            </ul>
        `
    },
    4: {
        title: 'Выбор суб-сценария',
        content: `
            <h3>Выбор суб-сценария</h3>
            <p>Оверлей с 3 вариантами и формой уточнения параметров. Пользователь выбирает наиболее подходящий вариант и настраивает его.</p>
            <ul>
                <li>Отображение 3 вариантов суб-сценариев</li>
                <li>Форма уточнения параметров (ниша, бренд, тайминг)</li>
                <li>Предпросмотр выбранного варианта</li>
            </ul>
        `
    },
    5: {
        title: 'Редактирование сценария',
        content: `
            <h3>Редактирование сценария</h3>
            <p>Оверлей с текстом сценария и инструментами доработки. Позволяет улучшить готовый сценарий.</p>
            <ul>
                <li>Дописать цепляющий хук</li>
                <li>Усилить интеграцию бренда</li>
                <li>Укоротить/удлинить сценарий</li>
                <li>Упростить/усложнить текст</li>
            </ul>
        `
    },
    6: {
        title: 'Управление креаторами',
        content: `
            <h3>Управление креаторами</h3>
            <p>Список креаторов с поиском и фильтрами. Управление командой и назначение задач.</p>
            <ul>
                <li>Список всех креаторов</li>
                <li>Поиск по имени, email</li>
                <li>Фильтры по статусу активности</li>
                <li>Назначение сценариев</li>
            </ul>
        `
    },
    7: {
        title: 'Добавление креатора',
        content: `
            <h3>Добавление креатора</h3>
            <p>Форма создания нового креатора. Добавление новых членов команды в систему.</p>
            <ul>
                <li>Имя креатора</li>
                <li>Email</li>
                <li>Роль в системе</li>
                <li>Настройка прав доступа</li>
            </ul>
        `
    },
    8: {
        title: 'Настройки таблицы',
        content: `
            <h3>Настройки таблицы</h3>
            <p>Фильтры по статусу, креатору, дате; сортировка. Персонализация отображения данных.</p>
            <ul>
                <li>Фильтры по статусу</li>
                <li>Фильтры по креатору</li>
                <li>Фильтры по дате</li>
                <li>Настройка сортировки</li>
                <li>Сохранение предпочтений</li>
            </ul>
        `
    }
};

document.querySelectorAll('.screen-card').forEach(card => {
    card.addEventListener('click', function() {
        const screenId = this.dataset.screen;
        const data = screenData[screenId];
        if (data) {
            modalBody.innerHTML = data.content;
            modal.classList.add('active');
        }
    });
});

// Action buttons modal
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.dataset.modal;
        let content = '';
        
        if (action === 'view') {
            content = `
                <h3>Просмотр сценария</h3>
                <p>Здесь отображается полный текст сценария с возможностью копирования и экспорта.</p>
                <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                    <p style="font-style: italic; color: #6b7280;">Пример текста сценария будет отображаться здесь...</p>
                </div>
            `;
        } else if (action === 'edit') {
            content = `
                <h3>Редактирование сценария</h3>
                <p>Редактор сценария с инструментами доработки:</p>
                <ul>
                    <li>Дописать цепляющий хук</li>
                    <li>Усилить интеграцию бренда</li>
                    <li>Укоротить/удлинить сценарий</li>
                    <li>Упростить/усложнить текст</li>
                </ul>
            `;
        }
        
        modalBody.innerHTML = content;
        modal.classList.add('active');
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.flow-card, .screen-card, .db-card, .timeline-item, .summary-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Table row hover enhancement
document.querySelectorAll('.interactive-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Database card hover details
document.querySelectorAll('.db-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const details = this.querySelector('.db-details');
        if (details) {
            details.style.maxHeight = '200px';
            details.style.marginTop = '1rem';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const details = this.querySelector('.db-details');
        if (details) {
            details.style.maxHeight = '0';
            details.style.marginTop = '0';
        }
    });
});

