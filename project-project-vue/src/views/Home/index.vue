<template>
	<div class="home">
		<div class="container">
			<div class="row">
				<TextCard title="Mon" />
				<TextCard title="Tue"/>
				<TextCard title="Wed" />
				<TextCard title="Thu"/>
			</div>
			<div class="row">
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
import TextCard from '@/components/TextCard.vue'

export default {
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

<style scoped lang="scss">
.container{
  display: flex;
	flex-direction: column;
	justify-content: center;

	.row{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
}
</style>
