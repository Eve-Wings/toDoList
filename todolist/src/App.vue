<template>
  <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
		<n-space vertical>
			<n-button>naive-ui</n-button>
			<n-button type="info">测试</n-button>
		</n-space>
	</n-config-provider>
</template>


<script>
import { defineComponent } from 'vue'
import { NConfigProvider, NSpace } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
import { NButton } from 'naive-ui'
export default defineComponent({
  name: 'App',
	components: {
		NConfigProvider,
		NButton,
		NSpace
	},
	setup() {
		return {
			darkTheme,
			zhCN,
			dateZhCN
		}
	}
})
</script>

<style>
body {
	background: black;
}
</style>
