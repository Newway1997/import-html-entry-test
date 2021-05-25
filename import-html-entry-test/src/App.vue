<template>
  <div id="app">
    <button @click="loadApp">loadApp</button>
    <button @click="loadApp100">loadApp 100 times</button>
    <div>{{ count1 }}</div>
    <button @click="loadAppWithEvalCache">loadAppWithEvalCache</button>
    <button @click="loadAppWithEvalCache100">
      loadAppWithEvalCache 100 times
    </button>
    <div>{{ count2 }}</div>
  </div>
</template>

<script>
import importHTML from "import-html-entry";
import importHTMLWithEvalCache from "./with-eval-cache";
export default {
  name: "App",
  data() {
    return {
      set1: new Set(),
      set2: new Set(),
      count1: 0,
      count2: 0,
    };
  },
  methods: {
    async loadApp() {
      console.time("loadApp");
      const res = await importHTML("./subApp/index.html");
      const exports = await res.execScripts({});
      this.set1.add(exports);
      this.count1 = this.set1.size;
      console.timeEnd("loadApp");
    },
    async loadAppWithEvalCache() {
      console.time("loadAppWithEvalCache");
      const res = await importHTMLWithEvalCache("./subApp/index.html");
      const exports = await res.execScripts({});
      this.set2.add(exports);
      this.count2 = this.set2.size;
      console.timeEnd("loadAppWithEvalCache");
    },
    async loadApp100() {
      console.time("loadApp 100 times");
      for (let i = 0; i < 100; i++) {
        await this.loadApp();
      }
      console.timeEnd("loadApp 100 times");
    },
    async loadAppWithEvalCache100() {
      console.time("loadAppWithEvalCache 100 times");

      for (let i = 0; i < 100; i++) {
        await this.loadAppWithEvalCache();
      }
      console.timeEnd("loadAppWithEvalCache 100 times");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
