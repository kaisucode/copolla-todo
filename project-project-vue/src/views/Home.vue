<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		<HelloWorld msg="Welcome to Your Vue.js App"/>
		<button @click="increment">+</button>

	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
	name: 'Home',
	components: {
		HelloWorld
	}, 
	methods: {
		increment(){
			this.$store.commit('increment');
		}

	}
}
</script>
