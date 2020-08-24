<template>
	<div :class="Styles.container">
		<div :class="Styles.row">
			<TextCard :title="getTitle(0)" id="textcard_0_0" :stickyNoteData="getMonthData(0)" />
			<TextCard :title="getTitle(1)" id="textcard_0_1" :stickyNoteData="getMonthData(1)" />
			<TextCard :title="getTitle(2)" id="textcard_0_2" :stickyNoteData="getMonthData(2)" />
			<TextCard :title="getTitle(3)" id="textcard_0_3" :stickyNoteData="getMonthData(3)" />
		</div>
		<div :class="Styles.row">
			<TextCard :title="getTitle(4)" id="textcard_1_0" :stickyNoteData="getMonthData(4)" />
			<TextCard :title="getTitle(5)" id="textcard_1_1" :stickyNoteData="getMonthData(5)" />
			<TextCard :title="getTitle(6)" id="textcard_1_2" :stickyNoteData="getMonthData(6)" />
			<TextCard :title="getTitle(7)" id="textcard_1_3" :stickyNoteData="getMonthData(7)" />
		</div>
		<div :class="Styles.row">
			<TextCard :title="getTitle(8)" id="textcard_2_0" :stickyNoteData="getMonthData(8)" />
			<TextCard :title="getTitle(9)" id="textcard_2_1" :stickyNoteData="getMonthData(9)" />
			<TextCard :title="getTitle(10)" id="textcard_2_2" :stickyNoteData="getMonthData(10)" />
			<TextCard :title="getTitle(11)" id="textcard_2_3" :stickyNoteData="getMonthData(11)" />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Styles from './styles.scss'
import TextCard from '@/components/TextCard'

export default {
	data () {
		return {
			Styles
		}
	}, 
	name: 'Year',
	components: {
      TextCard
	}, 
	methods: {
    getTitle(i){
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return monthNames[i] + " " + this.$store.state.times.year;
    },
		getMonthData(index){
            return this.$store.state.todo.year[this.$store.state.times.year][index];
		}
	}
}
</script>

