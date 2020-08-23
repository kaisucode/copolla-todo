<template>
  <div :class="Styles.container">
    <div :class="Styles.row">
			<div v-for="(metacategory, index) in $store.state.todo.categories">
				<TextCard :id="generateID(index)" :title="metacategory.name" :categoryData="metacategory" :categorytasklists="getMetaCategoryTasks(metacategory.name, index)"/>
			</div>
    </div>
  </div>
</template>

<script>
import Styles from "./styles.scss";
import TextCard from "@/components/TextCard";

export default {
  data() {
    return {
      Styles
    };
  },
  name: "Categories",
  components: {
    TextCard
  },
  methods: {
    generateID(index){
      return `textcard_0_${index}`;
    },
    getMetaCategoryTasks(metacategory, index) {
			return this.$store.getters.getMetacategoryTaskList(metacategory, index);
    }
  },
};
</script>
