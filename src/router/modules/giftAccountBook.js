import Layout from '@/layout'

const giftAccountBookModule = {
  path: '/giftAccountBook',
  component: Layout,
  redirect: '/giftAccountBook/dataDictionaries',
  name: 'GiftAccountBook',
  meta: { title: '礼物账簿', icon: 'account_book', noCache: true },
  children: [
    {
      path: 'acceptGifts',
      component: () => import('@/views/gift_account_book/accept_gifts/index'),
      name: 'AcceptGifts',
      meta: { permissions: ['GiftAccountBook.AcceptGifts'], title: '收礼记录', icon: 'accept_gifts', noCache: false }
    },
    {
      path: 'giftGivings',
      component: () => import('@/views/gift_account_book/gift_givings/index'),
      name: 'GiftGivings',
      meta: { permissions: ['GiftAccountBook.GiftGiving'], title: '送礼记录', icon: 'giving_gifts', noCache: false }
    },
    {
      path: 'bookGroup',
      component: () => import('@/views/gift_account_book/book_group/index'),
      name: 'BookGroup',
      meta: { permissions: ['GiftAccountBook.BookGroup'], title: '分组', icon: 'book_group', noCache: false }
    },
    {
      path: 'contactses',
      component: () => import('@/views/gift_account_book/contactses/index'),
      name: 'Contactses',
      meta: { permissions: ['GiftAccountBook.Contactses'], title: '联系人', icon: 'contacts', noCache: false }
    }
  ]
}

export default giftAccountBookModule
