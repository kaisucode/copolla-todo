<template>
	<div :class="Styles.container">
		<div :class="Styles.row">
			<TextCard title="Jan"
								:stickyNoteData="getMonthData(0)"
			/>
			<TextCard title="Feb"
								:stickyNoteData="getMonthData(1)"
			/>
			<TextCard title="Wed"
								:stickyNoteData="getMonthData(2)"
			/>
			<TextCard title="Thu"
								:stickyNoteData="getMonthData(3)"
			/>
		</div>
		<div :class="Styles.row">
			<TextCard title="Jan"
								:stickyNoteData="getMonthData(0)"
			/>
			<TextCard title="Feb"
								:stickyNoteData="getMonthData(1)"
			/>
			<TextCard title="Wed"
								:stickyNoteData="getMonthData(2)"
			/>
			<TextCard title="Thu"
								:stickyNoteData="getMonthData(3)"
			/>
		</div>
		<div :class="Styles.row">
			<TextCard title="Jan"
								:stickyNoteData="getMonthData(0)"
			/>
			<TextCard title="Feb"
								:stickyNoteData="getMonthData(1)"
			/>
			<TextCard title="Wed"
								:stickyNoteData="getMonthData(2)"
			/>
			<TextCard title="Thu"
								:stickyNoteData="getMonthData(3)"
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

