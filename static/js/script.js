// Sidebar toggle funksiyasi
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle for mobile and desktop
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const overlay = document.querySelector('.overlay');
    
    // Agar overlay mavjud bo'lmasa, yaratamiz
    if (!overlay && sidebar) {
        const newOverlay = document.createElement('div');
        newOverlay.className = 'overlay';
        document.body.appendChild(newOverlay);
    }
    
    const currentOverlay = document.querySelector('.overlay');
    
    if (menuToggle && sidebar && mainContent) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            mainContent.classList.toggle('expanded');
            
            if (currentOverlay) {
                currentOverlay.classList.toggle('active');
            }
            
            // Iconni o'zgartirish
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (sidebar.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // Overlay bosilganda sidebar yopilishi
        if (currentOverlay) {
            currentOverlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                mainContent.classList.remove('expanded');
                currentOverlay.classList.remove('active');
                
                // Iconni qaytarish
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        }
    }
    
    // Window resize bo'lganda sidebar holatini tekshirish
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar && mainContent) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('expanded');
            
            if (currentOverlay) {
                currentOverlay.classList.remove('active');
            }
            
            // Iconni qaytarish
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    });
    
    // Form validation enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let valid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = '#dc3545';
                    
                    // Xabar ko'rsatish
                    let errorMessage = field.parentNode.querySelector('.field-error');
                    if (!errorMessage) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'field-error';
                        errorMessage.style.color = '#dc3545';
                        errorMessage.style.fontSize = '12px';
                        errorMessage.style.marginTop = '5px';
                        field.parentNode.appendChild(errorMessage);
                    }
                    errorMessage.textContent = 'Ushbu maydonni to\'ldirish shart';
                } else {
                    field.style.borderColor = '#ced4da';
                    
                    // Xabarni olib tashlash
                    const errorMessage = field.parentNode.querySelector('.field-error');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (!valid) {
                e.preventDefault();
            }
        });
    });
    
    // Password confirmation check
    const registrationForm = document.querySelector('form[action*="doRegistration"]');
    if (registrationForm) {
        const password = registrationForm.querySelector('input[name="password"]');
        const confirmPassword = registrationForm.querySelector('input[name="confirmPassword"]');
        
        if (password && confirmPassword) {
            // Real-time password match check
            const checkPasswords = () => {
                if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
                    confirmPassword.style.borderColor = '#dc3545';
                    
                    let errorMessage = confirmPassword.parentNode.querySelector('.password-error');
                    if (!errorMessage) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'password-error';
                        errorMessage.style.color = '#dc3545';
                        errorMessage.style.fontSize = '12px';
                        errorMessage.style.marginTop = '5px';
                        confirmPassword.parentNode.appendChild(errorMessage);
                    }
                    errorMessage.textContent = 'Parollar mos kelmadi';
                } else {
                    confirmPassword.style.borderColor = '#ced4da';
                    
                    const errorMessage = confirmPassword.parentNode.querySelector('.password-error');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            };
            
            password.addEventListener('input', checkPasswords);
            confirmPassword.addEventListener('input', checkPasswords);
            
            // Form submitda tekshirish
            registrationForm.addEventListener('submit', function(e) {
                if (password.value !== confirmPassword.value) {
                    e.preventDefault();
                    alert('Parollar mos kelmadi. Iltimos, qayta tekshiring.');
                    confirmPassword.focus();
                }
            });
        }
    }
});