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
					<p v-if="task.completed" :style="'text-decoration: none;'+'-webkit-text-decoration-color:'+$store.getters.getCategoryColor(task.category)+'; text-decoration-color:'+$store.getters.getCategoryColor(task.category)+';'">
					<!-- ☑ {{ task.taskName }} -->
					☒ {{ task.taskName }}
          </p>
					<p v-else :style="'text-decoration: none;'+'-webkit-text-decoration-color:'+$store.getters.getCategoryColor(task.category)+'; text-decoration-color:'+$store.getters.getCategoryColor(task.category)+';'">
					☐ {{ task.taskName }}
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
