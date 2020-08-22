<template>
	<div :class="Styles.container">
		<div :class="Styles.row">
			<TextCard title="Week1"
								:weekData="getWeekData(0)"
			/>
			<TextCard title="Week2"
								:weekData="getWeekData(1)"
			/>
			<TextCard title="Week3"
								:weekData="getWeekData(2)"
			/>
		</div>
		<div :class="Styles.row">
			<TextCard title="Week4"
								:weekData="getWeekData(3)"
			/>
			<TextCard title="Week5"
								:weekData="getWeekData(4)"
			/>
			<TextCard title="Week6"
								:weekData="getWeekData(5)"
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
	name: 'Month',
	components: {
		TextCard
	}, 
	methods: {
		getWeekData(index){
            return this.$store.state.todo.month['2020']['8'][index];
		}
	}
}
</script>

