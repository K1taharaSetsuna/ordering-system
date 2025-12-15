const app = getApp()

Page({
  data: {
    diningMode: 'eat-in', // eat-in (堂食) or take-out (外带)
    activeCategory: 0,
    categories: [
      { id: 0, name: '人气热卖' },
      { id: 1, name: '超值套餐' },
      { id: 2, name: '主食汉堡' },
      { id: 3, name: '美味小食' },
      { id: 4, name: '甜品饮料' }
    ],
    // 模拟 KFC 菜单数据
    menuData: [
      {
        id: 0,
        category: '人气热卖',
        items: [
          { id: 101, name: '香辣鸡腿堡', price: 19.5, image: 'https://img.yzcdn.cn/vant/cat.jpeg', desc: '经典香辣，酥脆鲜嫩' },
          { id: 102, name: '吮指原味鸡', price: 12.0, image: 'https://img.yzcdn.cn/vant/cat.jpeg', desc: '11种香料秘制' }
        ]
      },
      {
        id: 1,
        category: '超值套餐',
        items: [
          { id: 201, name: '单人满足餐', price: 39.9, image: 'https://img.yzcdn.cn/vant/cat.jpeg', desc: '香辣鸡腿堡+薯条(中)+可乐(中)' }
        ]
      },
      {
        id: 2,
        category: '主食汉堡',
        items: [
          { id: 301, name: '新奥尔良烤堡', price: 20.5, image: 'https://img.yzcdn.cn/vant/cat.jpeg', desc: '甜辣风味，鲜嫩多汁' },
          { id: 302, name: '老北京鸡肉卷', price: 18.0, image: 'https://img.yzcdn.cn/vant/cat.jpeg', desc: '传统风味，酱香浓郁' }
        ]
      },
      {
        id: 3,
        category: '美味小食',
        items: [
          { id: 401, name: '波纹薯条', price: 11.0, image: 'https://img.yzcdn.cn/vant/cat.jpeg', desc: '金黄酥脆' },
          { id: 402, name: '葡式蛋挞', price: 8.5, image: 'https://img.yzcdn.cn/vant/cat.jpeg', desc: '经典奶香，层层酥脆' }
        ]
      },
      {
        id: 4,
        category: '甜品饮料',
        items: [
          { id: 501, name: '百事可乐', price: 9.0, image: 'https://img.yzcdn.cn/vant/cat.jpeg', desc: '冰爽刺激' },
          { id: 502, name: '九珍果汁', price: 10.5, image: 'https://img.yzcdn.cn/vant/cat.jpeg', desc: '酸甜开胃' }
        ]
      }
    ],
    cart: [],
    totalPrice: 0,
    totalCount: 0,
    cartPopupVisible: false
  },

  onLoad() {
    // 实际项目中这里可以调用后端接口获取菜单
    // this.fetchDishes();
  },

  // 切换堂食/外带
  switchDiningMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ diningMode: mode });
  },

  // 切换分类
  switchCategory(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeCategory: index,
      toView: `category-${index}` // 滚动到指定位置
    });
  },

  // 添加到购物车
  addToCart(e) {
    const item = e.currentTarget.dataset.item;
    const cart = this.data.cart;
    const existingItem = cart.find(x => x.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    this.calculateTotal();
    
    wx.showToast({
      title: '已加入',
      icon: 'none',
      duration: 500
    });
  },

  // 减少购物车商品
  removeFromCart(e) {
    const item = e.currentTarget.dataset.item;
    const cart = this.data.cart;
    const index = cart.findIndex(x => x.id === item.id);

    if (index > -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
    }

    this.calculateTotal();
  },

  // 计算总价
  calculateTotal() {
    let total = 0;
    let count = 0;
    this.data.cart.forEach(item => {
      total += item.price * item.quantity;
      count += item.quantity;
    });

    this.setData({
      cart: this.data.cart,
      totalPrice: total.toFixed(1),
      totalCount: count
    });
  },

  // 显示/隐藏购物车详情
  toggleCartPopup() {
    if (this.data.cart.length > 0) {
      this.setData({ cartPopupVisible: !this.data.cartPopupVisible });
    }
  },

  // 结算
  onCheckout() {
    if (this.data.totalCount === 0) return;
    wx.showToast({
      title: '去结算功能待开发',
      icon: 'none'
    });
  }
});

