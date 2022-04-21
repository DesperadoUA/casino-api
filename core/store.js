module.exports = {
    faq: [
        {
            value_1: "✅ Принимает ли Slotoking игроков из Украины?",
            value_2: "Да, принимает. Slotoking одно из первых украинских казино. Кроме игроков их Украины, здесь могут играть жители Европы и Азии."
        }
    ],
    settings: {
        text: {
            key_id: 'text',
            value: 'Строковый редактор',
            title: 'Текстовый редактор Input',
            editor: 'input',
            updateValue: 'Строковый редактор update'
        },
        rich_text: {
            key_id: 'rich_text',
            value: '<h2>Текстовый редактор</h2>',
            title: 'Текстовый редактор RichText',
            editor: 'rich_text',
            updateValue: '<h2>Текстовый редактор update</h2>'
        },
        multiple_menu: {
            key_id: 'multiple_menu',
            value: [],
            title: 'Двух уровневое меню',
            editor: 'multiple_menu',
            updateValue: []
        },
        two_input_image: {
            key_id: 'two_input_image',
            value: [],
            title: 'Картинка 2 инпута (одноуровневое меню)',
            editor: 'two_input_image',
            updateValue: []
        },
        input_text: {
            key_id: 'input_text',
            value: [],
            title: 'Faq',
            editor: 'input_text',
            updateValue: []
        }
    },
    options: {
        logo: {
            key_id: 'logo',
            value: 'http://127.0.0.1:5000/img/default.png',
            title: 'Редактор изображения Logo',
            editor: 'image',
            updateValue: 'http://127.0.0.1:5000/img/update.png'
        }
    },
    faqUpdate: [
        {
            value_1: "✅ Принимает ли Slotoking игроков из Украины? update",
            value_2: "Да, принимает. Slotoking одно из первых украинских казино. Кроме игроков их Украины, здесь могут играть жители Европы и Азии. update"
        }
    ],
    ref: [
        "//salatsmayonezom.com/ref/58752626/"
    ],
    reviews: [
        {
            review_name: 'Anrey1703',
            review_rating: '90',
            date: '15.05.2021',
            review_text: 'Реально — очень крутое казино. В Украине, пожалуй, лучшее. Очень удобный интерфейс и отличная подборка слотов. Есть из чего выбрать. 50 фриспинов за регистрацию пришлись кстати. Выиграть на них у меня не получилось, но разобраться что к чему смог. Забросил на счет пару сотен гривен и не пожалел. Адреналина получил сполна на всю сумму и даже остался в плюсах.'
        }
    ],
    multipleMenu: [
        {
            src: "http://127.0.0.1:5000/img/default.png",
            value_1: "/casino",
            value_2: "Онлайн казино",
            child: []
        },
        {
            src: "http://127.0.0.1:5000/img/default.png",
            value_1: "/bonuses",
            value_2: "Бонусы",
            child: [
                {
                    value_1: "/type-bonus/cashback",
                    value_2: "Cashback"
                },
                {
                    value_1: "/type-bonus/reload",
                    value_2: "Reload"
                },
                {
                    value_1: "/type-bonus/vip-predlozheniya",
                    value_2: "VIP-предложения"
                },
                {
                    value_1: "/type-bonus/bezdepozitnyy-bonus",
                    value_2: "Бездепозитный бонус"
                },
                {
                    value_1: "/type-bonus/bonus-na-vtoroy-depozit",
                    value_2: "Бонус на второй депозит"
                },
                {
                    value_1: "/type-bonus/depozitnyy-bonus",
                    value_2: "Депозитный бонус"
                },
                {
                    value_1: "/type-bonus/paket-bonusov",
                    value_2: "Пакет бонусов"
                },
                {
                    value_1: "/type-bonus/privetstvennyy-bonus",
                    value_2: "Приветственный бонус"
                },
                {
                    value_1: "/type-bonus/frispiny",
                    value_2: "Фриспины"
                },
                {
                    value_1: "/type-bonus/drugie",
                    value_2: "Другие"
                }
            ]
        },
        {
            src: "http://127.0.0.1:5000/img/default.png",
            value_1: "/games",
            value_2: "Игры",
            child: [
                    {
                        value_1: "/games/videopoker",
                        value_2: "Видеопокер"
                    },
                    {
                        value_1: "/games/igrovye-avtomaty",
                        value_2: "Слоты"
                    },
                    {
                        value_1: "/games/kartochnye-igry",
                        value_2: "Карточные игры"
                    },
                    {
                        value_1: "/games/drugie-igry",
                        value_2: "Игровые автоматы от Slototop"
                    },
                    {
                        value_1: "/games/leterei",
                        value_2: "Лотереи"
                    },
                    { 
                        value_1: "/games/ruletki",
                        value_2: "Рулетки"
                    }
                ]
        }
    ],
    menu: [
        {
            src: "http://127.0.0.1:5000/img/default.png",
            value_1: "test ua",
            value_2: "test ua"
        },
        {
            src: "http://127.0.0.1:5000/img/default.png",
            value_1: "test 1 ua",
            value_2: "test 2 ua"
        }
    ],
    img: 'http://127.0.0.1:5000/img/default.png',
    user: {
        name: 'admin',
        email: 'admin@mail.ru',
        role: 'admin',
        password: '212007'
    },
    pages: {
        main: {
            ru: {
                permalink: 'main',
                title: 'Main page ru', 
                thumbnail: 'http://127.0.0.1:5000/img/default.png',
                short_desc: 'Short desc main page ru',
                h1: 'H1 main page ru',
                meta_title: 'Meta title main page ru', 
                description: 'Description main page ru',
                keywords: 'Keywords main page ru',
                content: 'Content main page ru',
                lang: 1
            },
            ua: {
                permalink: 'ua',
                title: 'Main page ua', 
                thumbnail: 'http://127.0.0.1:5000/img/default.png',
                short_desc: 'Short desc main page ua',
                h1: 'H1 main page ua',
                meta_title: 'Meta title main page ua', 
                description: 'Description main page ua',
                keywords: 'Keywords main page ua',
                content: 'Content main page ua',
                lang: 2
            },
            update: {
                content: 'Content main page ru update',
                description: 'Description main page ru update',
                created_at: "2022-02-25T09:20:25.000Z",
                h1: 'H1 main page ru update',
                id: 1,
                keywords: 'Keywords main page ru update',
                lang: 1,
                meta_title: 'Meta title main page ru update',
                permalink: 'main',
                short_desc: 'Short desc main page ru update',
                status: 'public',
                thumbnail: 'http://127.0.0.1:5000/img/default.png',
                title: 'Main page ru update',
                updated_at: "2022-02-25T09:20:25.000Z"
            }
        }
    },
    posts: {
        dafault: {
            permalink: 'mock-post',
            title: 'Title mock-post',
            status: 'public',
            thumbnail: 'http://127.0.0.1:5000/img/default.png',
            short_desc: 'Short desc mock-post',
            h1: 'H1 mock-post',
            meta_title: 'Meta title mock-post',
            description: 'Description mock-post',
            keywords: 'Keywords mock-post',
            lang: 1,
            updated_at: '2022-03-27T08:59:58.000Z',
            created_at: '2022-03-27T08:59:58.000Z',
            content: '<p>Content mock-post</p>',
        },
        defaultUpdate: {
            id: 1,
            permalink: 'mock-post-update',
            title: 'Title mock-post update',
            status: 'public',
            thumbnail: 'http://127.0.0.1:5000/img/update.png',
            short_desc: 'Short desc mock-post update',
            h1: 'H1 mock-post update',
            lang: 1,
            meta_title: 'Meta title mock-post update',
            description: 'Description mock-post update',
            keywords: 'Keywords mock-post update',
            updated_at: '2022-02-27T08:59:58.000Z',
            created_at: '2022-02-27T08:59:58.000Z',
            content: '<p>Content mock-post update</p>',
            category: ['Title category-1']
        },
        casino: {
            update: {
                faq: [
                    {
                        value_1: '✅ Принимает ли Slotoking игроков из Украины? new',
                        value_2: 'Да, принимает. Slotoking одно из первых украинских казино. Кроме игроков их Украины, здесь могут играть жители Европы и Азии.'
                    }
                ],
                reviews: [
                    {
                        review_name: 'Anrey1703',
                        review_rating: '90',
                        date: '16.05.2021',
                        review_text: 'Реально — очень крутое казино. В Украине, пожалуй, лучшее. Очень удобный интерфейс и отличная подборка слотов. Есть из чего выбрать. 50 фриспинов за регистрацию пришлись кстати. Выиграть на них у меня не получилось, но разобраться что к чему смог. Забросил на счет пару сотен гривен и не пожалел. Адреналина получил сполна на всю сумму и даже остался в плюсах.'
                    }
                ],
                ref: ['//salatsmayonezom.com/ref/58752626/'],
                close: 1,
                rating: 80,
                phone: 'Phone new',
                min_deposit: 'Min deposit new',
                min_payments: 'Min payments new',
                email: 'Email new',
                chat: 'Chat new',
                year: 'Year new',
                site: 'Site new',
                withdrawal: 'Withdrawal new',
                number_games: 'Number Games new',
                events: [],
                welcome_bonus: 'welcome_bonus 100$',
                freespins: '20x',
                category: ['Title category-1'],
                casino_license: [],
                casino_payment: [],
                casino_vendor: []
            }
        },
        game: {
            update: {
                rating: 75,
                number_games: 10,
                iframe: 'iframe',
                details: [],
                characters: [],
                galery: [],
                category: ['Title category-1'],
                game_casino: [],
                game_vendor: []
            }
        },
        license: {
            update: {
                faq: [
                    {
                        value_1: '✅ Принимает ли Slotoking игроков из Украины? new',
                        value_2: 'Да, принимает. Slotoking одно из первых украинских казино. Кроме игроков их Украины, здесь могут играть жители Европы и Азии.'
                    }
                ],
                category: ['Title category-1']
            }
        },
        article: {
            update: {
                faq: [
                    {
                        value_1: '✅ Принимает ли Slotoking игроков из Украины? new',
                        value_2: 'Да, принимает. Slotoking одно из первых украинских казино. Кроме игроков их Украины, здесь могут играть жители Европы и Азии.'
                    }
                ],
                category: ['Title category-1']
            }
        }
    },
    base64: "data:image/png;base64,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"
}