## 介绍

用于vue2中设置数组中对象属性的侦听。

## 使用

```
npm i vue-arrwatch
```

```
import ArrWatch from 'vue-arrwatch'
Vue.use(ArrWatch)
```

```
export default {
  data () {
    return {
      arrData: [{
          name: 'iPhone 12',
          price: 6999,
          count: 1,
          amount: 6999
        }, {
          name: 'MacBook Pro',
          price: 23999,
          count: 1,
          amount: 23999
        }, {
          name: 'AirPods',
          price: 1999,
          count: 1,
          amount: 1999
        }]
    }
  },
  arrWatch: {
    arrData: {
      handle: function (newValue, oldValue, parent) {
        console.log('arrData changed', newValue, oldValue)
      },
      item: {
        count: function (newValue, oldValue, parent) {
          const { self } = parent
          self.amount = self.price * self.count
        }
      }
    }
  }
}
```

## arrWatch选项

只用于数组类型数据，和vue中watch选项类似，handle用于数组变动的侦听，item用于侦听数组内部对象的值变动。

