const todoModel = require(`../model/todoModels`)

const appModel = require(`../model/appModels`)

const createContent = async (req, res) =>{
    try {
       const {userId} = req.user 
       const {title, content} = req.body
       const user = await appModel.findById(userId)
       if(!user){
        return res.status(404).json(`User not found.`)
       }
       const todo = new todoModel({
        title,
        content
       })

       todo.user = userId
       user.todo.push(todo._id)

       await user.save()
       await todo.save()

       res.status(200).json({
        message: `Content created successfully.`,
        data: todo
       })

    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getOne = async (req, res) => {
    try {
        const {todoId} = req.params
        const todo = await todoModel.findById(todoId)
        res.status(200).json({
            message: "Kindly find the todo content below",
            data: todo
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getAllContent = async(req,res)=>{
    try {
    const { userId } = req.user
     const contents = await todoModel.find({user: userId})
     if(contents.length <= 0){
        return res.status(404).json(`No available users`)
     }else{
        res.status(200).json({message:`Kindly find the ${contents.length} contents below`, 
        data: contents})
     }
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateContent = async (req, res) => {
    try {
        const {userId} = req.user
        const {todoId} = req.params
        const {title, content} = req.body
        const user = await appModel.findById(userId)
        if(!user){
            return res.status(404).json(`User not found`)
        }
        const todo = await todoModel.findById(todoId)
        if(!todo){
            return res.status(404).json(`Content not found.`)
        }
        if(todo.user.toString() !== userId.toString()){
            return res.status(401).json(`Not allowed to update another user's content.`)
        }
        const data = ({
            title: title || todo.title,
            content: content || todo.content
        })

        const updated = await todoModel.findByIdAndUpdate(todoId, data, {new:true})
        res.status(200).json({
            message: `Content updated successfully.`,
            data: updated
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteContent = async(req, res) => {
    try {
        const {userId} = req.user
        const {todoId} = req.params
        const user = await appModel.findById(userId)
        if(!user){
            return res.status(404).json(`User not found.`)
        }
        const todo = await todoModel.findById(todoId)
        if(!todo){
            return res.status(404).json(`Content not found.`)
        }
        if(todo.user.toString() !== userId.toString()){
            return res.status(401).json(`Not allowed to delete another user's content.`)}
    const del = await todoModel.findByIdAndDelete(todoId)
    res.status(200).json(`Content deleted successfully.`)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports = {createContent, getOne, getAllContent, updateContent, deleteContent}