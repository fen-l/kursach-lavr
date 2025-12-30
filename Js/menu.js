
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const html = document.documentElement;
    
    if (mobileMenuButton && mobileMenu) {
        let isAnimating = false;
        
        function toggleMobileMenu(isOpen) {
            if (isAnimating) return;
            isAnimating = true;
            
            mobileMenuButton.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
            
            if (isOpen) {
                mobileMenuButton.classList.add('active');
                mobileMenu.classList.add('active');
                html.classList.add('menu-open');
                
                setTimeout(() => {
                    isAnimating = false;
                }, 400);
            } else {
                mobileMenuButton.classList.remove('active');
                mobileMenu.classList.remove('active');
                html.classList.remove('menu-open');
                
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            }
        }
        
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            toggleMobileMenu(!isExpanded);
        });
        
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    toggleMobileMenu(false);
                }, 200);
            });
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMobileMenu(false);
                mobileMenuButton.focus();
            }
        });
        
        document.addEventListener('click', function(event) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(event.target) && 
                !mobileMenuButton.contains(event.target)) {
                toggleMobileMenu(false);
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                toggleMobileMenu(false);
            }
        });
    }
});