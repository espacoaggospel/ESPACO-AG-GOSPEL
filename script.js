let modalImages = [];
let currentImgIndex = 0;

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');
const whatsappLink = document.getElementById('whatsapp-link');

function openModal(imgMain, imgDetail, img2, title, price, description) {
    modal.classList.add('open');

    const allImages = [imgMain, imgDetail, img2].filter(img => img && img.trim() !== '');

    
    modalImages = [...new Set(allImages)];

    currentImgIndex = 0;

    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    if (modalImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }

    if (modalImages.length > 0) {
        modalImg.classList.remove('img-animate');
        modalImg.style.opacity = 1;
        modalImg.src = modalImages[currentImgIndex];

        requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        modalImg.classList.add('img-animate');
    });
});
    }

    modalTitle.innerText = title;
    modalPrice.innerText = price;
    modalDescription.innerText = description;

    const numDona = "5517992613608";
    const msg = encodeURIComponent(`Olá! Gostaria de encomendar a ${title} por ${price}. Vi no site!`);
    whatsappLink.href = `https://wa.me/${numDona}?text=${msg}`;
}

function closeModal() {
    modal.classList.remove('open');
}

function changeImg(step) {
    if (modalImages.length <= 1) return;

    currentImgIndex += step;

    if (currentImgIndex >= modalImages.length) {
        currentImgIndex = 0;
    }

    if (currentImgIndex < 0) {
        currentImgIndex = modalImages.length - 1;
    }

    const isMobile = window.innerWidth <= 768;

    modalImg.classList.remove(
        'img-animate',
        'img-exit-left',
        'img-exit-right',
        'img-enter-left',
        'img-enter-right'
    );

    if (isMobile) {
        modalImg.style.opacity = 0;

        setTimeout(() => {
            modalImg.src = modalImages[currentImgIndex];
            modalImg.style.opacity = 1;
        }, 120);

        return;
    }

    const exitClass = step > 0 ? 'img-exit-left' : 'img-exit-right';
    const enterClass = step > 0 ? 'img-enter-right' : 'img-enter-left';

    modalImg.classList.add(exitClass);

    setTimeout(() => {
        modalImg.src = modalImages[currentImgIndex];
        modalImg.classList.remove(exitClass);
        modalImg.classList.add(enterClass);

        setTimeout(() => {
            modalImg.classList.remove(enterClass);
            modalImg.classList.add('img-animate');
        }, 220);
    }, 180);
}

    modalImg.classList.remove('img-animate', 'img-exit-left', 'img-exit-right', 'img-enter-left', 'img-enter-right');

    const exitClass = step > 0 ? 'img-exit-left' : 'img-exit-right';
    const enterClass = step > 0 ? 'img-enter-right' : 'img-enter-left';

    modalImg.classList.add(exitClass);

    setTimeout(() => {
        modalImg.src = modalImages[currentImgIndex];
        modalImg.classList.remove(exitClass);
        modalImg.classList.add(enterClass);

        setTimeout(() => {
            modalImg.classList.remove(enterClass);
            modalImg.classList.add('img-animate');
        }, 220);
    }, 180);


modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
        closeModal();
    }

    if (e.key === 'ArrowRight') {
        changeImg(1);
    }

    if (e.key === 'ArrowLeft') {
        changeImg(-1);
    }
});

modalImg.addEventListener('error', function () {
    console.error('Imagem não encontrada:', modalImg.src);
});

// Controle das abas
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');

    event.target.classList.add('active');
}

function showTab(event, tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = 'none';
    });

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    const activeTab = document.getElementById(tabId);
    activeTab.classList.add('active');
    activeTab.style.display = 'grid';

    event.currentTarget.classList.add('active');
}

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > 80) {
        // descendo
        header.classList.add('hide-header');
    } else {
        // subindo
        header.classList.remove('hide-header');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');

    pages.forEach(page => {
        page.classList.remove('active');
    });

    setTimeout(() => {
        document.getElementById(pageId).classList.add('active');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 80);
}

let touchStartY = 0;
let touchEndY = 0;

const modalContent = document.querySelector('.modal-content');

modalContent.addEventListener('touchstart', function (e) {
    touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

modalContent.addEventListener('touchend', function (e) {
    touchEndY = e.changedTouches[0].clientY;

    const diffY = touchEndY - touchStartY;

    if (diffY > 120) {
        closeModal();
    }
}, { passive: true });