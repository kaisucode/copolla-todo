<template>
  <div class="text-card">
		{{ title }}
  </div>
</template>

<script>
export default {
  name: 'TextCard',
  props: ['title']
  // props: {
  //   msg: String, 
  //       style: String
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.text-card {
	color: $cyan;
	background-color: $spacegrey;
	border-radius: 20px;
	width: 300px;
	height: 400px;
	margin: 10px;
	font-size: 1.4em;
}
</style>
