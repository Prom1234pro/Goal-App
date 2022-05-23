import express from "express";
import Task from "../models/task.js"
import protect from "../middlewares/protected.js"
const router = express.Router()


router.post('/', protect, async (req, res) => {
    try {
        const task = await new Task({...req.body, user_id: req.user.id})
        task.save()
        res.send(task)
    } catch (error) {
        res.send(error)
    }
})
router.get("/", protect, async (req, res) => {
    try {
        const tasks = await Task.find({user_id: req.user.id})
        res.send(tasks)
    } catch (error) {
        res.send(error)
    }
})
router.get('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.send(task)
    } catch (error) {
        res.send(error)
    }
})
router.put('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id},
            req.body
        )
        res.send(task)
    } catch (error) {
        res.send(error)
    }
})
router.delete('/:id', protect, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        res.send(task)
    } catch (error) {
        res.send(error)
    }
})
"https://cloud.mongodb.com/v2/6256e75eb57d537aeb63dc1a#metrics/replicaSet/6256fa92d6054c3d2c52063b/explorer/myFirstDatabase/tasks/find"
export default router