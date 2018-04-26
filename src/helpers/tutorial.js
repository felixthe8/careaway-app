const Tutorial = {}

Tutorial.install = function (Vue, options) {
  Vue.prototype.$toggleTutorialWidget = function (flag) {
    return (!flag)
  }
}

export default Tutorial