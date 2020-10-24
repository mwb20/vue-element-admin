import request from '@/utils/request'
export const acceptGifts = {
  createAcceptGift: function({ gift, amount, giveWay, giveDate, memo, contactsesId, bookGroupId, contactPersonName, contactPersonGender, bookGroupName }) {
    return request({
      url: '/api/app/accept-gifts',
      method: 'post',
      data: { gift, amount, giveWay, giveDate, memo, contactsesId, bookGroupId, contactPersonName, contactPersonGender, bookGroupName }
    })
  },
  deleteAcceptGifts: function(id) {
    return request({
      url: '/api/app/accept-gifts',
      method: 'delete',
      params: { id }
    })
  },
  getAcceptGifts: function({ filter, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/accept-gifts',
      method: 'get',
      params: { filter, sorting, skipCount, maxResultCount }
    })
  },
  updateAcceptGifts: function({ id, gift, amount, giveWay, giveDate, memo, contactsesId, bookGroupId, contactPersonName, contactPersonGender, bookGroupName }) {
    return request({
      url: '/api/app/accept-gifts',
      method: 'put',
      params: { id },
      data: { gift, amount, giveWay, giveDate, memo, contactsesId, bookGroupId, contactPersonName, contactPersonGender, bookGroupName }
    })
  },
  getAcceptGiftsById: function(id) {
    return request({
      url: '/api/app/accept-gifts/by-id/' + id,
      method: 'get'
    })
  }
}

export const bookGroup = {
  createBookGroup: function({ name, groupDate, province, city, county, address, memo }) {
    return request({
      url: '/api/app/book-group',
      method: 'post',
      data: { name, groupDate, province, city, county, address, memo }
    })
  },
  deleteBookGroup: function(id) {
    return request({
      url: '/api/app/book-group',
      method: 'delete',
      params: { id }
    })
  },
  getBookGroup: function({ filter, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/book-group',
      method: 'get',
      params: { filter, sorting, skipCount, maxResultCount }
    })
  },
  updateBookGroup: function({ id, name, groupDate, province, city, county, address, memo }) {
    return request({
      url: '/api/app/book-group',
      method: 'put',
      params: { id },
      data: { name, groupDate, province, city, county, address, memo }
    })
  },
  getBookGroupById: function(id) {
    return request({
      url: '/api/app/book-group/by-id/' + id,
      method: 'get'
    })
  },
  getSelectSearch: function(name) {
    return request({
      url: '/api/app/book-group/select-search/' + name,
      method: 'get'
    })
  },
  getView: function(id) {
    return request({
      url: '/api/app/book-group/get-view/' + id,
      method: 'get'
    })
  }
}

export const contactses = {
  createContactse: function({ name, mobile, province, city, county, address, relevance, memo, gender, age, birthday }) {
    return request({
      url: '/api/app/contactses',
      method: 'post',
      data: { name, mobile, province, city, county, address, relevance, memo, gender, age, birthday }
    })
  },
  deleteContactses: function(id) {
    return request({
      url: '/api/app/contactses',
      method: 'delete',
      params: { id }
    })
  },
  getContactses: function({ filter, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/contactses',
      method: 'get',
      params: { filter, sorting, skipCount, maxResultCount }
    })
  },
  updateContactses: function({ id, name, mobile, province, city, county, address, relevance, memo, gender, age, birthday }) {
    return request({
      url: '/api/app/contactses',
      method: 'put',
      params: { id },
      data: { name, mobile, province, city, county, address, relevance, memo, gender, age, birthday }
    })
  },
  getContactsesById: function(id) {
    return request({
      url: '/api/app/contactses/by-id/' + id,
      method: 'get'
    })
  },
  getSelectSearch: function(name) {
    return request({
      url: '/api/app/contactses/select-search/' + name,
      method: 'get'
    })
  },
  getView: function(id) {
    return request({
      url: '/api/app/contactses/get-view/' + id,
      method: 'get'
    })
  }
}

export const giftGiving = {
  createGiftGiving: function({ gift, amount, giveWay, giveDate, memo, contactsesId, contactPersonName, contactPersonGender }) {
    return request({
      url: '/api/app/gift-giving',
      method: 'post',
      data: { gift, amount, giveWay, giveDate, memo, contactsesId, contactPersonName, contactPersonGender }
    })
  },
  deleteGiftGiving: function(id) {
    return request({
      url: '/api/app/gift-giving',
      method: 'delete',
      params: { id }
    })
  },
  getGiftGiving: function({ filter, sorting, skipCount, maxResultCount }) {
    return request({
      url: '/api/app/gift-giving',
      method: 'get',
      params: { filter, sorting, skipCount, maxResultCount }
    })
  },
  updateGiftGiving: function({ id, gift, amount, giveWay, giveDate, memo, contactsesId, contactPersonName, contactPersonGender }) {
    return request({
      url: '/api/app/gift-giving',
      method: 'put',
      params: { id },
      data: { gift, amount, giveWay, giveDate, memo, contactsesId, contactPersonName, contactPersonGender }
    })
  },
  getGiftGivingById: function(id) {
    return request({
      url: '/api/app/gift-giving/by-id/' + id,
      method: 'get'
    })
  }
}

