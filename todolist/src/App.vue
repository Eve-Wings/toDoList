<template>
	<n-config-provider :theme="themeData" :locale="zhCN" :date-locale="dateZhCN">
		<n-space vertical size="large">
			<!-- 顶部页眉 -->
			<headerNav></headerNav>
			<div id="main">
				<!-- 展示待办事项列表 -->
				<transition name="Slide-left" mode="out-in">
					<div v-if="$store.state.mattersList.classifications.length !== 0">
						<n-card>
							<n-card v-for="(classification, classIndex) in $store.state.mattersList.classifications"
								:key="classIndex" class="classification" :title="classification.label">
								<template #header-extra>
									<!-- 用于修改分类的内容 -->
									<div class="classEditBtns">
										<n-button type="info" style="margin-right: 20px;"
											@click="showCreateMatterForm(classIndex)" circle>
											<template #icon>
												<svg xmlns="http://www.w3.org/2000/svg"
													xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512">
													<path
														d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
														fill="currentColor"></path>
												</svg>
											</template>
										</n-button>
										<n-button type="warning" style="margin-right: 20px;"
											@click="showEditClassForm(classIndex)" circle>
											<template #icon>
												<svg xmlns="http://www.w3.org/2000/svg"
													xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 576 512">
													<path
														d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
														fill="currentColor"></path>
												</svg>
											</template>
										</n-button>
										<n-button type="error" @click="removeClass(classIndex)" circle>
											<template #icon>
												<svg xmlns="http://www.w3.org/2000/svg"
													xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512">
													<path
														d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
														fill="currentColor"></path>
												</svg>
											</template>
										</n-button>
									</div>
								</template>
								<n-collapse>
									<n-collapse-item title="查看事项" v-if="classification.matters.length !== 0"
										:name="classIndex">
										<!-- 代办事项相关 -->
										<n-card v-for="(matter, matterIndex) in classification.matters"
											:key="matterIndex" class="matter" :class="{compMatter:matter.completion}"
											:title="matter.label">
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
														@click="showCreateMatterSonForm(classIndex, matterIndex)"
														circle>
														<template #icon>
															<svg xmlns="http://www.w3.org/2000/svg"
																xmlns:xlink="http://www.w3.org/1999/xlink"
																viewBox="0 0 448 512">
																<path
																	d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
																	fill="currentColor"></path>
															</svg>
														</template>
													</n-button>
													<n-button type="warning" style="margin-right: 20px;"
														@click="showEditMatter(matterIndex,matter)" circle>
														<template #icon>
															<svg xmlns="http://www.w3.org/2000/svg"
																xmlns:xlink="http://www.w3.org/1999/xlink"
																viewBox="0 0 576 512">
																<path
																	d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
																	fill="currentColor"></path>
															</svg>
														</template>
													</n-button>
													<n-button type="error"
														@click="removeMatter(classIndex, matterIndex)" circle>
														<template #icon>
															<svg xmlns="http://www.w3.org/2000/svg"
																xmlns:xlink="http://www.w3.org/1999/xlink"
																viewBox="0 0 448 512">
																<path
																	d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
																	fill="currentColor"></path>
															</svg>
														</template>
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
																	@click="showEditMatterSon(matterSonIndex,matterSon)"
																	circle>
																	<template #icon>
																		<svg xmlns="http://www.w3.org/2000/svg"
																			xmlns:xlink="http://www.w3.org/1999/xlink"
																			viewBox="0 0 576 512">
																			<path
																				d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
																				fill="currentColor"></path>
																		</svg>
																	</template>
																</n-button>
																<n-button type="error"
																	@click="removeMatterSon(classIndex, matterIndex, matterSonIndex)"
																	circle>
																	<template #icon>
																		<svg xmlns="http://www.w3.org/2000/svg"
																			xmlns:xlink="http://www.w3.org/1999/xlink"
																			viewBox="0 0 448 512">
																			<path
																				d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
																				fill="currentColor"></path>
																		</svg>
																	</template>
																</n-button>
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
				<n-back-top :right="30" show />
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
							<n-input v-model:value="createClassForm.label" maxlength="20" show-count clearable @keyup.enter="createClassKeyup()">
							</n-input>
						</n-form-item>
						<div class="createClassDescribe">
							<span>可以是时间、也可以是性质……比如说，工作？学习？项目？七月第一周？</span>
							<br>
							<span>或者说……本周的减肥计划？</span>
							<br>
							<span>当然如果您愿意的话，取名为“超级无敌的我会做的事”也不是不可以……</span>
						</div>
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
							<n-input v-model:value="editClassForm.label" maxlength="20" show-count clearable @keyup.enter="editClassKeyup()"></n-input>
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
								maxlength="20" show-count clearable @keyup.enter="createMatterKeyup()"></n-input>
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
								clearable  @keyup.enter="editMatterKeyup()"></n-input>
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
								show-count clearable @keyup.enter="createMatterSonKeyup()"></n-input>
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
								show-count clearable @keyup.enter="editMatterKeyup()"></n-input>
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
		MatterSon
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
				this.isShadow = !this.isShadow
				this.isCreateClass = !this.isCreateClass
				this.saveLocal()
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
				let matterSon = new MatterSon(cMSF.classIndex, cMSF.matterIndex, cMSF.label, cMSF.describe,
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
			},
			// 按下回车
			// 创建分类中，按下回车
			createClassKeyup() {
				if(this.createClassForm.label !== '') {
					this.pushClass()
				}
			},
			// 编辑分类中，按下回车
			editClassKeyup() {
				if(this.editClassForm.label !== '') {
					this.editClass()
				}
			},
			// 在创建事项中，按下回车
			createMatterKeyup() {
				if(this.createMatterForm.label !== '') {
					this.pushMatter()
				}
			},
			// 编辑事项中，按下回车
			editMatterKeyup() {
				if(this.editMatterForm.label !== '') {
					this.editMatter()
				}
			},
			// 创建子事项中，按下回车
			createMatterSonKeyup() {
				if(this.createMatterSonForm.label !== '') {
					this.createMatterSon()
				}
			},
			// 编辑子事项中，按下回车
			editMatterSonKeyup() {
				if(this.editMatterSonForm.label !== '') {
					this.editMatterSon()
				}
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
