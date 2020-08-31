<template>
  <div :class="Styles.container">
    <h1>About</h1>

    <h3 style="color:red">We take no responsibility for lost todo lists. Accept the impermanence of data.</h3>

		<p>

		<h3>
		This project was created in the summer of 2020, by <a href="https://awestover.github.io/">Alek Westover</a> and <a href="https://kevinhsu.net/">Kevin Hsu</a>, with the assistance of <a href="https://github.com/ifan2032">Leon Fan</a> and <a href="https://github.com/ziyongcui">Ziyong Cui</a>. 
		The idea was borne out of our obsession for Vim, or more precisely, Neovim, and the multitude of markdown and text todo files littered across our systems. 
		<br><br><br>

		"Life is just a nice UI for doing I/O with a bunch of JSONs" - Alek Westover
		<br>
		<i>(As demonstrated by this todo app)</i>

		<br><br>

		"Errors in Javascript are like warnings in C; they're suggestive and I tend to ignore both" - Kevin Hsu
		<br>
		<i>(That's why we're still releasing the app, despite the part where the package has a ton of errors every time I try building it)</i>

		</h3>
		</p>

		<br><br>
		<img src="@/assets/icon.png" width="60%">

  </div>
</template>

<script>
import Styles from "./styles.scss";

export default {
  data() {
    return {
      Styles
    };
  },
  name: "About",
  components: { },
  methods: { },
};
</script>
