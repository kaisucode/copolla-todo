<template>
  <div :class="Styles.container">
    <div :class="Styles.row">
      <TextCard title="Mon" :tasks="getDayTasks(0)" />
      <TextCard title="Tue" :tasks="getDayTasks(1)" />
      <TextCard title="Wed" :tasks="getDayTasks(2)" />
      <TextCard title="Thu" :tasks="getDayTasks(3)" />
    </div>

    <div :class="Styles.row">
      <TextCard title="Fri" :tasks="getDayTasks(4)" />
      <TextCard title="Sat" :tasks="getDayTasks(5)" />
      <TextCard title="Sun" :tasks="getDayTasks(6)" />
      <TextCard title="Back-burner" :tasks="$store.state.todo.backBurner" />
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
  name: "Week",
  components: {
    TextCard,
  },
  methods: {
    // increment(){
    //     this.$store.commit('increment');
    // }
    getDayTasks(index) {
      return this.$store.state.todo.week["2020"]["8"][index];
    },
  },
};
</script>
