export default {
  created () {
    const arrWatch = this.$options.arrWatch
    if (arrWatch) {
      const arrItemWatchs = new Map()
      for (const key in arrWatch) {
        this._arrWatch(() => this[key], arrWatch[key], arrItemWatchs, () => {
          return {
            self: this[key]
          }
      })
      }
    }
  },
  methods: {
    _arrWatch (val, watch, watchers, parent) {
      return this.$watch(val, function (newValue, oldValue) {
        if (watch.handle) {
          watch.handle.call(this, newValue, oldValue, parent())
        }
        // 移除数组中丢失数据的监听
        const lostedData = [...watchers.keys()].filter(key => {
          return !newValue?.some(v => v === key)
        })
        const unwatch = item => {
          if (item instanceof Function) {
            item()
          } else {
            // array or map
            [...item.values()].forEach(unwatch)
          }
        }
        lostedData.forEach(key => {
          watchers.get(key).forEach(unwatch)
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
                  watch.item[key].call(this, v, ov, {parent: parent(), self: item})
                }, { immediate: true })
                itemWatchers.push(unwatch)
              } else if (watch.item[key] instanceof Object) {
                const subWatchers = new Map()
                const unwatch = this._arrWatch(() => item[key], watch.item[key], subWatchers, () => {
                  return {
                    parent: parent(),
                    self: item
                  }
                })
                itemWatchers.push(subWatchers)
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