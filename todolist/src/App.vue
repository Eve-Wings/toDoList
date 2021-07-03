<template>
	<n-config-provider :theme="themeData" :locale="zhCN" :date-locale="dateZhCN">
		<n-space vertical size="large">
			<!-- 顶部页眉 -->
			<headerNav></headerNav>
			<div id="main">
				<!-- 展示待办事项列表 -->
				<transition name="Slide-left"  mode="out-in">
					<div v-if="$store.state.mattersList.classifications.length !== 0">
						<n-card>
							<n-card v-for="(classification, classIndex) in $store.state.mattersList.classifications"
								:key="classIndex" class="classification">
								<n-collapse>
									<n-collapse-item :title="classification.label" :name="classIndex">
										<!-- 代办事项相关 -->
										<n-card v-for="(matter, matterIndex) in classification.matters" :key="matterIndex"
											class="matter" :class="{compMatter:matter.completion}" :title="matter.label">
											<!-- 待办事项操作相关 -->
											<template #header-extra>
												<div style="margin-right: 20px">
													<n-switch :default-value="matter.completion"
														@update:value="matterComplet(classIndex, matterIndex)"
														size="small" />
												</div>
												<div style="margin-right: 20px">
													<n-rate size="small" :value="matter.priority" />
												</div>
												<div>
													<n-button type="info" style="margin-right: 20px;"
														@click="showCreateMatterSonForm(classIndex, matterIndex)">+ 添加子事项
													</n-button>
													<n-button type="warning" style="margin-right: 20px;"
														@click="showEditMatter(matterIndex,matter)">编辑</n-button>
													<n-button type="error" @click="removeMatter(classIndex, matterIndex)">删除
													</n-button>
												</div>
											</template>
											<span v-if="matter.describe !== '' ">描述: {{matter.describe}}</span>
											<n-collapse>
												<n-collapse-item title="查看子事项" :name="matterIndex"
													v-if="matter.matterSons.length !== 0">
													<!-- 代办子事项相关 -->
													<n-card v-for="(matterSon,matterSonIndex) in matter.matterSons"
														:key="matterSonIndex" class="matterSon"
														:class="{compMatter:matterSon.completion}"
														:title="matterSon.label">
														<!-- 代办子事项操作相关 -->
														<template #header-extra>
															<div style="margin-right: 20px;">
																<n-switch :default-value="matterSon.completion"
																	@update:value="matterSonComplet(classIndex, matterIndex, matterSonIndex)"
																	size="small" />
															</div>
															<div style="margin-right: 20px;">
																<n-rate size="small" :value="matterSon.priority" />
															</div>
															<div>
																<n-button type="warning" style="margin-right: 20px"
																	@click="showEditMatterSon(matterSonIndex,matterSon)">
																	编辑</n-button>
																<n-button type="error"
																	@click="removeMatterSon(classIndex, matterIndex, matterSonIndex)">
																	删除</n-button>
															</div>
														</template>
														<span v-if="matterSon.describe !=='' ">描述:
															{{matterSon.describe}}</span>
													</n-card>
												</n-collapse-item>
											</n-collapse>
										</n-card>
										<!-- 代办事项结束 -->
									</n-collapse-item>
									<!-- 用于修改分类的内容 -->
									<div class="classEditBtns">
										<n-button type="info" style="margin-right: 20px;"
											@click="showCreateMatterForm(classIndex)">+ 添加事项</n-button>
										<n-button type="warning" style="margin-right: 20px;"
											@click="showEditClassForm(classIndex)">编辑</n-button>
										<n-button type="error" @click="removeClass(classIndex)">删除</n-button>
									</div>
								</n-collapse>
							</n-card>
							<n-card title="创建新的分类" style="margin-top: 30px;">
								<template #header-extra>
									<n-button circle style="font-size: 1.5rem;" @click="showClassForm()">+</n-button>
								</template>
							</n-card>
						</n-card>
					</div>
				<!-- 当事项列表中没有任何分类时 -->
					<div v-else>
						<n-card title="你尚未添加任何的分类，请您添加分类">
							<template #header-extra>
								<n-button circle style="font-size: 1.5rem;" @click="showClassForm()">+</n-button>
							</template>
						</n-card>
					</div>
				</transition>
			</div>
			<template>
				<n-back-top :right="50" show />
			</template>
		</n-space>
		<!-- 遮罩层 -->
		<transition name="fade-display">
			<div id="shadow" v-if="isShadow"></div>
		</transition>
		<!-- 各类表单 -->
		<!-- 创建新的分类 -->
		<transition name="Slide-bottom">
			<div id="createClassForm" v-if="isCreateClass">
				<n-card title="创建新的分类">
					<template #header-extra>
						<!-- 取消按钮 -->
						<n-button circle @click="isCreateClass=false;isShadow=false">X</n-button>
					</template>
					<n-form :model="createClassForm">
						<n-form-item label="分类名">
							<n-input v-model:value="createClassForm.label"></n-input>
						</n-form-item>
						<span>可以是时间、也可以是性质……比如说，工作？学习？项目？七月第一周？</span>
						<br>
						<span>或者说……本周的减肥计划？</span>
						<br>
						<span>当然如果您愿意的话，取名为“超级无敌的我会做的事”也不是不可以……</span>
						<n-form-item>
							<!-- 提交按钮 -->
							<n-button style="margin-left: auto;" @click="pushClass()"
								:disabled="createClassForm.label === ''">创建</n-button>
						</n-form-item>
					</n-form>
				</n-card>
			</div>
		</transition>
		<!-- 编辑分类名 -->
		<transition name="Slide-bottom">
			<div id="editClassForm" v-if="isEditClass">
				<n-card title="修改分类名">
					<template #header-extra>
						<n-button circle @click="isEditClass=false;isShadow=false">X</n-button>
					</template>
					<n-form :model="editClassForm">
						<n-form-item label="分类名">
							<n-input v-model:value="editClassForm.label"></n-input>
						</n-form-item>
						<n-form-item>
							<n-button style="margin-left: auto;" @click="editClass()"
								:disabled="editClassForm.label === ''">修改</n-button>
						</n-form-item>
					</n-form>
				</n-card>
			</div>
		</transition>
		<!-- 添加事项 -->
		<transition name="Slide-bottom">
			<div id="createMatterForm" v-if="isCreateMatter">
				<n-card title="添加事项">
					<template #header-extra>
						<n-button circle @click="isCreateMatter=false;isShadow=false">X</n-button>
					</template>
					<n-form :model="createMatterForm">
						<n-form-item label="事项名" show-require-mark>
							<n-input v-model:value="createMatterForm.label" placeholder="请输入事项名——比如,我想吃白切鸡？"
								maxlength="20" show-count clearable></n-input>
						</n-form-item>
						<n-grid x-gap="12" :cols="2">
							<n-grid-item>
								<n-form-item label="优先级">
									<n-rate v-model:value="createMatterForm.priority" />
								</n-form-item>
							</n-grid-item>
							<n-grid-item>
								<n-form-item label="拟定完成时间">
									<n-date-picker v-model:value="createMatterForm.completionTime" type="date"
										clearable></n-date-picker>
								</n-form-item>
							</n-grid-item>
						</n-grid>
						<n-form-item label="描述">
							<n-input type="textarea" maxlength="100" show-count
								v-model:value="createMatterForm.describe"
								placeholder="不妨描述一下事项？当然,在这里不写任何东西也不会有任何影响,实际上,烤全鸡也不错"></n-input>
						</n-form-item>
						<n-form-item>
							<n-button style="margin-left: auto;" @click="pushMatter()"
								:disabled="createMatterForm.label === ''">添加事项</n-button>
						</n-form-item>
					</n-form>
				</n-card>
			</div>
		</transition>
		<!-- 编辑事项 -->
		<transition name="Slide-bottom">
			<div id="editMatterForm" v-if="isEditMatter">
				<n-card title="编辑事项">
					<template #header-extra>
						<n-button circle @click="isEditMatter=false;isShadow=false">X</n-button>
					</template>
					<n-form :model="editMatterForm">
						<n-form-item label="事项名" show-require-mark>
							<n-input v-model:value="editMatterForm.label" placeholder="请输入事项名" maxlength="20" show-count
								clearable></n-input>
						</n-form-item>
						<n-grid x-gap="12" :cols="2">
							<n-grid-item>
								<n-form-item label="优先级">
									<n-rate v-model:value="editMatterForm.priority" />
								</n-form-item>
							</n-grid-item>
							<n-grid-item>
								<n-form-item label="拟定完成时间">
									<n-date-picker v-model:value="editMatterForm.completionTime" type="date" clearable>
									</n-date-picker>
								</n-form-item>
							</n-grid-item>
						</n-grid>
						<n-form-item label="描述">
							<n-input type="textarea" maxlength="100" show-count v-model:value="editMatterForm.describe">
							</n-input>
						</n-form-item>
						<n-form-item>
							<n-button style="margin-left: auto;" @click="editMatter()"
								:disabled="editMatterForm.label === ''">修改事项</n-button>
						</n-form-item>
					</n-form>
				</n-card>
			</div>
		</transition>
		<!-- 添加子事项 -->
		<transition name="Slide-bottom">
			<div id="createMatterSonForm" v-if="isCreateMatterSon">
				<n-card title="添加子事项">
					<template #header-extra>
						<n-button circle @click="isCreateMatterSon=false;isShadow=fasle">X</n-button>
					</template>
					<n-form :model="createMatterSonForm">
						<n-form-item label="子事项名" show-require-mark>
							<n-input v-model:value="createMatterSonForm.label" placeholder="第一步……准备材料" maxlength="20"
								show-count clearable></n-input>
						</n-form-item>
						<n-grid x-gap="12" :cols="2">
							<n-grid-item>
								<n-form-item label="优先级">
									<n-rate v-model:value="createMatterSonForm.priority" />
								</n-form-item>
							</n-grid-item>
							<n-grid-item>
								<n-form-item label="拟定完成时间">
									<n-date-picker v-model:value="createMatterSonForm.completionTime" type="date">
									</n-date-picker>
								</n-form-item>
							</n-grid-item>
						</n-grid>
						<n-form-item laebl="描述">
							<n-input type="textarea" maxlength="100" show-count
								v-model:value="createMatterSonForm.describe"
								placeholder="黄鸡一只,姜一块一半切片,一半去皮当备胎,葱两根,蒜一瓣,两八角,十几粒花椒"></n-input>
						</n-form-item>
						<n-form-item>
							<n-button style="margin-left: auto;" @click="pushMatterSon()"
								:disabled="createMatterSonForm.label === ''">添加子事项</n-button>
						</n-form-item>
					</n-form>
				</n-card>
			</div>
		</transition>
		<!-- 编辑子事项 -->
		<transition name="Slide-bottom">
			<div id="createMatterSonForm" v-if="isEditMatterSon">
				<n-card title="编辑子事项">
					<template #header-extra>
						<n-button circle @click="isEditMatterSon=false;isShadow=false">X</n-button>
					</template>
					<n-form :model="editMatterSonForm">
						<n-form-item label="事项名" show-require-mark>
							<n-input v-model:value="editMatterSonForm.label" placeholder="请输入事项名" maxlength="20"
								show-count clearable></n-input>
						</n-form-item>
						<n-grid x-gap="12" :cols="2">
							<n-grid-item>
								<n-form-item label="优先级">
									<n-rate v-model:value="editMatterSonForm.priority" />
								</n-form-item>
							</n-grid-item>
							<n-grid-item>
								<n-form-item label="拟定完成时间">
									<n-date-picker v-model:value="editMatterSonForm.completionTime" type="date"
										clearable>
									</n-date-picker>
								</n-form-item>
							</n-grid-item>
						</n-grid>
						<n-form-item label="描述">
							<n-input type="textarea" maxlength="100" show-count
								v-model:value="editMatterSonForm.describe">
							</n-input>
						</n-form-item>
						<n-form-item>
							<n-button style="margin-left: auto;" @click="editMatterSon()"
								:disabled="editMatterSonForm.label === ''">修改子事项</n-button>
						</n-form-item>
					</n-form>
				</n-card>
			</div>
		</transition>
		<clock></clock>
	</n-config-provider>
</template>


<script>
	import './assets/css/style.css'
	import headerNav from './components/headerNav.vue'
	import clock from './components/clock.vue'
	import {
		Classification,
		Matter,
		matterSon
	} from './assets/js/classDefined.js'
	import {
		defineComponent
	} from 'vue'
	import {
		NConfigProvider,
		darkTheme,
		zhCN,
		dateZhCN
	} from 'naive-ui'
	import {
		NSpace,
		NButton,
		NCard,
		NForm,
		NFormItem,
		NInput,
		NCollapse,
		NCollapseItem,
		NRate,
		NDatePicker,
		NGrid,
		NGridItem,
		NSwitch,
		NBackTop
	} from 'naive-ui'
	export default defineComponent({
		name: 'App',
		components: {
			headerNav,
			clock,
			NConfigProvider,
			NSpace,
			NButton,
			NCard,
			NForm,
			NFormItem,
			NInput,
			NCollapse,
			NCollapseItem,
			NRate,
			NDatePicker,
			NGrid,
			NGridItem,
			NSwitch,
			NBackTop
		},
		setup() {
			return {
				darkTheme,
				zhCN,
				dateZhCN,
			}
		},
		data() {
			return {
				themeData: darkTheme,
				today: 0,
				isShadow: false,
				isCreateClass: false,
				isEditClass: false,
				isCreateMatter: false,
				isEditMatter: false,
				isCreateMatterSon: false,
				isEditMatterSon: false,
				createClassForm: {
					label: ''
				},
				editClassForm: {
					index: -1,
					label: ''
				},
				createMatterForm: {
					classIndex: -1,
					label: '',
					describe: '',
					completionTime: this.today,
					priority: 0
				},
				editMatterForm: {
					classIndex: -1,
					matterIndex: -1,
					label: '',
					describe: '',
					completionTime: this.today,
					priority: 0
				},
				createMatterSonForm: {
					classIndex: -1,
					matterIndex: -1,
					label: '',
					describe: '',
					completionTime: this.today,
					priority: 0
				},
				editMatterSonForm: {
					classIndex: -1,
					matterIndex: -1,
					matterSonIndex: -1,
					label: '',
					describe: '',
					completionTime: this.today,
					priority: 0
				}
			}
		},
		methods: {
			// 主题变更
			themechange() {
				this.themeData = this.themeData === undefined ? this.darkTheme : undefined
				document.querySelector('body').style.background = document.querySelector('body').style
					.background === 'rgb(255, 254, 240)' ? 'black' : 'rgb(255, 254, 240)'
				document.querySelector('body').style.color = document.querySelector('body').style.color ===
					'black' ? 'white' : 'black'
				document.querySelector('.logo > img').style.filter = document.querySelector('.logo > img')
					.style.filter === 'invert(0)' ? 'invert()' : 'invert(0)'
			},
			// 创建分类
			showClassForm() {
				this.isShadow = !this.isShadow
				this.isCreateClass = !this.isCreateClass
			},
			pushClass() {
				let label = this.createClassForm.label
				let classification = new Classification(label)
				this.$store.commit('pushClassification', classification)
				this.createClassForm.label = ''
				this.showClassForm()
				this.isShadow = !this.isShadow
				this.isCreateClass = !this.isCreateClass
			},
			// 移除分类
			removeClass(index) {
				this.$store.commit('removeClassification', index)
				this.saveLocal()
			},
			// 修改分类
			showEditClassForm(index) {
				this.editClassForm.index = index
				this.editClassForm.label = this.$store.state.mattersList.classifications[index].label
				this.isShadow = !this.isShadow
				this.isEditClass = !this.isEditClass
			},
			editClass() {
				this.$store.commit('editClassification', this.editClassForm)
				this.editClassForm = {
					index: -1,
					label: ''
				}
				this.isShadow = !this.isShadow
				this.isEditClass = !this.isEditClass
				this.saveLocal()
			},
			// 添加事项
			showCreateMatterForm(index) {
				this.isShadow = !this.isShadow
				this.isCreateMatter = !this.isCreateMatter
				this.createMatterForm.classIndex = index
			},
			pushMatter() {
				let createTime = new Date().setHours(0, 0, 0, 0)
				let cMF = this.createMatterForm
				let matter = new Matter(cMF.classIndex, cMF.label, cMF.describe, createTime, cMF.completionTime,
					cMF.priority)
				this.$store.commit('pushMatter', matter)
				this.isShadow = !this.isShadow
				this.isCreateMatter = !this.isCreateMatter
				this.createMatterForm = {
					classIndex: -1,
					label: '',
					describe: '',
					completionTime: this.today,
					priority: 0
				}
				this.saveLocal()
			},
			// 修改事项的完成情况
			matterComplet(classIndex, matterIndex) {
				let form = {
					classIndex: classIndex,
					matterIndex: matterIndex
				}
				this.$store.commit('complateMatter', form)
				this.saveLocal()
			},
			// 删除待办事项
			removeMatter(classIndex, matterIndex) {
				let removeMatterForm = {
					classIndex: classIndex,
					matterIndex: matterIndex
				}
				this.$store.commit('removeMatter', removeMatterForm)
				this.saveLocal()
			},
			// 编辑待办事项
			showEditMatter(matterIndex, matter) {
				this.isShadow = !this.isShadow
				this.isEditMatter = !this.isEditMatter
				this.editMatterForm.classIndex = matter.classIndex
				this.editMatterForm.matterIndex = matterIndex
				this.editMatterForm.label = matter.label
				this.editMatterForm.describe = matter.describe
				this.editMatterForm.completionTime = matter.completionTime
				this.editMatterForm.completion = matter.completion
				this.editMatterForm.priority = matter.priority
			},
			editMatter() {
				this.$store.commit('editMatter', this.editMatterForm)
				this.editMatterForm = {
					classIndex: -1,
					MatterIndex: -1,
					label: '',
					describe: '',
					completionTime: this.today,
					priority: 0
				}
				this.isShadow = !this.isShadow
				this.isEditMatter = !this.isEditMatter
				this.saveLocal()
			},
			// 添加子事项
			showCreateMatterSonForm(classIndex, matterIndex) {
				this.isShadow = !this.isShadow
				this.isCreateMatterSon = !this.isCreateMatterSon
				this.createMatterSonForm.classIndex = classIndex
				this.createMatterSonForm.matterIndex = matterIndex
			},
			pushMatterSon() {
				let createTime = new Date().setHours(0, 0, 0, 0)
				let cMSF = this.createMatterSonForm
				let matterSon = new matterSon(cMSF.classIndex, cMSF.matterIndex, cMSF.label, cMSF.describe,
					createTime, cMSF.completionTime, cMSF.priority)
				this.$store.commit('pushMatterSon', matterSon)
				this.isShadow = !this.isShadow
				this.isCreateMatterSon = !this.isCreateMatterSon
				this.createMatterSonForm = {
					classIndex: -1,
					matterIndex: -1,
					label: '',
					describe: '',
					completionTime: this.today,
					priority: 0
				}
				this.saveLocal()
			},
			// 修改子事项完成情况
			matterSonComplet(classIndex, matterIndex, matterSonIndex) {
				let form = {
					classIndex: classIndex,
					matterIndex: matterIndex,
					matterSonIndex: matterSonIndex
				}
				this.$store.commit('complateMatterSon', form)
				this.saveLocal()
			},
			showEditMatterSon(matterSonIndex, matterSon) {
				this.isShadow = !this.isShadow
				this.isEditMatterSon = !this.isEditMatterSon
				this.editMatterSonForm.classIndex = matterSon.classIndex
				this.editMatterSonForm.matterIndex = matterSon.matterIndex
				this.editMatterSonForm.matterSonIndex = matterSonIndex
				this.editMatterSonForm.label = matterSon.label
				this.editMatterSonForm.describe = matterSon.describe
				this.editMatterSonForm.completionTime = matterSon.completionTime
				this.editMatterSonForm.completion = matterSon.completion
				this.editMatterSonForm.priority = matterSon.priority
			},
			// 编辑子事项
			editMatterSon() {
				this.$store.commit('editMatterSon', this.editMatterSonForm)
				this.editMatterSonForm = {
					classIndex: -1,
					matterIndex: -1,
					matterSonIndex: -1,
					label: '',
					describe: '',
					completionTime: this.today,
					priority: 0
				}
				this.isShadow = !this.isShadow
				this.isEditMatterSon = !this.isEditMatterSon
				this.saveLocal()
			},
			// 删除子事项
			removeMatterSon(classIndex, matterIndex, matterSonIndex) {
				let form = {
					classIndex: classIndex,
					matterIndex: matterIndex,
					matterSonIndex: matterSonIndex
				}
				this.$store.commit('removeMatterSon', form)
				this.saveLocal()
			},
			// 本地缓存
			saveLocal() {
				// 对象JSON化
				let str = JSON.stringify(this.$store.state.mattersList)
				// 本地缓存
				localStorage.setItem('mattersList', str)
			}
		},
		created() {
			this.today = new Date().setHours(0, 0, 0, 0)
			// 从本地缓存获取数据
			let obj = localStorage.getItem('mattersList')
			if (obj !== null) {
				let mattersList = JSON.parse(obj)
				this.$store.commit('getMattersList', mattersList)
			}
		}
	})
</script>

<style>
	::-webkit-scrollbar {
		width: 8px;
	}

	/* 滚动槽 */
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 6px rgba(0, 0, 0, 0.3);
		border-radius: 5px;
	}

	/* 滚动条滑块 */
	::-webkit-scrollbar-thumb {
		border-radius: 5px;
		background: rgb(130, 130, 130);
		-webkit-box-shadow: inset 6px rgb(130, 130, 130)
	}

	/* 滚动条非激活窗口 */
	::-webkit-scrollbar-thumb:window-inactive {
		background: rgba(181, 212, 225, 0.4);
	}
</style>
