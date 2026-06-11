/**
 * 長門番堂 - 动漫周边商城
 * 数据模块：商品数据、用户数据、订单数据管理
 * 学号：24215220132  姓名：黄政源
 */

// ==================== 商品数据 ====================
const PRODUCTS = [
    {
        id: 1,
        name: '笨蛋酱亚克力立牌',
        category: '亚克力立牌',
        price: 30.00,
        originalPrice: 45.00,
        image: 'images/products/baka-30元.jpg',
        description: '人气角色笨蛋酱的Q版亚克力立牌，高约15cm，采用高清UV印刷工艺，色彩鲜艳持久。底座配有专属花纹，适合桌面摆放或收藏展示。',
        specs: ['材质：亚克力', '尺寸：约15cm', '工艺：UV印刷', '包装：盒装'],
        stock: 99,
        sales: 326,
        rating: 4.8,
        tags: ['热门', '新品'],
        date: '2026-05-15'
    },
    {
        id: 2,
        name: '令泡泡金属徽章',
        category: '徽章',
        price: 25.00,
        originalPrice: 35.00,
        image: 'images/products/令泡泡-25元.jpg',
        description: '令泡泡主题金属徽章，直径5.8cm，烤漆工艺，背面为蝴蝶扣设计。图案精美细腻，适合别在书包、帆布袋或展示板上。',
        specs: ['材质：锌合金', '尺寸：直径5.8cm', '工艺：烤漆+电镀', '包装：独立OPP袋'],
        stock: 150,
        sales: 518,
        rating: 4.9,
        tags: ['热卖', '推荐'],
        date: '2026-04-20'
    },
    {
        id: 3,
        name: '古明地恋限定挂画',
        category: '挂画',
        price: 50.00,
        originalPrice: 78.00,
        image: 'images/products/古明地恋-50元.jpg',
        description: '东方Project古明地恋限定版挂画，采用高品质桃皮绒面料，尺寸60cm×90cm。画面细腻，色彩还原度高，上下配铝合金挂杆，适合卧室或客厅装饰。',
        specs: ['材质：桃皮绒', '尺寸：60×90cm', '工艺：热转印', '配件：铝合金挂杆'],
        stock: 45,
        sales: 203,
        rating: 4.7,
        tags: ['限定', '推荐'],
        date: '2026-05-01'
    },
    {
        id: 4,
        name: '夕泡泡可爱钥匙扣',
        category: '钥匙扣',
        price: 27.00,
        originalPrice: 38.00,
        image: 'images/products/夕泡泡-27元.jpg',
        description: '夕泡泡角色可爱钥匙扣，双面印刷亚克力材质，配有金属钥匙圈和龙虾扣。小巧精致，随身携带的二次元伙伴。',
        specs: ['材质：亚克力+金属', '尺寸：约6cm', '工艺：双面UV印刷', '配件：钥匙圈+龙虾扣'],
        stock: 200,
        sales: 689,
        rating: 4.8,
        tags: ['热卖'],
        date: '2026-03-10'
    },
    {
        id: 5,
        name: '小豆泥毛绒公仔',
        category: '毛绒玩偶',
        price: 47.00,
        originalPrice: 65.00,
        image: 'images/products/小豆泥-47元.jpg',
        description: '超柔软小豆泥毛绒公仔，高约30cm，采用优质短毛绒面料，填充PP棉。手感柔软舒适，表情生动可爱，是治愈系的完美伴侣。',
        specs: ['材质：短毛绒+PP棉', '尺寸：约30cm', '工艺：机缝+手工细节', '包装：OPP袋'],
        stock: 78,
        sales: 445,
        rating: 4.9,
        tags: ['热卖', '推荐', '新品'],
        date: '2026-06-01'
    },
    {
        id: 6,
        name: '欧润吉贴纸套装',
        category: '贴纸',
        price: 18.00,
        originalPrice: 25.00,
        image: 'images/products/欧润吉-18元.jpg',
        description: '欧润吉主题贴纸套装，一套包含20张不同图案。采用防水覆膜铜版纸，可贴于笔记本、手机壳、行李箱等多种表面。',
        specs: ['材质：覆膜铜版纸', '数量：20张/套', '工艺：四色印刷+覆膜', '包装：OPP自封袋'],
        stock: 300,
        sales: 892,
        rating: 4.6,
        tags: ['热卖'],
        date: '2026-02-28'
    },
    {
        id: 7,
        name: '初音未来Q版手办',
        category: '手办',
        price: 83.00,
        originalPrice: 120.00,
        image: 'images/products/miku-83元.jpg',
        description: '初音未来Q版手办，PVC材质，高约18cm。附带替换表情和专属底座，造型生动可爱，经典葱绿色双马尾还原度满分，是V家粉丝的必收藏品。',
        specs: ['材质：PVC+ABS', '尺寸：约18cm', '配件：替换表情×2+底座', '包装：彩盒'],
        stock: 30,
        sales: 156,
        rating: 4.9,
        tags: ['限定', '推荐'],
        date: '2026-06-05'
    },
    {
        id: 8,
        name: '牢普黄油小人潮玩摆件',
        category: '手办',
        price: 77.00,
        originalPrice: 98.00,
        image: 'images/products/牢普黄油小人-77元.jpg',
        description: '明日方舟"牢普黄油小人"主题潮玩摆件，树脂材质，高约12cm。造型独特有趣，完美还原游戏中的经典形象，博士必备桌面搭档。',
        specs: ['材质：树脂', '尺寸：约12cm', '工艺：手工涂装', '包装：开窗彩盒'],
        stock: 55,
        sales: 234,
        rating: 4.7,
        tags: ['新品', '推荐'],
        date: '2026-06-10'
    },
    {
        id: 9,
        name: '猫条造型抱枕',
        category: '毛绒玩偶',
        price: 28.00,
        originalPrice: 39.00,
        image: 'images/products/猫条抱枕-28元.jpg',
        description: '超萌猫条造型抱枕，采用亲肤短毛绒面料，填充高弹PP棉，长约50cm。既是抱枕又是靠垫，猫咪爱好者不可错过的治愈好物。',
        specs: ['材质：短毛绒+PP棉', '尺寸：约50cm', '工艺：立体剪裁', '包装：真空压缩袋'],
        stock: 120,
        sales: 678,
        rating: 4.8,
        tags: ['热卖', '实用'],
        date: '2026-05-25'
    },
    {
        id: 10,
        name: '真理之下谢必安典藏手办',
        category: '手办',
        price: 99.00,
        originalPrice: 149.00,
        image: 'images/products/真理之下谢必安-99元.jpg',
        description: '第五人格"真理之下"系列谢必安典藏手办，PVC+ABS材质，高约22cm。精细涂装，服装纹饰考究，自带专属展示底座与编号收藏卡。',
        specs: ['材质：PVC+ABS', '尺寸：约22cm', '工艺：多层涂装', '配件：底座+收藏卡'],
        stock: 20,
        sales: 89,
        rating: 5.0,
        tags: ['限定', '推荐', '新品'],
        date: '2026-06-08'
    },
    {
        id: 11,
        name: '菜汪毛绒玩偶',
        category: '毛绒玩偶',
        price: 60.00,
        originalPrice: 85.00,
        image: 'images/products/菜汪-60元.jpg',
        description: '菜汪大号毛绒玩偶，采用进口超柔面料，填充环保PP棉，高约40cm。呆萌表情+圆润身形，抱起来超有安全感，适合作为礼物送给朋友。',
        specs: ['材质：超柔短毛绒+PP棉', '尺寸：约40cm', '工艺：精工缝制', '包装：精美礼品袋'],
        stock: 65,
        sales: 398,
        rating: 4.9,
        tags: ['热卖', '推荐'],
        date: '2026-05-18'
    },
    {
        id: 12,
        name: '鼠条造型抱枕',
        category: '毛绒玩偶',
        price: 26.00,
        originalPrice: 36.00,
        image: 'images/products/鼠条抱枕-26元.jpg',
        description: '鼠条造型可爱抱枕，柔软水晶绒面料，长约45cm。细长造型可做抱枕、靠垫或午睡枕，一物多用。鼠鼠这么可爱，怎么可以不来一只？',
        specs: ['材质：水晶绒+PP棉', '尺寸：约45cm', '工艺：立体填充', '包装：OPP袋'],
        stock: 150,
        sales: 567,
        rating: 4.7,
        tags: ['热卖', '实用'],
        date: '2026-04-30'
    }
];

// ==================== 商品分类 ====================
const CATEGORIES = [
    { id: 'all', name: '全部商品', icon: '📦' },
    { id: '亚克力立牌', name: '亚克力立牌', icon: '🪧' },
    { id: '徽章', name: '徽章/吧唧', icon: '🏅' },
    { id: '挂画', name: '挂画/海报', icon: '🖼️' },
    { id: '钥匙扣', name: '钥匙扣', icon: '🔑' },
    { id: '毛绒玩偶', name: '毛绒玩偶', icon: '🧸' },
    { id: '贴纸', name: '贴纸/卡片', icon: '📝' },
    { id: '手办', name: '手办/潮玩', icon: '🎨' }
];

// ==================== 轮播图数据 ====================
const BANNERS = [
    {
        id: 1,
        title: '2026夏季新番周边首发',
        subtitle: '多款新品限时特惠，满199包邮',
        bg: '#e8f4f8',
        link: '#category-亚克力立牌'
    },
    {
        id: 2,
        title: '热卖排行榜TOP10',
        subtitle: '看看大家都在买什么——二次元爱好者必入清单',
        bg: '#fef5e7',
        link: '#category-all'
    },
    {
        id: 3,
        title: '限定周边预售开启',
        subtitle: '古明地恋限定挂画——仅剩少量库存，手慢无',
        bg: '#fdeef2',
        link: '#product-3'
    },
    {
        id: 4,
        title: '新用户首单立减5元',
        subtitle: '注册即领优惠券，首单满50可用',
        bg: '#e8f8e8',
        link: 'pages/login.html'
    }
];

// ==================== 数据操作工具 ====================

// 获取商品列表（支持分类筛选和搜索）
function getProducts(category = 'all', searchTerm = '', sortBy = 'default') {
    let result = [...PRODUCTS];

    // 分类筛选
    if (category !== 'all') {
        result = result.filter(p => p.category === category);
    }

    // 搜索筛选
    if (searchTerm.trim()) {
        const term = searchTerm.trim().toLowerCase();
        result = result.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.tags.some(t => t.toLowerCase().includes(term))
        );
    }

    // 排序
    switch (sortBy) {
        case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'sales':
            result.sort((a, b) => b.sales - a.sales);
            break;
        case 'rating':
            result.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            result.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        default:
            // 默认按热度（销量）排序
            result.sort((a, b) => b.sales - a.sales);
    }

    return result;
}

// 根据ID获取单个商品
function getProductById(id) {
    return PRODUCTS.find(p => p.id === parseInt(id)) || null;
}

// 获取热门商品（销量前N）
function getHotProducts(n = 6) {
    return [...PRODUCTS].sort((a, b) => b.sales - a.sales).slice(0, n);
}

// 获取新品（日期最新前N）
function getNewProducts(n = 6) {
    return [...PRODUCTS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, n);
}

// 获取推荐商品（评分最高前N）
function getRecommendedProducts(n = 6) {
    return [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, n);
}

// ==================== 购物车数据管理 ====================
const CART_KEY = 'nagato_shop_cart';
const USER_KEY = 'nagato_shop_user';
const ORDERS_KEY = 'nagato_shop_orders';

function getCart() {
    try {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ productId: productId, quantity: quantity });
    }
    saveCart(cart);
    return cart;
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
    return cart;
}

function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = Math.max(1, Math.min(quantity, 99));
    }
    saveCart(cart);
    return cart;
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const product = getProductById(item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// ==================== 用户数据管理 ====================
function getCurrentUser() {
    try {
        const data = localStorage.getItem(USER_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function logoutUser() {
    localStorage.removeItem(USER_KEY);
}

function isLoggedIn() {
    return getCurrentUser() !== null;
}

// 用户注册（模拟，使用localStorage存储所有用户）
function registerUser(username, password, email, phone) {
    const users = JSON.parse(localStorage.getItem('nagato_shop_users') || '[]');
    if (users.find(u => u.username === username)) {
        return { success: false, message: '用户名已存在' };
    }
    if (users.find(u => u.email === email)) {
        return { success: false, message: '邮箱已被注册' };
    }
    const newUser = {
        id: Date.now(),
        username,
        password, // 实际项目中应加密
        email,
        phone,
        avatar: '',
        balance: 0,
        points: 100, // 注册送100积分
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('nagato_shop_users', JSON.stringify(users));
    // 自动登录
    const { password: _, ...safeUser } = newUser;
    saveUser(safeUser);
    return { success: true, message: '注册成功', user: safeUser };
}

function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('nagato_shop_users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return { success: false, message: '用户名或密码错误' };
    }
    const { password: _, ...safeUser } = user;
    saveUser(safeUser);
    return { success: true, message: '登录成功', user: safeUser };
}

// ==================== 订单数据管理 ====================
function getOrders() {
    try {
        const data = localStorage.getItem(ORDERS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function createOrder(orderData) {
    const orders = getOrders();
    const newOrder = {
        id: 'ORD' + Date.now(),
        ...orderData,
        status: 'pending', // pending, paid, shipped, completed, cancelled
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    orders.unshift(newOrder);
    saveOrders(orders);
    return newOrder;
}

function getOrderById(orderId) {
    const orders = getOrders();
    return orders.find(o => o.id === orderId) || null;
}

function updateOrderStatus(orderId, status) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        order.updatedAt = new Date().toISOString();
        saveOrders(orders);
    }
    return order;
}

// 获取用户的订单
function getUserOrders() {
    const user = getCurrentUser();
    if (!user) return [];
    const orders = getOrders();
    return orders.filter(o => o.userId === user.id);
}

// ==================== JSON 数据导出/导入（模拟Ajax） ====================
function fetchProductsAsync() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, data: PRODUCTS });
        }, 300);
    });
}

function fetchProductByIdAsync(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = getProductById(id);
            if (product) {
                resolve({ success: true, data: product });
            } else {
                reject({ success: false, message: '商品不存在' });
            }
        }, 200);
    });
}
