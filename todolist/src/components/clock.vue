<template>
	<div class="clock">
		<transition name="clock-open">
			<div v-if="timeMessage">
				<n-card>
					<n-gradient-text size="22" type="danger">已经{{time.getHours()}}点了哦</n-gradient-text>
				</n-card>
			</div>
		</transition>
		<transition name="clock-open" >
			<div v-if="isOpenClock">
				<n-card title="我的天啊,你都看看几点了" closable @close="openClock()"
					:segmented="{content: 'hard'}">
					<div style=" text-align: center; font-size: 16px;">
						<n-gradient-text :size="24" type="success"><n-time :time="time" type="datetime " format="yyyy-MM-dd HH:mm:ss" /></n-gradient-text>
					</div>
				</n-card>
			</div>
		</transition>
		<n-button text @click="openClock()">
			<n-gradient-text :size="16" type="success"><n-time :time="time" type="datetime " format="yyyy-MM-dd HH:mm:ss" /></n-gradient-text>
		</n-button>
	</div>
</template>

<script>
	import '../assets/css/clock.css'
	import {
		NCard,
		NButton,
		NTime,
		NGradientText
	} from 'naive-ui'
	export default {
		name: 'clock',
		components: {
			NCard,
			NButton,
			NTime,
			NGradientText
		},
		data() {
			return {
				time: '',
				isOpenClock: false,
				timeMessage: false,
			}
		},
		methods: {
			openClock() {
				this.isOpenClock = !this.isOpenClock
			}
		},
		created() {
			this.time = new Date()
			setInterval(() => {
				this.time = new Date()
				if(this.time.getMinutes() === 0 && this.time.getSeconds() === 0){
					this.timeMessage = true
					setTimeout(() => {
						this.timeMessage = false
					},5000)
				}
			}, 500)
		}
	}
</script>

<style>
</style>
