<template>
  <div :class="Styles.textCard">
		<div class="title">
			{{ title }}
		</div>

		<span v-if="tasks">
			<ul>
				<li v-for="task in tasks">
					• {{ task.taskName }}

					<div :class="Styles.subtask" v-for="subtask in task.subtasks">
						- {{ subtask.subtaskName }}
					</div>
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
					[ ] {{ category }}
          <ul>
            <li v-for="task in categorytasklists[category]"> 
              ☆ {{ task }}
            </li>
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
  props: ["title", "size", "tasks", "stickyNoteData", "categoryData", "categorytasklists"], 
};
</script>
