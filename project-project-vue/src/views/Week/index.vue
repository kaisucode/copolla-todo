<template>
	<div :class="Styles.container">
    <div :class="Styles.row">
      <TextCard id="textcard_0_0" title="Mon" :tasks="getDayTasks(0)" />
      <TextCard id="textcard_0_1" title="Tue" :tasks="getDayTasks(1)" />
      <TextCard id="textcard_0_2" title="Wed" :tasks="getDayTasks(2)" />
      <TextCard id="textcard_0_3" title="Thu" :tasks="getDayTasks(3)" />
		</div>
    <div :class="Styles.row">
      <TextCard id="textcard_1_0" title="Fri" :tasks="getDayTasks(4)" />
      <TextCard id="textcard_1_1" title="Sat" :tasks="getDayTasks(5)" />
      <TextCard id="textcard_1_2" title="Sun" :tasks="getDayTasks(6)" />
      <TextCard id="textcard_1_3" title="Back-burner" :tasks="$store.state.todo.backBurner" />
		</div>

		<input type="text" id="commandEntry">

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
			return this.$store.state.todo.week["2020-8-1"][index];
    },
  },
};
</script>
