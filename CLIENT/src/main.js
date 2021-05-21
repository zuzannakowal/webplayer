import Vue from 'vue';
import App from './App.vue';

let appka = new Vue({
  el: "#app",
  data: {
    tekst: "aaaa"
  },
  render: h => h(App),
});
