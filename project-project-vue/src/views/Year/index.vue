<template>
	<div :class="Styles.container">
		<div :class="Styles.row">
			<TextCard title="Jan"
								:stickyNoteData="getMonthData(0)"
								id="textcard_0_0" 
			/>
			<TextCard title="Feb"
								:stickyNoteData="getMonthData(1)"
								id="textcard_0_1" 
			/>
			<TextCard title="Wed"
								:stickyNoteData="getMonthData(2)"
								id="textcard_0_2" 
			/>
			<TextCard title="Thu"
								:stickyNoteData="getMonthData(3)"
								id="textcard_0_3" 
			/>
		</div>
		<div :class="Styles.row">
			<TextCard title="Jan"
								:stickyNoteData="getMonthData(0)"
								id="textcard_1_4" 
			/>
			<TextCard title="Feb"
								:stickyNoteData="getMonthData(1)"
								id="textcard_1_5" 
			/>
			<TextCard title="Wed"
								:stickyNoteData="getMonthData(2)"
								id="textcard_1_6" 
			/>
			<TextCard title="Thu"
								:stickyNoteData="getMonthData(3)"
								id="textcard_1_7" 
			/>
		</div>
		<div :class="Styles.row">
			<TextCard title="Jan"
								:stickyNoteData="getMonthData(0)"
								id="textcard_2_8" 
			/>
			<TextCard title="Feb"
								:stickyNoteData="getMonthData(1)"
								id="textcard_2_9" 
			/>
			<TextCard title="Wed"
								:stickyNoteData="getMonthData(2)"
								id="textcard_2_10" 
			/>
			<TextCard title="Thu"
								:stickyNoteData="getMonthData(3)"
								id="textcard_2_11" 
			/>
		</div>
	</div>
	<!-- <button @click="increment">+</button> -->
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
		getMonthData(index){
            return this.$store.state.todo.year['2020'][index];
		}
	}
}
</script>

