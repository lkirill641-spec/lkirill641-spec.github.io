// Ждем загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // Находим форму
    const form = document.getElementById('feedbackForm');
    
    if (form) {
        // Обработка отправки формы
        form.addEventListener('submit', function(event) {
            // Отменяем стандартную отправку
            event.preventDefault();
            
            // Получаем значения полей
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const comment = document.getElementById('comment').value.trim();
            
            // Очищаем предыдущие ошибки
            clearErrors();
            
            // Флаг валидности
            let isValid = true;
            
            // Проверяем имя
            if (name === '') {
                showError('name', 'nameError', 'Введите ваше имя');
                isValid = false;
            }
            
            // Проверяем email
            if (email === '') {
                showError('email', 'emailError', 'Введите email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'emailError', 'Введите корректный email');
                isValid = false;
            }
            
            // Проверяем комментарий
            if (comment === '') {
                showError('comment', 'commentError', 'Введите текст комментария');
                isValid = false;
            }
            
            // Если все поля заполнены правильно
            if (isValid) {
                showSuccess(name, email, comment);
                form.reset();
            }
        });
        
        // Функция показа ошибки
        function showError(inputId, errorId, message) {
            const errorElement = document.getElementById(errorId);
            const inputElement = document.getElementById(inputId);
            
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            inputElement.classList.add('error');
        }
        
        // Функция очистки ошибок
        function clearErrors() {
            const errorMessages = document.querySelectorAll('.error-message');
            const inputs = document.querySelectorAll('.form-input, .form-textarea');
            
            errorMessages.forEach(function(error) {
                error.textContent = '';
                error.style.display = 'none';
            });
            
            inputs.forEach(function(input) {
                input.classList.remove('error');
            });
        }
        
        // Функция проверки email
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Функция показа успеха
        function showSuccess(name, email, comment) {
            const resultDiv = document.getElementById('formResult');
            
            const successHTML = `
                <div class="success-card">
                    <h3>🎉 Спасибо, ${escapeHtml(name)}!</h3>
                    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                    <p><strong>Сообщение:</strong></p>
                    <p>${escapeHtml(comment)}</p>
                    <p>Мы ответим вам в ближайшее время!</p>
                </div>
            `;
            
            resultDiv.innerHTML = successHTML;
            
            // Через 5 секунд скрываем
            setTimeout(function() {
                resultDiv.innerHTML = '';
            }, 5000);
        }
        
        // Функция экранирования HTML
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }
});