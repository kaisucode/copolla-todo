<template>
	<div class="home">
		<div :class="Styles.container">
			<div :class="Styles.row">
				<TextCard title="Mon" />
				<TextCard title="Tue"/>
				<TextCard title="Wed" />
				<TextCard title="Thu"/>
			</div>
			<div :class="Styles.row">
				<TextCard title="Fri" />
				<TextCard title="Sat"/>
				<TextCard title="Sun" />
				<TextCard title="Back-burner"/>
			</div>
		</div>
		<!-- <button @click="increment">+</button> -->
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
	name: 'Home',
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

