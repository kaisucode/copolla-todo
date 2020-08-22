<template>
  <div :class="Styles.textCard">
    {{ title }}
    {{ size }}
    <br>

		<ul>
			<li v-for="task in tasks">
				{{ task.taskName }}
			</li>
		</ul>

		{{ stickyNoteData }}
		<!-- <ul> -->
		<!--   <li v-for="task in stickyNoteData"> -->
		<!--     {{ task }} -->
		<!--   </li> -->
		<!-- </ul> -->

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
  props: ["title", "size", "tasks", "stickyNoteData"]
};
</script>
