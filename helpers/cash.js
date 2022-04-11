const cash = {
    setData: (url, data) => global.cash[url] = data,
    getData: (url) => Object.assign(global.cash[url], {cash: true}),
    isCash: (url) => global.cash[url] ? true : false,
    destroy: () => global.cash = {}
 }
 module.exports = cash