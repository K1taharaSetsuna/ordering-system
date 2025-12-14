Page({
  data: {
    dishes: [], // 存储菜品列表
    loading: true
  },

  onLoad() {
    this.fetchDishes();
  },

  // 获取菜品数据
  fetchDishes() {
    wx.showLoading({ title: '加载菜单中...' });
    
    wx.request({
      url: 'http://localhost:3000/api/dishes', // 后端接口地址
      method: 'GET',
      success: (res) => {
        console.log('获取菜品成功:', res.data);
        if (res.data.code === 0) {
          this.setData({
            dishes: res.data.data,
            loading: false
          });
        } else {
          wx.showToast({ title: '数据加载失败', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
        wx.showToast({ title: '无法连接服务器', icon: 'none' });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  // 加入购物车 (模拟)
  addToCart(e) {
    const dish = e.currentTarget.dataset.item;
    wx.showToast({
      title: `已加入: ${dish.name}`,
      icon: 'success'
    });
    // 后续在这里实现真正的购物车逻辑
  }
});
