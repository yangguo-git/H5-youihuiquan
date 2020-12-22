<template>
	<div class="headWrap">
		<van-nav-bar :title="title" left-text="" :left-arrow='isShowLeft' @click-left="onClickLeft"
		 fixed>
			<template #right v-if="isShowRight">
				<van-icon name="ellipsis" size="20" />
			</template>
		</van-nav-bar>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				isShowLeft: false,
				isShowRight:false
			}
		},
		methods: {
			onClickLeft() {
				this.$router.go(-1);
			}
		},
		props: ['title', 'isDetail','isNewAdress'],
		created() {
			if (this.isDetail == 1) {
				this.isShowLeft = true;
			}
		}

	}
</script>
<style scoped>
.headWrap .van-nav-bar{
	height: 40px;
}
</style>
