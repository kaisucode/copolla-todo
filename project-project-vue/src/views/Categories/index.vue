<template>
  <div :class="Styles.container">
    <div :class="Styles.row">
			<div v-for="metaCategory in $store.state.todo.metaCategories">
				<TextCard :title="metaCategory.name" :categoryData="metaCategory"/>
			</div>
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
      Styles,
    };
  },
  name: "Categories",
  components: {
    TextCard,
  },
  methods: {
    getWeekData(index) {
      return this.$store.state.todo.month["2020"]["8"][index];
    },
  },
};
</script>
