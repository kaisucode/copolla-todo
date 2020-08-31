<template>
  <div :class="Styles.textCard">
    <div class="title">
      <span v-if="categoryData">
        <span :style="'color:' + categoryData.color + '; text-decoration: underline;'" >
          {{ title }}
        </span>
      </span>
      <span v-else="categoryData">
        {{ title }}
      </span>
    </div>

    <span v-if="tasks">
      <ul>
        <li v-for="task in tasks">
          <p v-if="task.completed" :style="getColor(task)">
            ☒ <span :style="'text-decoration: line-through; display: inline'">{{ task.taskName }}</span>
          </p>
          <p v-else :style="getColor(task)">
            ☐ <span :style="'text-decoration: none; display: inline'">{{ task.taskName }}</span>
          </p>
          <span style="margin-left: 1em;" v-if="task.description"> ({{ task.description }}) </span>
        </li>

        <li v-for="task in recurring">
          <p
            :style="
              'text-decoration: underline;' +
              getColor(task)
            "
          >
            ({{ task.taskName }})
          </p>

          <span style="margin-left: 1em;" v-if="task.description">
            ({{ task.description }})
          </span>
        </li>
      </ul>
    </span>

    <span v-else-if="stickyNoteData">
      <br />
      {{ stickyNoteData }}
    </span>

    <span v-else-if="categoryData">
      <ul>
        <li v-for="category in categoryData.categories">
          • {{ category }}
          <ul>
            <li v-for="task in categorytasklists[category]">☆ {{ task }}</li>
          </ul>
        </li>
      </ul>
    </span>
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
  props: [
    "title",
    "size",
    "tasks",
    "stickyNoteData",
    "categoryData",
    "categorytasklists",
    "recurring",
  ],
  methods: {
    getColor(task) {
      let color = this.$store.getters.getCategoryColor(task.category);
			console.log(color);
			if (color == "white")
				return `-webkit-text-decoration-color: ${color}; text-decoration-color: ${color};`;
			else
				return `-webkit-text-decoration-color: ${color}; text-decoration-color: ${color}; color: ${color};`;
    },
  },
};
</script>
