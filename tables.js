module.exports = {
    CASINO: {
        main: 'casinos',
        meta: 'casino_meta',
        category: 'casino_category',
        relative: {
            category: 'casino_category_relatives',
            license: 'casino_license_relatives',
            payment: 'casino_payment_relatives',
            vendor: 'casino_vendor_relatives'
        },
        inSitemap: true
    },
    LICENSE: {
        main: 'licenses',
        meta: 'license_meta',
        category: 'license_category',
        relative: {
            category: 'license_category_relatives'
        },
        inSitemap: true
    },
    ARTICLE: {
        main: 'articles',
        meta: 'article_meta',
        category: 'article_category',
        relative: {
            category: 'article_category_relatives'
        },
        inSitemap: true
    },
    BONUS: {
        main: 'bonuses',
        meta: 'bonus_meta',
        category: 'bonus_category',
        relative: {
            category: 'bonus_category_relatives',
            casino: 'bonus_casino_relatives',
        },
        inSitemap: true
    },
    PAYMENT: {
        main: 'payments',
        meta: 'payment_meta',
        category: 'payment_category',
        relative: {
            category: 'payment_category_relatives'
        },
        inSitemap: true
    },
    VENDOR: {
        main: 'vendors',
        meta: 'vendor_meta',
        category: 'vendor_category',
        relative: {
            category: 'vendor_category_relatives'
        },
        inSitemap: true
    },
    GAME: {
        main: 'games',
        meta: 'game_meta',
        category: 'game_category',
        relative: {
            category: 'game_category_relatives',
            casino: 'game_casino_relatives',
            vendor: 'game_vendor_relatives'
        },
        inSitemap: true
    },
    PAGES: {
        main: 'pages',
        inSitemap: false
    }
}