import request from '@/utils/request'
import qs from 'qs'
export const basketItem = {
  getBasketItem: function(id) {
    return request({
      url: '/api/e-shop/plugins/baskets/basket-item/' + id,
      method: 'get'
    })
  },
  updateBasketItem: function({ id, extraProperties, quantity }) {
    return request({
      url: '/api/e-shop/plugins/baskets/basket-item/' + id,
      method: 'put',
      data: { extraProperties, quantity }
    })
  },
  deleteBasketItem: function(id) {
    return request({
      url: '/api/e-shop/plugins/baskets/basket-item/' + id,
      method: 'delete'
    })
  },
  getBasketItems: function({ basketName, userId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/plugins/baskets/basket-item',
      method: 'get',
      params: { basketName, userId, sorting, skipCount, maxResultCount }
    })
  },
  createBasketItem: function({ extraProperties, basketName, userId, productId, productSkuId, quantity }) {
    return request({
      url: '/api/e-shop/plugins/baskets/basket-item',
      method: 'post',
      data: { extraProperties, basketName, userId, productId, productSkuId, quantity }
    })
  },
  deleteInBulk: function(ids) {
    return request({
      url: '/api/e-shop/plugins/baskets/basket-item/in-bulk',
      method: 'delete',
      params: { ids },
      paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      }
    })
  }
}

export const category = {
  getCategory: function(id) {
    return request({
      url: '/api/eShop/products/category/' + id,
      method: 'get'
    })
  },
  updateCategory: function({ id, extraProperties, parentId, uniqueName, displayName, description, mediaResources }) {
    return request({
      url: '/api/eShop/products/category/' + id,
      method: 'put',
      data: { extraProperties, parentId, uniqueName, displayName, description, mediaResources }
    })
  },
  deleteCategory: function(id) {
    return request({
      url: '/api/eShop/products/category/' + id,
      method: 'delete'
    })
  },
  getCategorys: function({ parentId, showHidden, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/eShop/products/category',
      method: 'get',
      params: { parentId, showHidden, sorting, skipCount, maxResultCount }
    })
  },
  createCategory: function({ extraProperties, parentId, uniqueName, displayName, description, mediaResources }) {
    return request({
      url: '/api/eShop/products/category',
      method: 'post',
      data: { extraProperties, parentId, uniqueName, displayName, description, mediaResources }
    })
  },
  getSummarys: function({ parentId, showHidden, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/eShop/products/category/summary',
      method: 'get',
      params: { parentId, showHidden, sorting, skipCount, maxResultCount }
    })
  }
}

export const coupon = {
  createCoupon: function({ couponTemplateId, userId }) {
    return request({
      url: '/api/e-shop/plugins/coupons/coupon',
      method: 'post',
      data: { couponTemplateId, userId }
    })
  },
  getCoupons: function({ availableOnly, storeId, userId, includesUsed, includesExpired, maxResultCount, sorting, skipCount }) {
    return request({
      url: '/api/e-shop/plugins/coupons/coupon',
      method: 'get',
      params: { availableOnly, storeId, userId, includesUsed, includesExpired, maxResultCount, sorting, skipCount }
    })
  },
  updateCoupon: function({ id, expirationTime }) {
    return request({
      url: '/api/e-shop/plugins/coupons/coupon/' + id,
      method: 'put',
      data: { expirationTime }
    })
  },
  deleteCoupon: function(id) {
    return request({
      url: '/api/e-shop/plugins/coupons/coupon/' + id,
      method: 'delete'
    })
  },
  getCoupon: function(id) {
    return request({
      url: '/api/e-shop/plugins/coupons/coupon/' + id,
      method: 'get'
    })
  },
  createOccupy: function({ id, orderId }) {
    return request({
      url: '/api/e-shop/plugins/coupons/coupon/' + id + '/occupy',
      method: 'post',
      data: { orderId }
    })
  }
}

export const couponTemplate = {
  createCouponTemplate: function({ storeId, couponType, uniqueName, displayName, description, usableDuration, usableBeginTime, usableEndTime, conditionAmount, discountAmount, currency, isUnscoped, scopes }) {
    return request({
      url: '/api/e-shop/plugins/coupons/coupon-template',
      method: 'post',
      data: { storeId, couponType, uniqueName, displayName, description, usableDuration, usableBeginTime, usableEndTime, conditionAmount, discountAmount, currency, isUnscoped, scopes }
    })
  },
  getCouponTemplates: function({ sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/plugins/coupons/coupon-template',
      method: 'get',
      params: { sorting, skipCount, maxResultCount }
    })
  },
  updateCouponTemplate: function({ id, storeId, couponType, uniqueName, displayName, description, usableDuration, usableBeginTime, usableEndTime, conditionAmount, discountAmount, currency, isUnscoped, scopes }) {
    return request({
      url: '/api/e-shop/plugins/coupons/coupon-template/' + id,
      method: 'put',
      data: { storeId, couponType, uniqueName, displayName, description, usableDuration, usableBeginTime, usableEndTime, conditionAmount, discountAmount, currency, isUnscoped, scopes }
    })
  },
  deleteCouponTemplate: function(id) {
    return request({
      url: '/api/e-shop/plugins/coupons/coupon-template/' + id,
      method: 'delete'
    })
  },
  getCouponTemplate: function(id) {
    return request({
      url: '/api/e-shop/plugins/coupons/coupon-template/' + id,
      method: 'get'
    })
  }
}

export const order = {
  getOrder: function(id) {
    return request({
      url: '/api/e-shop/orders/order/' + id,
      method: 'get'
    })
  },
  getOrders: function({ storeId, customerUserId, maxResultCount, sorting, skipCount }) {
    return request({
      url: '/api/e-shop/orders/order',
      method: 'get',
      params: { storeId, customerUserId, maxResultCount, sorting, skipCount }
    })
  },
  createOrder: function({ extraProperties, storeId, customerRemark, orderLines }) {
    return request({
      url: '/api/e-shop/orders/order',
      method: 'post',
      data: { extraProperties, storeId, customerRemark, orderLines }
    })
  },
  getOrderByOrderNumber: function(orderNumber) {
    return request({
      url: '/api/e-shop/orders/order/by-order-number/' + orderNumber,
      method: 'get'
    })
  },
  complete: function(id) {
    return request({
      url: '/api/e-shop/orders/order/' + id + '/complete',
      method: 'post'
    })
  },
  cancel: function({ id, cancellationReason }) {
    return request({
      url: '/api/e-shop/orders/order/' + id + '/cancel',
      method: 'post',
      data: { cancellationReason }
    })
  }
}

export const payment = {
  getPayment: function(id) {
    return request({
      url: '/api/payment-service/payment/' + id,
      method: 'get'
    })
  },
  getPayments: function({ sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/payment-service/payment',
      method: 'get',
      params: { sorting, skipCount, maxResultCount }
    })
  },
  getPaymentMethod: function() {
    return request({
      url: '/api/payment-service/payment/payment-method',
      method: 'get'
    })
  },
  createPay: function({ id, extraProperties }) {
    return request({
      url: '/api/payment-service/payment/' + id + '/pay',
      method: 'post',
      data: { extraProperties }
    })
  },
  createCancel: function(id) {
    return request({
      url: '/api/payment-service/payment/' + id + '/cancel',
      method: 'post'
    })
  },
  createRollback: function(id) {
    return request({
      url: '/api/payment-service/payment/' + id + '/refund/rollback',
      method: 'post'
    })
  },
  getEshopPayment: function(id) {
    return request({
      url: '/api/e-shop/payments/payment/' + id,
      method: 'get'
    })
  },
  getEshopPayments: function({ userId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/payments/payment',
      method: 'get',
      params: { userId, sorting, skipCount, maxResultCount }
    })
  },
  createPayment: function({ extraProperties, paymentMethod, orderIds }) {
    return request({
      url: '/api/e-shop/payments/payment',
      method: 'post',
      data: { extraProperties, paymentMethod, orderIds }
    })
  }
}

export const paymentRecord = {
  getPaymentRecord: function(id) {
    return request({
      url: '/api/payment-service/wechat-pay/payment-record/' + id,
      method: 'get'
    })
  },
  getPaymentRecords: function({ sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/payment-service/wechat-pay/payment-record',
      method: 'get',
      params: { sorting, skipCount, maxResultCount }
    })
  }
}

export const product = {
  getProducts: function({ storeId, categoryId, showHidden, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/products/product',
      method: 'get',
      params: { storeId, categoryId, showHidden, sorting, skipCount, maxResultCount }
    })
  },
  createProduct: function({ extraProperties, storeId, productGroupName, productDetailId, categoryIds, uniqueName, displayName, productAttributes, inventoryStrategy, displayOrder, mediaResources, isPublished }) {
    return request({
      url: '/api/e-shop/products/product',
      method: 'post',
      data: { extraProperties, storeId, productGroupName, productDetailId, categoryIds, uniqueName, displayName, productAttributes, inventoryStrategy, displayOrder, mediaResources, isPublished }
    })
  },
  updateProduct: function({ id, extraProperties, storeId, productGroupName, productDetailId, categoryIds, uniqueName, displayName, productAttributes, inventoryStrategy, displayOrder, mediaResources, isPublished }) {
    return request({
      url: '/api/e-shop/products/product/' + id,
      method: 'put',
      data: { extraProperties, storeId, productGroupName, productDetailId, categoryIds, uniqueName, displayName, productAttributes, inventoryStrategy, displayOrder, mediaResources, isPublished }
    })
  },
  deleteProduct: function(id) {
    return request({
      url: '/api/e-shop/products/product/' + id,
      method: 'delete'
    })
  },
  getProduct: function(id) {
    return request({
      url: '/api/e-shop/products/product/' + id,
      method: 'get'
    })
  },
  createSku: function({ id, extraProperties, name, currency, originalPrice, price, orderMinQuantity, orderMaxQuantity, mediaResources, productDetailId, attributeOptionIds }) {
    return request({
      url: '/api/e-shop/products/product/' + id + '/sku',
      method: 'post',
      data: { extraProperties, name, currency, originalPrice, price, orderMinQuantity, orderMaxQuantity, mediaResources, productDetailId, attributeOptionIds }
    })
  },
  updateSku: function({ id, productSkuId, extraProperties, name, currency, originalPrice, price, orderMinQuantity, orderMaxQuantity, mediaResources, productDetailId }) {
    return request({
      url: '/api/e-shop/products/product/' + id + '/sku/' + productSkuId,
      method: 'put',
      data: { extraProperties, name, currency, originalPrice, price, orderMinQuantity, orderMaxQuantity, mediaResources, productDetailId }
    })
  },
  deleteSku: function({ id, productSkuId }) {
    return request({
      url: '/api/e-shop/products/product/' + id + '/sku/' + productSkuId,
      method: 'delete'
    })
  },
  getProductByCode: function({ storeId, code }) {
    return request({
      url: '/api/e-shop/products/product/by-code/' + code,
      method: 'get',
      params: { storeId }
    })
  },
  getProductGroup: function() {
    return request({
      url: '/api/e-shop/products/product/product-group',
      method: 'get'
    })
  }
}

export const productCategory = {
  getProductCategorys: function({ categoryId, productId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/products/product-category',
      method: 'get',
      params: { categoryId, productId, sorting, skipCount, maxResultCount }
    })
  }
}

export const productDetail = {
  getProductDetail: function(id) {
    return request({
      url: '/api/e-shop/products/product-detail/' + id,
      method: 'get'
    })
  },
  updateProductDetail: function({ id, extraProperties, storeId, description }) {
    return request({
      url: '/api/e-shop/products/product-detail/' + id,
      method: 'put',
      data: { extraProperties, storeId, description }
    })
  },
  deleteProductDetail: function(id) {
    return request({
      url: '/api/e-shop/products/product-detail/' + id,
      method: 'delete'
    })
  },
  getProductDetails: function({ storeId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/products/product-detail',
      method: 'get',
      params: { storeId, sorting, skipCount, maxResultCount }
    })
  },
  createProductDetail: function({ extraProperties, storeId, description }) {
    return request({
      url: '/api/e-shop/products/product-detail',
      method: 'post',
      data: { extraProperties, storeId, description }
    })
  }
}

export const productDetailHistory = {
  getProductDetailHistory: function(id) {
    return request({
      url: '/api/e-shop/products/product-detail-history/' + id,
      method: 'get'
    })
  },
  getProductDetailHistorys: function({ productDetailId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/products/product-detail-history',
      method: 'get',
      params: { productDetailId, sorting, skipCount, maxResultCount }
    })
  },
  getProductDetailHistoryByTime: function({ productId, modificationTime }) {
    return request({
      url: '/api/e-shop/products/product-detail-history/by-time/' + productId,
      method: 'get',
      params: { modificationTime }
    })
  }
}

export const productHistory = {
  getProductHistory: function(id) {
    return request({
      url: '/api/e-shop/products/product-history/' + id,
      method: 'get'
    })
  },
  getProductHistorys: function({ productId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/products/product-history',
      method: 'get',
      params: { productId, sorting, skipCount, maxResultCount }
    })
  },
  getProductHistoryByTime: function({ productId, modificationTime }) {
    return request({
      url: '/api/e-shop/products/product-history/by-time/' + productId,
      method: 'get',
      params: { modificationTime }
    })
  }
}

export const productInventory = {
  getProductInventorys: function({ productId, productSkuId }) {
    return request({
      url: '/api/e-shop/products/product-inventory',
      method: 'get',
      params: { productId, productSkuId }
    })
  },
  updateProductInventory: function({ extraProperties, productId, productSkuId, changedInventory }) {
    return request({
      url: '/api/e-shop/products/product-inventory',
      method: 'put',
      data: { extraProperties, productId, productSkuId, changedInventory }
    })
  }
}

export const productView = {
  getViews: function({ storeId, categoryId, showHidden, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/products/product/view',
      method: 'get',
      params: { storeId, categoryId, showHidden, sorting, skipCount, maxResultCount }
    })
  },
  getView: function(id) {
    return request({
      url: '/api/e-shop/products/product/view/' + id,
      method: 'get'
    })
  }
}

export const refund = {
  getRefund: function(id) {
    return request({
      url: '/api/payment-service/refund/' + id,
      method: 'get'
    })
  },
  getRefunds: function({ sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/payment-service/refund',
      method: 'get',
      params: { sorting, skipCount, maxResultCount }
    })
  },
  getEshopRefund: function(id) {
    return request({
      url: '/api/e-shop/payments/refund/' + id,
      method: 'get'
    })
  },
  getEshopRefunds: function({ userId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/payments/refund',
      method: 'get',
      params: { userId, sorting, skipCount, maxResultCount }
    })
  },
  createRefund: function({ extraProperties, paymentId, displayReason, customerRemark, staffRemark, refundItems }) {
    return request({
      url: '/api/e-shop/payments/refund',
      method: 'post',
      data: { extraProperties, paymentId, displayReason, customerRemark, staffRemark, refundItems }
    })
  }
}

export const refundRecord = {
  getRefundRecord: function(id) {
    return request({
      url: '/api/payment-service/wechat-pay/refund-record/' + id,
      method: 'get'
    })
  },
  getRefundRecords: function({ sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/payment-service/wechat-pay/refund-record',
      method: 'get',
      params: { sorting, skipCount, maxResultCount }
    })
  }
}

export const store = {
  getStore: function(id) {
    return request({
      url: '/api/e-shop/stores/store/' + id,
      method: 'get'
    })
  },
  updateStore: function({ id, extraProperties, name }) {
    return request({
      url: '/api/e-shop/stores/store/' + id,
      method: 'put',
      data: { extraProperties, name }
    })
  },
  deleteStore: function(id) {
    return request({
      url: '/api/e-shop/stores/store/' + id,
      method: 'delete'
    })
  },
  getStores: function({ onlyManageable, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/stores/store',
      method: 'get',
      params: { onlyManageable, sorting, skipCount, maxResultCount }
    })
  },
  createStore: function({ extraProperties, name }) {
    return request({
      url: '/api/e-shop/stores/store',
      method: 'post',
      data: { extraProperties, name }
    })
  },
  getDefault: function() {
    return request({
      url: '/api/e-shop/stores/store/default',
      method: 'get'
    })
  }
}

export const storeOwner = {
  getStoreOwner: function(id) {
    return request({
      url: '/api/e-shop/stores/store-owner/' + id,
      method: 'get'
    })
  },
  updateStoreOwner: function({ id, extraProperties, storeId, ownerUserId }) {
    return request({
      url: '/api/e-shop/stores/store-owner/' + id,
      method: 'put',
      data: { extraProperties, storeId, ownerUserId }
    })
  },
  deleteStoreOwner: function(id) {
    return request({
      url: '/api/e-shop/stores/store-owner/' + id,
      method: 'delete'
    })
  },
  getStoreOwners: function({ storeId, ownerUserId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/stores/store-owner',
      method: 'get',
      params: { storeId, ownerUserId, sorting, skipCount, maxResultCount }
    })
  },
  createStoreOwner: function({ extraProperties, storeId, ownerUserId }) {
    return request({
      url: '/api/e-shop/stores/store-owner',
      method: 'post',
      data: { extraProperties, storeId, ownerUserId }
    })
  }
}

export const transaction = {
  getTransaction: function(id) {
    return request({
      url: '/api/payment-service/prepayment/transaction/' + id,
      method: 'get'
    })
  },
  getTransactions: function({ accountId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/payment-service/prepayment/transaction',
      method: 'get',
      params: { accountId, sorting, skipCount, maxResultCount }
    })
  },
  getEshopTransaction: function(id) {
    return request({
      url: '/api/e-shop/stores/transaction/' + id,
      method: 'get'
    })
  },
  updateTransaction: function({ id, extraProperties, storeId, orderId, transactionType, actionName, currency, amount }) {
    return request({
      url: '/api/e-shop/stores/transaction/' + id,
      method: 'put',
      data: { extraProperties, storeId, orderId, transactionType, actionName, currency, amount }
    })
  },
  deleteTransaction: function(id) {
    return request({
      url: '/api/e-shop/stores/transaction/' + id,
      method: 'delete'
    })
  },
  getEshopTransactions: function({ storeId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/e-shop/stores/transaction',
      method: 'get',
      params: { storeId, sorting, skipCount, maxResultCount }
    })
  },
  createTransaction: function({ extraProperties, storeId, orderId, transactionType, actionName, currency, amount }) {
    return request({
      url: '/api/e-shop/stores/transaction',
      method: 'post',
      data: { extraProperties, storeId, orderId, transactionType, actionName, currency, amount }
    })
  }
}

export const weChatPay = {
  createNotify: function() {
    return request({
      url: '/wechat-pay/notify',
      method: 'post'
    })
  },
  createRefundNotify: function() {
    return request({
      url: '/wechat-pay/refund-notify',
      method: 'post'
    })
  },
  getJsSdkConfigParameterss: function({ appId, prepayId }) {
    return request({
      url: '/wechat-pay/js-sdk-config-parameters',
      method: 'get',
      params: { appId, prepayId }
    })
  }
}

export const withdrawalRecord = {
  getWithdrawalRecord: function(id) {
    return request({
      url: '/api/payment-service/prepayment/withdrawal-record/' + id,
      method: 'get'
    })
  },
  getWithdrawalRecords: function({ sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/payment-service/prepayment/withdrawal-record',
      method: 'get',
      params: { sorting, skipCount, maxResultCount }
    })
  }
}

export const withdrawalRequest = {
  getWithdrawalRequest: function(id) {
    return request({
      url: '/api/payment-service/prepayment/withdrawal-request/' + id,
      method: 'get'
    })
  },
  getWithdrawalRequests: function({ pendingOnly, accountId, accountUserId, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/payment-service/prepayment/withdrawal-request',
      method: 'get',
      params: { pendingOnly, accountId, accountUserId, sorting, skipCount, maxResultCount }
    })
  },
  createReview: function({ id, isApproved }) {
    return request({
      url: '/api/payment-service/prepayment/withdrawal-request/' + id + '/review',
      method: 'post',
      data: { isApproved }
    })
  }
}

