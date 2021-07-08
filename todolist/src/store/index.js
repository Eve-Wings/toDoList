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
			state.mattersList.classifications.splice(classIndex, 1)
		},
		// 修改分类名
		editClassification(state, editClassForm) {
			let label = editClassForm.label
			let index = editClassForm.index
			state.mattersList.classifications[index].label = label
		},
		// 分类相关操作到此截至

		//===============================================//
		// 待办事项相关——增删改
		// 增加新的待办事项
		pushMatter(state, pushMatterForm) {
			// classIndex, matter
			let classIndex = pushMatterForm.classIndex
			let matter = pushMatterForm
			state.mattersList.classifications[classIndex].matters.push(matter)
		},
		// 删除待办事项
		removeMatter(state, removeMatterForm) {
			// classIndex, matterIndex
			let classIndex = removeMatterForm.classIndex
			let matterIndex = removeMatterForm
			const matters = state.mattersList.classifications[classIndex].matters
			matters.splice(matterIndex, 1)
		},
		// 修改待办事例
		editMatter(state, editMatterForm) {
			// classIndex, matterIndex, matter
			let classIndex = editMatterForm.classIndex
			let matterIndex = editMatterForm.matterIndex
			// 获取所修改的待办事项
			const matter = state.mattersList.classifications[classIndex].matters[matterIndex]
			matter.label = editMatterForm.label
			matter.describe = editMatterForm.describe
			matter.completionTime = editMatterForm.completionTime
			matter.priority = editMatterForm.priority
		},
		// 待办事例完成情况修改
		complateMatter(state, form) {
			let classIndex = form.classIndex
			let matterIndex = form.matterIndex
			// 获取所修改的待办事项
			const matter = state.mattersList.classifications[classIndex].matters[matterIndex]
			if(matter.completion){
				matter.completion = false
			} else {
				matter.completion = true
			}
		},
		
		// 待办事项相关操作到此截至

		//==================================================//
		// 待办子事项相关——增删改
		// 增加新的待办子事项
		pushMatterSon(state, pushMatterSonForm) {
			// classIndex, matterIndex, matterSon
			let classIndex = pushMatterSonForm.classIndex
			let matterIndex = pushMatterSonForm.matterIndex
			let matterSon = pushMatterSonForm
			state.mattersList.classifications[classIndex].matters[matterIndex].matterSons.push(matterSon)
		},
		// 删除待办子事项
		removeMatterSon(state, removeMatterSonForm) {
			// classIndex, matterIndex, matterSonIndex
			let classIndex = removeMatterSonForm.classIndex
			let matterIndex = removeMatterSonForm.matterIndex
			let matterSonIndex = removeMatterSonForm.matterSonIndex
			// 获取所删除的子事项所在的子事项组
			const matterSons = state.mattersList.classifications[classIndex].matters[matterIndex].matterSons
			matterSons.splice(matterSonIndex, 1)
		},
		// 修改待办子事项
		editMatterSon(state, editMatterSonForm) {
			// classIndex, matterIndex, matterSonIndex, matterSon
			let classIndex = editMatterSonForm.classIndex
			let matterIndex = editMatterSonForm.matterIndex
			let matterSonIndex = editMatterSonForm.matterSonIndex
			// 获取到当前修改的子事项
			const matterSon = state.mattersList.classifications[classIndex].matters[matterIndex].matterSons[matterSonIndex]
			matterSon.label = editMatterSonForm.label
			matterSon.describe = editMatterSonForm.describe
			matterSon.completionTime = editMatterSonForm.completionTime
			matterSon.priority = editMatterSonForm.priority
		},
		// 子事项完成情况修改
		complateMatterSon(state,form) {
			let classIndex = form.classIndex
			let matterIndex = form.matterIndex
			let matterSonIndex = form.matterSonIndex
			// 获取到当前修改的子事项
			const matterSon = state.mattersList.classifications[classIndex].matters[matterIndex].matterSons[matterSonIndex]
			if(matterSon.completion) {
				matterSon.completion = false
			} else {
				matterSon.completion = true
			}
		}
	},
	actions: {

	},
	getters: {

	}
})
