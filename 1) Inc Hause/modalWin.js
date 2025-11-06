// modalWin.js
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("registrationModal");
    const closeBtn = document.querySelector(".close");
    const registrationForm = document.getElementById("registrationForm");
    const loginForm = document.getElementById("loginFormElement");
    
    // Формы
    const registerFormContainer = document.getElementById("registerForm");
    const loginFormContainer = document.getElementById("loginForm");
    
    // Кнопки переключения
    const switchButtons = document.querySelectorAll('.switch-form');
    
    // Проверяем, существуют ли элементы
    if (!modal || !closeBtn || !registrationForm || !loginForm) {
        console.error('Не найдены элементы модального окна');
        return;
    }
    
    // Функция переключения между формами
    function switchForm(target) {
        if (target === 'login') {
            registerFormContainer.classList.remove('active');
            loginFormContainer.classList.add('active');
        } else {
            loginFormContainer.classList.remove('active');
            registerFormContainer.classList.add('active');
        }
    }
    
    // Обработчики для кнопок переключения
    switchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            switchForm(target);
        });
    });
    
    // Получаем все кнопки "В корзину"
    const addToCartButtons = document.querySelectorAll('.catalog-item-button');
    
    // Добавляем обработчик для каждой кнопки
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Получаем данные о товаре
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            
            // Сохраняем эти данные для использования в форме
            localStorage.setItem('selectedProduct', productName);
            localStorage.setItem('selectedPrice', productPrice);
            
            // Показываем модальное окно с формой регистрации
            modal.style.display = "block";
            document.body.style.overflow = 'hidden';
            
            // Показываем форму регистрации по умолчанию
            switchForm('register');
        });
    });
    
    // Закрытие модального окна
    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
    
    // Закрытие при клике вне окна
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }
    
    // Обработка отправки формы регистрации
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            product: localStorage.getItem('selectedProduct'),
            price: localStorage.getItem('selectedPrice')
        };
        
        // Здесь можно отправить данные на сервер
        console.log('Данные для регистрации:', formData);
        
        // Закрываем модальное окно
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
        
        // Очищаем форму
        registrationForm.reset();
        
        // Показываем сообщение об успехе
        alert('Регистрация прошла успешно! Товар добавлен в корзину.');
    });
    
    // Обработка отправки формы входа
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value,
            product: localStorage.getItem('selectedProduct'),
            price: localStorage.getItem('selectedPrice')
        };
        
        // Здесь можно отправить данные на сервер
        console.log('Данные для входа:', formData);
        
        // Закрываем модальное окно
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
        
        // Очищаем форму
        loginForm.reset();
        
        // Показываем сообщение об успехе
        alert('Вход выполнен успешно! Товар добавлен в корзину.');
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
});