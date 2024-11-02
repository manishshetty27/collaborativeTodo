const { UserTodo } = require("../Schema/TodoSchema");

const addTodo = async (req,res) => {
    try { const createtodo = new UserTodo({
        title: req.body.title,
        description: req.body.description,
        assignee: req.body.assignee
    })

    await createtodo.save()
    res.status(200).json(createtodo) 
} catch (e) {
    console.log(e) 
    res.status(500).json({msg: "Error while adding todo"})
    }
}

module.exports = { addTodo }