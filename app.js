// app.js - 데이터 분석가 포트폴리오 JavaScript

// DOM 요소 선택
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgress = document.getElementById('scroll-progress');
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

// 스크롤 스파이 기능
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // 초기 로드 시 실행
}

// 스크롤 진행률 인디케이터
function initScrollProgress() {
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = `${scrollPercent}%`;
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // 초기 로드 시 실행
}

// 부드러운 스크롤 네비게이션
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 네비 높이 고려
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skills 필터 기능
function initSkillsFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 활성 버튼 변경
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.pointerEvents = 'auto';
                } else {
                    card.style.opacity = '0.3';
                    card.style.transform = 'scale(0.95)';
                    card.style.pointerEvents = 'none';
                }
            });
        });
    });
}

// 스크롤 애니메이션
function initScrollAnimation() {
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
    
    // 애니메이션할 요소들
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .impact-card, .chart-card, .timeline-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 차트 초기화
function initCharts() {
    // 월별 분석 프로젝트 추이 (선 그래프)
    const monthlyProjectsCtx = document.getElementById('monthlyProjectsChart').getContext('2d');
    new Chart(monthlyProjectsCtx, {
        type: 'line',
        data: {
            labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
            datasets: [{
                label: '프로젝트 수',
                data: [0, 1, 1, 1, 1, 0],
                borderColor: '#00E5FF',
                backgroundColor: 'rgba(0, 229, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cccccc'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cccccc'
                    }
                }
            }
        }
    });
    
    // 기술 스택 사용 빈도 (막대 그래프)
    const techStackCtx = document.getElementById('techStackChart').getContext('2d');
    new Chart(techStackCtx, {
        type: 'bar',
        data: {
            labels: ['Python', 'SQL', 'Excel', 'Tableau'],
            datasets: [{
                label: '사용 빈도 (%)',
                data: [40, 30, 20, 10],
                backgroundColor: [
                    'rgba(0, 229, 255, 0.8)',
                    'rgba(156, 39, 176, 0.8)',
                    'rgba(255, 64, 129, 0.8)',
                    'rgba(76, 175, 80, 0.8)'
                ],
                borderColor: [
                    '#00E5FF',
                    '#9C27B0',
                    '#FF4081',
                    '#4CAF50'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cccccc'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#cccccc'
                    }
                }
            }
        }
    });
    
    // 성과 지표 퍼널 (도넛 차트)
    const performanceFunnelCtx = document.getElementById('performanceFunnelChart').getContext('2d');
    new Chart(performanceFunnelCtx, {
        type: 'doughnut',
        data: {
            labels: ['데이터 수집', '분석', '시각화', '인사이트'],
            datasets: [{
                data: [100, 80, 60, 40],
                backgroundColor: [
                    'rgba(0, 229, 255, 0.8)',
                    'rgba(156, 39, 176, 0.8)',
                    'rgba(255, 64, 129, 0.8)',
                    'rgba(76, 175, 80, 0.8)'
                ],
                borderColor: [
                    '#00E5FF',
                    '#9C27B0',
                    '#FF4081',
                    '#4CAF50'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#cccccc'
                    }
                }
            }
        }
    });
}

// 폼 제출 처리
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 간단한 폼 검증
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        if (!name || !email || !message) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        // 실제로는 서버로 전송
        alert('메시지가 전송되었습니다. 감사합니다!');
        form.reset();
    });
}

// 초기화 함수
function init() {
    initScrollSpy();
    initScrollProgress();
    initSmoothScroll();
    initSkillsFilter();
    initScrollAnimation();
    initCharts();
    initContactForm();
}

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', init);
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