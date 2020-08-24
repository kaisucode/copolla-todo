<template>
	<div :class="Styles.container">
    <div :class="Styles.row">
      <TextCard id="textcard_0_0" :title="getTitle(0)" :tasks="getDayTasks(0)" />
      <TextCard id="textcard_0_1" :title="getTitle(1)" :tasks="getDayTasks(1)" />
      <TextCard id="textcard_0_2" :title="getTitle(2)" :tasks="getDayTasks(2)" />
      <TextCard id="textcard_0_3" :title="getTitle(3)" :tasks="getDayTasks(3)" />
		</div>
    <div :class="Styles.row">
      <TextCard id="textcard_1_0" :title="getTitle(4)" :tasks="getDayTasks(4)" />
      <TextCard id="textcard_1_1" :title="getTitle(5)" :tasks="getDayTasks(5)" />
      <TextCard id="textcard_1_2" :title="getTitle(6)" :tasks="getDayTasks(6)" />
      <TextCard id="textcard_1_3" title="Back-burner" :tasks="$store.state.todo.backBurner" />
		</div>

	</div>
</template>

<script>
// @ is an alias to /src
import Styles from "./styles.scss";
import TextCard from "@/components/TextCard";

export default {
  data() {
    return {
      Styles
    };
  },
  name: "Week",
  components: {
    TextCard
  },
  methods: {
    getTitle(i) {
      const millis_per_day = 1000 * 60 * 60 * 24;
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      let stored_date = new Date(this.$store.state.times.week);
      let dateI = new Date();
      dateI.setDate(stored_date.getDate() + i);
      return `${dayNames[i]} (${monthNames[dateI.getMonth()]} ${dateI.getDate()}, ${dateI.getYear()+1900})`;
    },
    getDayTasks(index) {
			return this.$store.state.todo.week[this.$store.state.times.week][index];
    }
  },
};
</script>
