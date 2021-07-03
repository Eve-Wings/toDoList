// 分类
export class Classification {
	constructor(label) {
		this.label = label
		this.matters = []
	}
}

// 待办事项
export class Matter {
	constructor(classIndex, label, describe, createTime, completionTime, priority) {
		this.classIndex = classIndex
		this.label = label
		this.describe = describe
		this.createTime = createTime
		this.completionTime = completionTime
		this.priority = priority
		this.completion = false
		this.matter_sons = []
	}
}
// 代办子事项
export class Matter_son {
	constructor(classIndex, matterIndex, label, describe, createTime, completionTime, priority) {
		this.classIndex = classIndex
		this.matterIndex = matterIndex
		this.label = label
		this.describe = describe
		this.createTime = createTime
		this.completionTime = completionTime
		this.priority = priority
		this.completion = false
	}
}
