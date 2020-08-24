<template>
  <div :class="Styles.container">
    <h1>About</h1>

		<p>
		This project was created in the summer of 2020, by <a href="https://awestover.github.io/">Alek Westover</a> and <a href="https://kevinhsu.net/">Kevin Hsu</a>, with the assistance of <a href="https://github.com/ifan2032">Leon Fan</a> and <a href="https://github.com/ziyongcui">Ziyong Cui</a>. 
		<br><br>
		The idea was borne out of our obsession for Vim, or more precisely, Neovim, and the multitude of markdown and text todo files littered across our systems. 
		<br>
		</p>



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
