<template>
  <div :class="Styles.container">
    <div :class="Styles.row">
			<div v-for="(metaCategory, index) in $store.state.todo.metaCategories">
				<TextCard :id="generateID(index)" :title="metaCategory.name" :categoryData="metaCategory"/>
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
      Styles,
    };
  },
  name: "Categories",
  components: {
    TextCard,
  },
  methods: {
    generateID(index){
      return `textcard_0_${index}`;
    }
  },
};
</script>
