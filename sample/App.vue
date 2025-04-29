<script setup>
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
</script>

<template>
  <div id="app">
    <a href="https://vite.dev" target="_blank">
      <img :src="viteLogo" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img :src="javascriptLogo" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button type="button" @click="addItem">add item</button>
      <button type="button" @click="delItem">delete item</button>
    </div>
    <table class="pure-table">
        <thead>
            <tr>
                <th>#</th>
                <th>name</th>
                <th>price</th>
                <th>count</th>
                <th>amount</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in arrData" :key="index" :class="{'pure-table-odd': index % 2 === 1}">
              <td>{{index}}</td>
              <td>{{item.name}}</td>
              <td>{{item.price}}</td>
              <td><input type="number" v-model="item.count" /></td>
              <td>{{item.amount}}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import demoData from './data.json'
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
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
      handle: function (newValue, oldValue, top, parent) {
        console.log('arrData changed', newValue, oldValue)
      },
      item: {
        count: function (newValue, oldValue, top, parent) {
          parent.amount = parent.price * parent.count
        }
      }
    }
  },
  methods: {
    addItem () {
      this.arrData.push({...demoData[getRandomInt(demoData.length)]})
    },
    delItem () {
      this.arrData.splice(getRandomInt(this.arrData.length), 1)
    }
  }
}
</script>
