<template>
  <div :class="Styles.textCard">
		<div class="title">
		<span v-if="categoryData">
      <span :style="'color:'+categoryData.color+'; text-decoration: underline;'">
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
          <p :style="'text-decoration: underline;'+'-webkit-text-decoration-color:'+$store.getters.getCategoryColor(task.category)+'; text-decoration-color:'+$store.getters.getCategoryColor(task.category)+';'">
            • {{ task.taskName }}
          </p>

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
