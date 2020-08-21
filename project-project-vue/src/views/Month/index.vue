<template>
	<div :class="Styles.container">
		<div :class="Styles.row">
			<TextCard size="wide" title="Week1" />
			<TextCard size="wide" title="Week2"/>
			<TextCard size="wide" title="Week3" />
		</div>
		<div :class="Styles.row">
			<TextCard size="wide" title="Week4" />
			<TextCard size="wide" title="Week5"/>
			<TextCard size="wide" title="Week6" />
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
		// increment(){
		//     this.$store.commit('increment');
		// }
	}
}
</script>

