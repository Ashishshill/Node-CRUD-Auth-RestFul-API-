const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// Get All goal REST api
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})
// Add a new goal REST api
const setGoal = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

// Update goal by ID REST api
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error ('there is no goal');
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    // make sure only user delete goal
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not autotized')
        
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new : true})

    res.status(200).json(updatedGoal)
})

// Delete goal by id REST api
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Not an Goal found')
    }
    
    const user = await User.findById(req.user.id)

    // Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    
    // make sure only user delete goal
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not autotized')
        
    }

    await Goal.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}