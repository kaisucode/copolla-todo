<template>
  <div :class="Styles.container">
    <div :class="Styles.row">
      <TextCard title="Week1" :stickyNoteData="getWeekData(0)" />
      <TextCard title="Week2" :stickyNoteData="getWeekData(1)" />
      <TextCard title="Week3" :stickyNoteData="getWeekData(2)" />
    </div>
    <div :class="Styles.row">
      <TextCard title="Week4" :stickyNoteData="getWeekData(3)" />
      <TextCard title="Week5" :stickyNoteData="getWeekData(4)" />
      <TextCard title="Week6" :stickyNoteData="getWeekData(5)" />
    </div>
  </div>
  <!-- <button @click="increment">+</button> -->
</template>

<script>
// @ is an alias to /src
import Styles from "./styles.scss";
import TextCard from "@/components/TextCard";

export default {
  data() {
    return {
      Styles,
    };
  },
  name: "Month",
  components: {
    TextCard,
  },
  methods: {
    getWeekData(index) {
			return this.$store.state.todo.month[`2020-8-${index}`];
    },
  },
};
</script>
