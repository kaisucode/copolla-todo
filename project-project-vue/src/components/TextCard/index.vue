<template>
  <div :class="Styles.textCard">
    {{ title }}
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
  props: {
    title: String,
  },
};
</script>
