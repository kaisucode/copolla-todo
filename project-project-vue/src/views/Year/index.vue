<template>
	<div :class="Styles.container">
		<div :class="Styles.row">
			<TextCard title="Jan"
								id="textcard_0_0" 
								:stickyNoteData="getMonthData(0)"
			/>
			<TextCard title="Feb"
								id="textcard_0_1" 
								:stickyNoteData="getMonthData(1)"
			/>
			<TextCard title="Wed"
								id="textcard_0_2" 
								:stickyNoteData="getMonthData(2)"
			/>
			<TextCard title="Thu"
								id="textcard_0_3" 
								:stickyNoteData="getMonthData(3)"
			/>
		</div>
		<div :class="Styles.row">
			<TextCard title="Jan"
								id="textcard_1_0" 
								:stickyNoteData="getMonthData(4)"
			/>
			<TextCard title="Feb"
								id="textcard_1_1" 
								:stickyNoteData="getMonthData(5)"
			/>
			<TextCard title="Wed"
								id="textcard_1_2" 
								:stickyNoteData="getMonthData(6)"
			/>
			<TextCard title="Thu"
								id="textcard_1_3" 
								:stickyNoteData="getMonthData(7)"
			/>
		</div>
		<div :class="Styles.row">
			<TextCard title="Jan"
								id="textcard_2_0" 
								:stickyNoteData="getMonthData(8)"
			/>
			<TextCard title="Feb"
								id="textcard_2_1" 
								:stickyNoteData="getMonthData(9)"
			/>
			<TextCard title="Wed"
								id="textcard_2_2" 
								:stickyNoteData="getMonthData(10)"
			/>
			<TextCard title="Thu"
								id="textcard_2_3" 
								:stickyNoteData="getMonthData(11)"
			/>
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
		getMonthData(index){
            return this.$store.state.todo.year['2020'][index];
		}
	}
}
</script>

