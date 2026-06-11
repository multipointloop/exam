/**
 * 長門番堂 - 动漫周边商城
 * 主逻辑模块：导航、搜索、Toast、通用功能
 * 学号：24215220132  姓名：黄政源
 */

// ==================== Toast 消息系统 ====================
class ToastManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.id = 'toast-container';
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <span>${icons[type] || icons.info}</span>
            <span>${message}</span>
        `;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    success(message) { this.show(message, 'success'); }
    error(message) { this.show(message, 'error'); }
    warning(message) { this.show(message, 'warning'); }
    info(message) { this.show(message, 'info'); }
}

const toast = new ToastManager();

// ==================== 导航栏管理 ====================
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.renderHeader();
        this.renderFooter();
        this.bindSearch();
        this.updateBadge();
        this.initBackToTop();
        this.initMobileMenu();
    }

    // 渲染顶部导航
    renderHeader() {
        const header = document.querySelector('.site-header .header-inner');
        if (!header) return;

        const currentPath = window.location.pathname;
        const isInPages = currentPath.includes('/pages/');
        const basePath = isInPages ? '..' : '.';

        const user = getCurrentUser();

        header.innerHTML = `
            <a href="${basePath}/index.html" class="site-logo">
                <span class="logo-icon">🏮</span>
                <span>長門番堂</span>
            </a>
            <div class="header-search">
                <input type="text" id="headerSearchInput" placeholder="搜索商品..." autocomplete="off">
                <button id="headerSearchBtn" aria-label="搜索">🔍</button>
            </div>
            <button class="menu-toggle" id="menuToggle" aria-label="菜单">☰</button>
            <nav class="header-nav" id="headerNav">
                <a href="${basePath}/index.html">🏠 <span>首页</span></a>
                <a href="${basePath}/index.html#products">🛍️ <span>全部商品</span></a>
                <a href="${basePath}/pages/cart.html" class="cart-link">
                    🛒 <span>购物车</span>
                    <span class="cart-count" style="display:none;">0</span>
                </a>
                ${user ? `
                <div class="user-menu">
                    <span class="nav-btn">👤 <span>${user.username}</span> ▼</span>
                    <div class="dropdown">
                        <a href="${basePath}/pages/profile.html">📋 个人中心</a>
                        <a href="${basePath}/pages/orders.html">📦 我的订单</a>
                        <div class="divider"></div>
                        <a href="#" id="logoutBtn">🚪 退出登录</a>
                    </div>
                </div>
                ` : `
                <a href="${basePath}/pages/login.html">👤 <span>登录</span></a>
                `}
            </nav>
        `;

        // 绑定退出登录
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                logoutUser();
                toast.success('已退出登录');
                setTimeout(() => window.location.reload(), 500);
            });
        }
    }

    // 绑定搜索功能
    bindSearch() {
        const searchInput = document.getElementById('headerSearchInput');
        const searchBtn = document.getElementById('headerSearchBtn');

        if (!searchInput || !searchBtn) return;

        const doSearch = () => {
            const term = searchInput.value.trim();
            if (term) {
                const basePath = window.location.pathname.includes('/pages/') ? '..' : '.';
                window.location.href = `${basePath}/index.html?search=${encodeURIComponent(term)}`;
            }
        };

        searchBtn.addEventListener('click', doSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') doSearch();
        });
    }

    // 更新购物车徽标
    updateBadge() {
        const count = cart.getTotalCount();
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'inline-block' : 'none';
        });
    }

    // 渲染页脚
    renderFooter() {
        const footer = document.querySelector('.site-footer .footer-inner');
        if (!footer) return;

        footer.innerHTML = `
            <div class="footer-links">
                <a href="../index.html">首页</a>
                <a href="../index.html#products">全部商品</a>
                <a href="cart.html">购物车</a>
                <a href="profile.html">个人中心</a>
            </div>
            <p>長門番堂 — 动漫周边商城 | 致敬 <a href="https://yuc.wiki/" target="_blank">yuc.wiki</a></p>
            <p class="student-info">学号：24215220132 | 姓名：黄政源 | 广东东软学院 Web编程技术课程设计</p>
            <p style="margin-top:4px;font-size:0.78rem;color:var(--text-muted);">© 2026 長門番堂. 本站仅为课程设计作品，不涉及真实交易。</p>
        `;
    }

    // 回到顶部按钮
    initBackToTop() {
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = '↑';
        btn.title = '回到顶部';
        btn.setAttribute('aria-label', '回到顶部');
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });
    }

    // 移动端菜单
    initMobileMenu() {
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('headerNav');

        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });

        // 点击外部关闭
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('show');
            }
        });
    }
}

// ==================== 模态框系统 ====================
class ModalManager {
    show(title, content, actions = []) {
        // 移除已有模态框
        this.close();

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.id = 'modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'modal';

        let actionsHTML = '';
        if (actions.length > 0) {
            actionsHTML = `<div class="modal-actions">${actions.map(a =>
                `<button class="btn ${a.cls || 'btn-outline'}" data-action="${a.action || ''}">${a.text}</button>`
            ).join('')}</div>`;
        }

        modal.innerHTML = `
            <h3>${title}</h3>
            <div class="modal-body">${content}</div>
            ${actionsHTML}
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // 绑定事件
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close();
        });

        modal.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = actions.find(a => a.action === btn.dataset.action);
                if (action && action.callback) action.callback();
                this.close();
            });
        });

        return overlay;
    }

    close() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) overlay.remove();
    }
}

const modal = new ModalManager();

// ==================== 快捷购买功能 ====================
function quickBuy(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;

    if (!isLoggedIn()) {
        const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';
        window.location.href = basePath + 'login.html?redirect=checkout';
        return;
    }

    cart.add(productId, quantity);
    const basePath = window.location.pathname.includes('/pages/') ? '' : 'pages/';
    window.location.href = basePath + 'checkout.html';
}

// ==================== 页面初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
    updateCartBadge();
});

// 页面卸载前更新购物车显示
window.addEventListener('beforeunload', () => {
    updateCartBadge();
});
