<template>
  <div :class="Styles.textCard">
    {{ title }}
    {{ size }}
    <br>
    {{ tasks }}
		<!-- {{ this.$store.state.todo.week["2020"]["8"]["0"] }} -->
  </div>
</template>

<script>
import Styles from "./styles.scss";

export default {
  data() {
    return {
      Styles,
    };
  },
  name: "TextCard",
  props: ["title", "size", "tasks"]
};
</script>
