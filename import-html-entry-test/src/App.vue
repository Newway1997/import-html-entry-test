<template>
  <div id="app">
    <button @click="loadApp">loadApp</button>
    <div>{{ count1 }}</div>
    <button @click="loadAppWithEvalCache">loadAppWithEvalCache</button>
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
    loadApp() {
      console.time("loadApp");
      importHTML("./subApp/index.html").then((res) => {
        res.execScripts({}).then((exports) => {
          this.set1.add(exports);
          this.count1 = this.set1.size;
          console.timeEnd("loadApp");
        });
      });
    },
    loadAppWithEvalCache() {
      console.time("loadAppWithEvalCache");
      importHTMLWithEvalCache("./subApp/index.html").then((res) => {
        res.execScripts({}).then((exports) => {
          this.set2.add(exports);
          this.count2 = this.set2.size;
          console.timeEnd("loadAppWithEvalCache");
        });
      });
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
