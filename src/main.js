export default {
  created () {
    const arrWatch = this.$options.arrWatch
    if (arrWatch) {
      const arrItemWatchs = new Map()
      for (const key in arrWatch) {
        this._arrWatch(() => this[key], arrWatch[key], arrItemWatchs, this[key], this)
      }
    }
  },
  methods: {
    _arrWatch (val, watch, watchers, top, parent) {
      return this.$watch(val, function (newValue, oldValue) {
        if (watch.handle) {
          watch.handle(newValue, oldValue, top, parent)
        }
        // 移除数组中丢失数据的监听
        const lostedData = watchers.keys().filter(key => {
          return newValue?.some(v => v === key)
        })
        lostedData.forEach(key => {
          watchers.get(key).forEach(unwatch => {
            unwatch()
          })
          watchers.delete(key)
        })
        if (watch.item) {
          newValue?.forEach(item => {
            // 已设置监听，不重复设置
            if (watchers.has(item)) {
              return
            }
            const itemWatchers = []
            for (const key in watch.item) {
              if (watch.item[key] instanceof Function) {
                const unwatch = this.$watch(() => item[key], function (v, ov) {
                  watch.item[key](v, ov, top, item)
                }, { immediate: true })
                itemWatchers.push(unwatch)
              } else if (watch.item[key] instanceof Object) {
                const unwatch = this._arrWatch(() => item[key], watch.item[key], watchers, top, item)
                itemWatchers.push(unwatch)
              }
            }
            watchers.set(item, itemWatchers)
          })
        }
      }, { immediate: true })
    }
  }
}