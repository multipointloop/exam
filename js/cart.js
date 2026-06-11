/**
 * 長門番堂 - 动漫周边商城
 * 购物车管理模块
 * 学号：24215220132  姓名：黄政源
 */

class ShoppingCart {
    constructor() {
        this.key = 'nagato_shop_cart';
    }

    // 获取购物车数据
    getAll() {
        try {
            const data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('读取购物车失败:', e);
            return [];
        }
    }

    // 保存购物车数据
    save(items) {
        try {
            localStorage.setItem(this.key, JSON.stringify(items));
            this.onChange();
        } catch (e) {
            console.error('保存购物车失败:', e);
        }
    }

    // 添加商品
    add(productId, quantity = 1) {
        const items = this.getAll();
        const existing = items.find(item => item.productId === productId);
        if (existing) {
            existing.quantity += quantity;
            if (existing.quantity > 99) existing.quantity = 99;
        } else {
            items.push({
                productId: productId,
                quantity: Math.min(quantity, 99),
                addedAt: new Date().toISOString()
            });
        }
        this.save(items);
        return items;
    }

    // 移除商品
    remove(productId) {
        let items = this.getAll();
        items = items.filter(item => item.productId !== productId);
        this.save(items);
        return items;
    }

    // 更新数量
    updateQuantity(productId, quantity) {
        const items = this.getAll();
        const item = items.find(item => item.productId === productId);
        if (item) {
            item.quantity = Math.max(1, Math.min(parseInt(quantity) || 1, 99));
        }
        this.save(items);
        return items;
    }

    // 清空购物车
    clear() {
        this.save([]);
    }

    // 获取购物车商品总数
    getTotalCount() {
        return this.getAll().reduce((sum, item) => sum + item.quantity, 0);
    }

    // 获取购物车总金额
    getTotalAmount() {
        return this.getAll().reduce((sum, item) => {
            const product = getProductById(item.productId);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    // 获取购物车详情（含商品信息）
    getDetailedItems() {
        const items = this.getAll();
        return items.map(item => {
            const product = getProductById(item.productId);
            return {
                ...item,
                product: product,
                subtotal: product ? product.price * item.quantity : 0
            };
        }).filter(item => item.product !== null);
    }

    // 检查商品是否已在购物车中
    has(productId) {
        return this.getAll().some(item => item.productId === productId);
    }

    // 获取某商品在购物车中的数量
    getQuantity(productId) {
        const item = this.getAll().find(item => item.productId === productId);
        return item ? item.quantity : 0;
    }

    // 数据变化回调
    onChange() {
        // 更新页面上的购物车数量显示
        const countElements = document.querySelectorAll('.cart-count');
        const count = this.getTotalCount();
        countElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? '' : 'none';
        });
    }
}

// 全局购物车实例
const cart = new ShoppingCart();

/**
 * 结算管理器
 */
class CheckoutManager {
    constructor() {
        this.shippingMethods = [
            { id: 'standard', name: '标准快递', price: 8.00, time: '3-5个工作日' },
            { id: 'express', name: '特快专递', price: 18.00, time: '1-2个工作日' },
            { id: 'free', name: '包邮（满199元）', price: 0, time: '3-5个工作日' }
        ];

        this.paymentMethods = [
            { id: 'alipay', name: '支付宝', icon: '💳' },
            { id: 'wechat', name: '微信支付', icon: '💚' },
            { id: 'card', name: '银行卡', icon: '🏦' },
            { id: 'cod', name: '货到付款', icon: '📦' }
        ];
    }

    // 获取可用的配送方式
    getShippingMethods(subtotal) {
        return this.shippingMethods.map(m => ({
            ...m,
            actualPrice: (m.id === 'free' && subtotal >= 199) ? 0 : m.price,
            available: m.id !== 'free' || subtotal >= 199
        }));
    }

    // 获取支付方式
    getPaymentMethods() {
        return this.paymentMethods;
    }

    // 提交订单
    submitOrder(orderInfo) {
        const detailedItems = cart.getDetailedItems();
        if (detailedItems.length === 0) {
            return { success: false, message: '购物车为空' };
        }

        const user = getCurrentUser();
        if (!user) {
            return { success: false, message: '请先登录' };
        }

        const subtotal = cart.getTotalAmount();
        const shipping = orderInfo.shippingMethod === 'free' && subtotal >= 199 ? 0 :
            this.shippingMethods.find(m => m.id === orderInfo.shippingMethod)?.price || 8;

        const order = createOrder({
            userId: user.id,
            username: user.username,
            items: detailedItems.map(item => ({
                productId: item.productId,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                image: item.product.image,
                subtotal: item.subtotal
            })),
            subtotal: subtotal,
            shipping: shipping,
            total: subtotal + shipping,
            shippingMethod: orderInfo.shippingMethod || 'standard',
            paymentMethod: orderInfo.paymentMethod || 'alipay',
            address: orderInfo.address || '',
            receiver: orderInfo.receiver || user.username,
            phone: orderInfo.phone || user.phone || '',
            remark: orderInfo.remark || ''
        });

        // 清空购物车
        cart.clear();

        return { success: true, message: '订单提交成功', order: order };
    }
}

const checkout = new CheckoutManager();

// ==================== 页面更新辅助函数 ====================

// 更新导航栏购物车数量
function updateCartBadge() {
    const count = cart.getTotalCount();
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'inline-block' : 'none';
    });
}

// 格式化价格
function formatPrice(price) {
    return '¥' + parseFloat(price).toFixed(2);
}

// 获取URL参数
function getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});
