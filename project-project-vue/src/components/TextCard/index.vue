<template>
  <div :class="Styles.textCard">
		<div class="title">
			{{ title }}
		</div>

		<div v-if="tasks">
			<ul>
				<li v-for="task in tasks">
					• {{ task.taskName }}

					<div class="subtask" v-for="subtask in task.subtasks">
						{{ subtask.subtaskName }}
					</div>
				</li>
			</ul>
		</div>

		<div v-else-if="stickyNoteData">
			{{ stickyNoteData }}
		</div>

		<div v-else-if="categoryData">
			<ul>
				<li v-for="category in categoryData.categories">
					{{ category }}
				</li>
			</ul>
		</div>


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
  props: ["title", "size", "tasks", "stickyNoteData", "categoryData"], 
};
</script>
