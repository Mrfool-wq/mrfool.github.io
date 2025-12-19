document.addEventListener('DOMContentLoaded', () => {
    
    const buttons = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.page-section');
    const slider = document.querySelector('.nav-slider');
    
    const navMiddle = document.querySelector('.nav-middle');
    const navBottom = document.querySelector('.nav-bottom');

    function moveSlider(targetBtn) {
        slider.style.opacity = '1';
        
        if(window.innerWidth > 900) {
            let topPosition = 0;
            if (navMiddle.contains(targetBtn)) {
                 topPosition = targetBtn.offsetTop + navMiddle.offsetTop;
            } else if (navBottom.contains(targetBtn)) {
                 topPosition = targetBtn.offsetTop + navBottom.offsetTop;
            }
            slider.style.top = `${topPosition}px`; 
            slider.style.left = '50%'; 
            slider.style.transform = 'translateX(-50%)';
            slider.style.width = '50px'; slider.style.height = '50px';
        } else {
            const rect = targetBtn.getBoundingClientRect();
            const parentRect = document.querySelector('.navbar').getBoundingClientRect();
            slider.style.left = `${rect.left - parentRect.left}px`;
            slider.style.top = '50%'; slider.style.transform = 'translateY(-50%)';
            slider.style.width = '40px'; slider.style.height = '40px';
        }
    }

    const activeBtn = document.querySelector('.nav-item.active');
    if(activeBtn) setTimeout(() => moveSlider(activeBtn), 100);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            if(!targetId) return;

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            moveSlider(btn);
            
            sections.forEach(s => { s.classList.remove('active'); s.style.display = 'none'; });
            const targetSection = document.getElementById(targetId);
            if(targetSection) {
                targetSection.style.display = 'block'; 
                void targetSection.offsetWidth; 
                targetSection.classList.add('active'); 
                const anims = targetSection.querySelectorAll('.fade-in-up, .stagger-container > *');
                anims.forEach(el => { el.style.animation = 'none'; el.offsetHeight; el.style.animation = null; });
            }
            if(window.innerWidth < 900) window.scrollTo(0,0);
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => { item.addEventListener('click', () => item.classList.toggle('active')); });

    window.switchTab = function(tabName) {
        const targetBtn = document.querySelector(`.nav-item[data-target="${tabName}"]`);
        if(targetBtn) targetBtn.click();
    };

    window.addEventListener('resize', () => {
        const currentBtn = document.querySelector('.nav-item.active');
        if(currentBtn) moveSlider(currentBtn);
    });
});
