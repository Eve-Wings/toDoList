import {
	createStore
} from 'vuex'

export default createStore({
	state: {
		mattersList: {
			classifications: []
		}
	},
	mutations: {
		// 获取事项列表
		getMattersList(state, List) {
			state.mattersList = List
		},
		//============================================//
		// 分类相关——增删改
		// 添加新的分类
		pushClassification(state, classification) {
			state.mattersList.classifications.push(classification)
		},
		// 移除分类
		removeClassification(state, classIndex) {
			let classLength = state.mattersList.classifications.length
			for (let i = classIndex; i < classLength - 1; i++) {
				state.mattersList.classifications[i] = state.mattersList.classifications[i + 1]
			}
			state.mattersList.classifications.pop()
		},
		// 修改分类名
		editClassification(state, editClassForm) {
			let label = editClassForm.label
			let index = editClassForm.index
			state.mattersList.classifications[index].label = label
		},
		// 分类相关操作到此截至

		//===============================================//
		// 代办事项相关——增删改
		// 增加新的代办事项
		pushMatter(state, pushMatterForm) {
			// classIndex, matter
			let classIndex = pushMatterForm.classIndex
			let matter = pushMatterForm
			state.mattersList.classifications[classIndex].matters.push(matter)
		},
		// 删除代办事项
		removeMatter(state, removeMatterForm) {
			// classIndex, matterIndex
			let classIndex = removeMatterForm.classIndex
			let matterIndex = removeMatterForm
			let mattersLength = state.mattersList.classifications[classIndex].matters.length
			for (let i = matterIndex; i < mattersLength - 1; i++) {
				state.mattersList.classifications[classIndex].matters[i] = state.mattersList.classifications[
					classIndex].matters[i + 1]
			}
			state.mattersList.classifications[classIndex].matters.pop()
		},
		// 修改代办事例
		editMatter(state, editMatterForm) {
			// classIndex, matterIndex, matter
			let classIndex = editMatterForm.classIndex
			let matterIndex = editMatterForm.matterIndex
			state.mattersList.classifications[classIndex].matters[matterIndex].label = editMatterForm.label
			state.mattersList.classifications[classIndex].matters[matterIndex].describe = editMatterForm.describe
			state.mattersList.classifications[classIndex].matters[matterIndex].completionTime = editMatterForm.completionTime
			state.mattersList.classifications[classIndex].matters[matterIndex].priority = editMatterForm.priority
		},
		// 代办事例完成情况修改
		complateMatter(state, form) {
			let classIndex = form.classIndex
			let matterIndex = form.matterIndex
			let comp = state.mattersList.classifications[classIndex].matters[matterIndex].completion
			if(comp === true){
				state.mattersList.classifications[classIndex].matters[matterIndex].completion = false
			} else {
				state.mattersList.classifications[classIndex].matters[matterIndex].completion = true
			}
		},
		
		// 待办事项相关操作到此截至

		//==================================================//
		// 代办子事项相关——增删改
		// 增加新的代办子事项
		pushMatterSon(state, pushMatterSonForm) {
			// classIndex, matterIndex, matter_son
			let classIndex = pushMatterSonForm.classIndex
			let matterIndex = pushMatterSonForm.matterIndex
			let matter_son = pushMatterSonForm
			state.mattersList.classifications[classIndex].matters[matterIndex].matter_sons.push(matter_son)
		},
		// 删除代办子事项
		removeMatterSon(state, removeMatterSonForm) {
			// classIndex, matterIndex, matter_sonIndex
			let classIndex = removeMatterSonForm.classIndex
			let matterIndex = removeMatterSonForm.matterIndex
			let matterSonIndex = removeMatterSonForm.matterSonIndex
			let matterSonsLength = state.mattersList.classifications[classIndex].matters[matterIndex]
				.matter_sons.length
			for (let i = matterSonIndex; i < matterSonsLength - 1; i++) {
				state.mattersList.classifications[classIndex].matters[matterIndex].matter_sons[i] = state
					.mattersList.classifications[classIndex].matters[matterIndex].matter_sons[i + 1]
			}
			state.mattersList.classifications[classIndex].matters[matterIndex].matter_sons.pop()
		},
		// 修改代办子事项
		editMatterSon(state, editMatterSonForm) {
			// classIndex, matterIndex, matter_sonIndex, matter_son
			let classIndex = editMatterSonForm.classIndex
			let matterIndex = editMatterSonForm.matterIndex
			let matterSonIndex = editMatterSonForm.matterSonIndex
			console.log(editMatterSonForm)
			console.log(state.mattersList.classifications[classIndex].matters[matterIndex].matter_sons[matterSonIndex])
			state.mattersList.classifications[classIndex].matters[matterIndex].matter_sons[matterSonIndex].label = editMatterSonForm.label
			state.mattersList.classifications[classIndex].matters[matterIndex].matter_sons[matterSonIndex].describe = editMatterSonForm.describe
			state.mattersList.classifications[classIndex].matters[matterIndex].matter_sons[matterSonIndex].completionTime = editMatterSonForm.completionTime
			state.mattersList.classifications[classIndex].matters[matterIndex].matter_sons[matterSonIndex].priority = editMatterSonForm.priority
		},
		complateMatterSon(state,form) {
			let classIndex = form.classIndex
			let matterIndex = form.matterIndex
			let matterSonIndex = form.matterSonIndex
			let comp = state.mattersList.classifications[classIndex].matters[matterIndex].matter_sons[matterSonIndex].completion
			if(comp === true) {
				state.mattersList.classifications[classIndex].matters[matterIndex].matter_sons[matterSonIndex].completion = false
			} else {
				state.mattersList.classifications[classIndex].matters[matterIndex].matter_sons[matterSonIndex].completion = true
			}
		}
	},
	actions: {

	},
	getters: {

	}
})
