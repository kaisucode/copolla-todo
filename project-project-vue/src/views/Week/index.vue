<template>
	<div :class="Styles.container">
		<div :class="Styles.row">
			<TextCard title="Mon"
								:tasks="$store.state.todo.week['2020']['8']['0']"
			/>
			<TextCard title="Tue"/>
			<TextCard title="Wed" />
			<TextCard title="Thu"/>
		</div>

		<!-- One day -->
		{{ this.$store.state.todo.week["2020"]["8"]["0"] }}
		<hr>
		<!-- One task -->
		{{ this.$store.state.todo.week["2020"]["8"]["0"][0] }}


		<div :class="Styles.row">
			<TextCard title="Fri" />
			<TextCard title="Sat"/>
			<TextCard title="Sun" />
			<TextCard title="Back-burner"/>
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
	name: 'Week',
	components: {
      TextCard
	}, 
	methods: {
		// increment(){
		//     this.$store.commit('increment');
		// }
	}
}
</script>

