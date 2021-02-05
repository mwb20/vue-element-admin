import Layout from '@/layout'

export const orderModule = {
  path: '/order',
  component: Layout,
  redirect: '/order/orders',
  name: 'EshopManageOrders',
  meta: { title: '订单', icon: 'component', noCache: true },
  children: [
    {
      path: 'orders',
      component: () => import('@/views/shop/orders/index'),
      name: 'Orders',
      meta: { permissions: ['EasyAbp.EShop.Orders.Order'], title: '订单', icon: 'dictionary', noCache: false }
    }
  ]
}

export const productModule = {
  path: '/product',
  component: Layout,
  redirect: '/product/products',
  name: 'EshopManageProducts',
  meta: { title: '商品', icon: 'component', noCache: true },
  children: [
    {
      path: 'products',
      component: () => import('@/views/shop/products/index'),
      name: 'Products',
      meta: { permissions: ['EasyAbp.EShop.Products.Product'], title: '商品', icon: 'dictionary', noCache: false }
    },
    {
      path: 'categories',
      component: () => import('@/views/shop/categories/index'),
      name: 'Categories',
      meta: { permissions: ['EasyAbp.EShop.Products.Category'], title: '商品类别', icon: 'dictionary', noCache: false }
    }
  ]
}

export const storeModule = {
  path: '/store',
  component: Layout,
  redirect: '/store/stores',
  name: 'EshopManageStores',
  meta: { title: '店铺', icon: 'component', noCache: true },
  children: [
    {
      path: 'stores',
      component: () => import('@/views/shop/stores/index'),
      name: 'Stores',
      meta: { permissions: ['EasyAbp.EShop.Stores.Store'], title: '店铺', icon: 'dictionary', noCache: false }
    },
    {
      path: 'transactions',
      component: () => import('@/views/shop/stores_transactions/index'),
      name: 'Transactions',
      meta: { permissions: ['EasyAbp.EShop.Stores.Transaction'], title: '交易记录', icon: 'dictionary', noCache: false }
    },
    {
      path: 'storeOwners',
      component: () => import('@/views/shop/store_owners/index'),
      name: 'StoreOwners',
      meta: { permissions: ['EasyAbp.EShop.Stores.Store'], title: '店铺管理员', icon: 'dictionary', noCache: false }
    }
  ]
}

export const basketItemsModule = {
  path: '/basket',
  component: Layout,
  redirect: '/basket/items',
  name: 'EshopManageBasketsItems',
  meta: { title: '购物车', icon: 'component', noCache: true },
  children: [
    {
      path: 'items',
      component: () => import('@/views/shop/basket_items/index'),
      name: 'BasketsItems',
      meta: { permissions: ['EasyAbp.EShop.Plugins.Baskets.BasketItem'], title: '购物车项', icon: 'dictionary', noCache: false }
    }
  ]
}

export const couponsModule = {
  path: '/coupon',
  component: Layout,
  redirect: '/coupon/coupons',
  name: 'EshopManageCoupons',
  meta: { title: '购物车', icon: 'component', noCache: true },
  children: [
    {
      path: 'coupons',
      component: () => import('@/views/shop/coupons/index'),
      name: 'Coupons',
      meta: { permissions: ['EasyAbp.EShop.Plugins.Coupons.Coupon'], title: '优惠券', icon: 'dictionary', noCache: false }
    },
    {
      path: 'couponTemplates',
      component: () => import('@/views/shop/coupon_templates/index'),
      name: 'CouponTemplates',
      meta: { permissions: ['EasyAbp.EShop.Plugins.Coupons.CouponTemplate'], title: '优惠券模板', icon: 'dictionary', noCache: false }
    }
  ]
}

export const paymentsModule = {
  path: '/payment',
  component: Layout,
  redirect: '/payment/payments',
  name: 'EshopManagePayment',
  meta: { title: '支付', icon: 'component', noCache: true },
  children: [
    {
      path: 'payments',
      component: () => import('@/views/shop/payments/index'),
      name: 'Payments',
      meta: { permissions: ['EasyAbp.EShop.Payments.Payment'], title: '支付', icon: 'dictionary', noCache: false }
    },
    {
      path: 'refunds',
      component: () => import('@/views/shop/refunds/index'),
      name: 'Refunds',
      meta: { permissions: ['EasyAbp.EShop.Payments.Refund'], title: '退款', icon: 'dictionary', noCache: false }
    }
  ]
}

export const weChatPaymentsModule = {
  path: '/weChatPayment',
  component: Layout,
  redirect: '/weChatPayment/payments',
  name: 'EshopManagePayment',
  meta: { title: '微信支付', icon: 'component', noCache: true },
  children: [
    {
      path: 'payments',
      component: () => import('@/views/shop/wechat_payment/index'),
      name: 'Payments',
      meta: { permissions: ['EasyAbp.PaymentService.WeChatPay.PaymentRecord'], title: '支付记录', icon: 'dictionary', noCache: false }
    },
    {
      path: 'refunds',
      component: () => import('@/views/shop/wechat_refund/index'),
      name: 'Refunds',
      meta: { permissions: ['EasyAbp.PaymentService.WeChatPay.RefundRecord'], title: '退款记录', icon: 'dictionary', noCache: false }
    }
  ]
}
