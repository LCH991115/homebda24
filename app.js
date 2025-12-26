// app.js - 데이터 분석가 포트폴리오 JavaScript

// DOM 요소 선택
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const backToTopBtn = document.getElementById('back-to-top');
const expandBtns = document.querySelectorAll('.expand-btn');
const accordionHeaders = document.querySelectorAll('.accordion-header');
const tabButtons = document.querySelectorAll('.tab-button');
const projectCards = document.querySelectorAll('.project-card');

// 테마 관리
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDark) {
        body.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
}

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// 부드러운 스크롤 네비게이션
function initSmoothScroll() {
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
}

// Back to top 버튼
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 프로젝트 카드 확장/축소
function initProjectExpansion() {
    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const details = btn.nextElementSibling;
            const isExpanded = details.style.display === 'block';

            // 모든 세부사항 닫기
            document.querySelectorAll('.project-details').forEach(detail => {
                detail.style.display = 'none';
            });

            // 클릭한 카드만 열기
            if (!isExpanded) {
                details.style.display = 'block';
            }
        });
    });
}

// 아코디언 기능
function initAccordion() {
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isOpen = content.style.display === 'block';

            // 같은 카드 내의 모든 아코디언 닫기
            const card = header.closest('.project-details');
            card.querySelectorAll('.accordion-content').forEach(cont => {
                cont.style.display = 'none';
            });

            // 클릭한 아코디언 열기
            if (!isOpen) {
                content.style.display = 'block';
            }
        });
    });
}

// 프로젝트 필터링
function initProjectFilter() {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // 탭 버튼 활성화 상태 변경
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 프로젝트 카드 필터링
            projectCards.forEach(card => {
                const tech = card.getAttribute('data-tech');
                if (filter === 'all' || tech === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Intersection Observer로 섹션 애니메이션
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    // 애니메이션 적용할 요소들
    document.querySelectorAll('section > .container').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Chart.js로 KPI 차트 초기화
function initChart() {
    const ctx = document.getElementById('kpiChart').getContext('2d');

    // 샘플 데이터 (가상 데이터)
    const data = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
        datasets: [{
            label: '매출 추이 (만원)',
            data: [120, 150, 180, 200, 250, 300],
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            tension: 0.4,
            fill: true
        }, {
            label: '고객 수',
            data: [50, 65, 80, 95, 110, 130],
            borderColor: '#ff6b6b',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'var(--text-primary)'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'var(--text-secondary)'
                    },
                    grid: {
                        color: 'var(--card-border)'
                    }
                },
                y: {
                    ticks: {
                        color: 'var(--text-secondary)'
                    },
                    grid: {
                        color: 'var(--card-border)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    };

    new Chart(ctx, config);
}

// 이벤트 리스너 설정
function initEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
}

// 초기화 함수
function init() {
    initTheme();
    initSmoothScroll();
    initBackToTop();
    initProjectExpansion();
    initAccordion();
    initProjectFilter();
    initScrollAnimation();
    initChart();
    initEventListeners();
}

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', init);