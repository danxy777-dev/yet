/* ============================================
   TDA TEAM DOURADO — Interações
   Vanilla JS · sem dependências externas
   ============================================ */

(function () {
    'use strict';

    /* ============================================
       CONFIGURAÇÃO CENTRAL
       Edite apenas este bloco quando precisar
       atualizar WhatsApp ou Instagram.
       ============================================ */
    const CONFIG = {
        whatsapp: '5511949132603',
        whatsappMessage: 'Olá! Vim pelo site da TDA Team Dourado e gostaria de saber mais sobre a academia.',
        // Instagram oficial: descomente e preencha quando a academia confirmar.
        instagram: 'https://www.instagram.com/teamdouradoacademia',
    };

    const whatsappURL = 'https://wa.me/' + CONFIG.whatsapp +
        '?text=' + encodeURIComponent(CONFIG.whatsappMessage);

    /* ============================================
       ELEMENTOS BASE
       ============================================ */
    const body = document.body;
    const header = document.getElementById('header');
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    const navLinks = nav ? nav.querySelectorAll('.nav__link') : [];
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('.lightbox__img') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox__close') : null;
    const lightboxNav = lightbox ? lightbox.querySelectorAll('.lightbox__nav') : [];
    const yearEl = document.getElementById('current-year');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ============================================
       UTILITÁRIOS
       ============================================ */
    function lockBody() {
        body.classList.add('no-scroll');
    }

    function unlockBody() {
        if (isOverlayOpen()) return;
        body.classList.remove('no-scroll');
    }

    function isMenuOpen() {
        return !!(nav && nav.classList.contains('open'));
    }

    function isLightboxOpen() {
        return !!(lightbox && lightbox.classList.contains('open'));
    }

    function isOverlayOpen() {
        return isMenuOpen() || isLightboxOpen();
    }

    /* ============================================
       WHATSAPP + INSTAGRAM (links centralizados)
       ============================================ */
    function applyWhatsappLinks() {
        document.querySelectorAll('[data-whatsapp]').forEach(function (link) {
            link.setAttribute('href', whatsappURL);
            if (!link.hasAttribute('target')) link.setAttribute('target', '_blank');
            if (!link.hasAttribute('rel')) link.setAttribute('rel', 'noopener noreferrer');
        });
    }

    function applyInstagramLinks() {
        document.querySelectorAll('[data-instagram]').forEach(function (link) {
            if (!CONFIG.instagram) {
                // Sem Instagram oficial: mantém como link neutro, sem navegar para "#".
                link.setAttribute('aria-disabled', 'true');
                link.setAttribute('tabindex', '-1');
                link.setAttribute('href', '#');
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                }, { once: false });
                return;
            }
            link.setAttribute('href', CONFIG.instagram);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            link.removeAttribute('aria-disabled');
            link.removeAttribute('tabindex');
        });
    }

    /* ============================================
       MENU MOBILE
       ============================================ */
    function openMenu() {
        if (!toggle || !nav) return;
        nav.classList.add('open');
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Fechar menu');
        lockBody();
    }

    function closeMenu() {
        if (!toggle || !nav) return;
        nav.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
        unlockBody();
    }

    function initMobileMenu() {
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            isMenuOpen() ? closeMenu() : openMenu();
        });

        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (isMenuOpen()) closeMenu();
            });
        });

        // Fecha ao redimensionar para desktop, evitando body travado.
        let resizeTimer = null;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (window.innerWidth > 768 && isMenuOpen()) {
                    closeMenu();
                }
            }, 100);
        }, { passive: true });
    }

    /* ============================================
       HEADER AO SCROLL
       ============================================ */
    function initHeaderScroll() {
        if (!header) return;
        const update = function () {
            header.classList.toggle('scrolled', window.scrollY > 30);
        };
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    /* ============================================
       ATALHO DE ESC PARA FECHAR MENU / LIGHTBOX
       ============================================ */
    function initGlobalEscape() {
        document.addEventListener('keydown', function (event) {
            if (event.key !== 'Escape') return;
            if (isLightboxOpen()) { closeLightbox(); return; }
            if (isMenuOpen()) { closeMenu(); return; }
        });
    }

    /* ============================================
       SCROLL SUAVE PARA LINKS INTERNOS
       Considera a altura do header e usa o CSS
       scroll-behavior como base.
       ============================================ */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (event) {
                const targetId = this.getAttribute('href');
                if (!targetId || targetId === '#' || targetId.length < 2) return;

                let target;
                try { target = document.querySelector(targetId); }
                catch (err) { return; }
                if (!target) return;

                event.preventDefault();

                const headerHeight = header ? header.offsetHeight : 80;
                const targetTop = target.getBoundingClientRect().top +
                    window.scrollY - headerHeight;

                window.scrollTo({
                    top: Math.max(0, targetTop),
                    behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
                });

                if (history.pushState && targetId !== '#hero') {
                    history.pushState(null, '', targetId);
                }
            });
        });
    }

    /* ============================================
       REVEAL ON SCROLL (IntersectionObserver)
       ============================================ */
    function initReveal() {
        const reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
            reveals.forEach(function (el) { el.classList.add('visible'); });
            return;
        }

        const observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -70px 0px' });

        reveals.forEach(function (el) { observer.observe(el); });
    }

    /* ============================================
       STAGGER AUTOMÁTICO
       Aplica delays crescentes aos grupos de
       cards sem criar dezenas de classes.
       ============================================ */
    function initStagger() {
        const groups = [
            '.estrutura__grid',
            '.experiencia__grid',
            '.escolher__list',
            '.galeria__grid',
            '.contato__buttons',
            '.impact__values'
        ];

        groups.forEach(function (selector) {
            const group = document.querySelector(selector);
            if (!group) return;
            const items = group.querySelectorAll('.reveal');
            items.forEach(function (el, index) {
                el.style.setProperty('--reveal-delay', (index * 80) + 'ms');
            });
        });
    }

    /* ============================================
       LINK ATIVO NO MENU (IntersectionObserver)
       Marca o link da seção atualmente visível.
       ============================================ */
    function initActiveNav() {
        if (!navLinks.length) return;

        const sections = Array.from(document.querySelectorAll('main section[id]'))
            .concat(Array.from(document.querySelectorAll('.bloco-comunidade[id]')));

        if (!sections.length) return;

        const setActive = function (id) {
            navLinks.forEach(function (link) {
                const isActive = link.getAttribute('href') === '#' + id;
                link.classList.toggle('active', isActive);
            });
        };

        if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
            // Fallback: usa scrollY em rAF.
            let ticking = false;
            const onScroll = function () {
                if (ticking) return;
                ticking = true;
                window.requestAnimationFrame(function () {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const scrollPos = window.scrollY + headerHeight + 120;
                    let currentId = '';
                    sections.forEach(function (s) {
                        const top = s.offsetTop;
                        const bottom = top + s.offsetHeight;
                        if (scrollPos >= top && scrollPos < bottom) currentId = s.id;
                    });
                    if (currentId) setActive(currentId);
                    ticking = false;
                });
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

        sections.forEach(function (s) { observer.observe(s); });
    }

    /* ============================================
       ANO ATUAL
       ============================================ */
    function initCurrentYear() {
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    /* ============================================
       LIGHTBOX
       ============================================ */
    let galleryItems = [];
    let currentIndex = 0;

    function refreshGallery() {
        galleryItems = Array.from(document.querySelectorAll('[data-lightbox]'));
    }

    function openLightbox(index) {
        if (!lightbox || !lightboxImg) return;
        if (!galleryItems.length) return;
        if (index < 0 || index >= galleryItems.length) return;

        currentIndex = index;
        const item = galleryItems[index];
        const imgEl = item.querySelector('img');

        lightboxImg.src = item.getAttribute('href');
        lightboxImg.alt = imgEl ? (imgEl.getAttribute('alt') || '') : '';
        lightboxImg.classList.remove('loaded');

        lightboxImg.onload = function () {
            lightboxImg.classList.add('loaded');
        };

        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        lockBody();
    }

    function closeLightbox() {
        if (!lightbox || !lightboxImg) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        unlockBody();
    }

    function showNext() {
        if (!galleryItems.length) return;
        openLightbox((currentIndex + 1) % galleryItems.length);
    }

    function showPrev() {
        if (!galleryItems.length) return;
        openLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length);
    }

    function initLightbox() {
        if (!lightbox || !lightboxImg) return;
        refreshGallery();
        if (!galleryItems.length) return;

        galleryItems.forEach(function (item, index) {
            item.addEventListener('click', function (event) {
                event.preventDefault();
                openLightbox(index);
            });
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        // Fecha ao clicar fora da imagem.
        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) closeLightbox();
        });

        // Navegação por teclado.
        document.addEventListener('keydown', function (event) {
            if (!isLightboxOpen()) return;
            if (event.key === 'ArrowRight') showNext();
            if (event.key === 'ArrowLeft') showPrev();
        });

        // Setas visuais no lightbox.
        lightboxNav.forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                event.stopPropagation();
                if (btn.classList.contains('lightbox__nav--next')) showNext();
                else showPrev();
            });
        });

        // Swipe no mobile.
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', function (event) {
            touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', function (event) {
            touchEndX = event.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) < 50) return;
            if (diff < 0) showNext(); else showPrev();
        }, { passive: true });
    }

    /* ============================================
       PARALLAX DO HERO
       Usa rAF para evitar cálculos no scroll.
       Desativa se prefers-reduced-motion.
       ============================================ */
    function initParallax() {
        if (prefersReducedMotion.matches) return;
        const hero = document.querySelector('.hero');
        const heroBg = document.querySelector('.hero__bg');
        if (!hero || !heroBg) return;

        let ticking = false;
        const update = function () {
            const y = window.scrollY;
            if (y <= hero.offsetHeight) {
                heroBg.style.transform = 'translate3d(0, ' + (y * 0.18) + 'px, 0) scale(1.05)';
            }
            ticking = false;
        };

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
    }

    /* ============================================
       INICIALIZAÇÃO
       ============================================ */
    function init() {
        applyWhatsappLinks();
        applyInstagramLinks();
        initMobileMenu();
        initHeaderScroll();
        initGlobalEscape();
        initSmoothScroll();
        initReveal();
        initStagger();
        initActiveNav();
        initCurrentYear();
        initLightbox();
        initParallax();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
