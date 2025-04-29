import ArrWatch from './main'
export default {
  install: function (Vue, options) {
    Vue.mixin(ArrWatch)
   }
}