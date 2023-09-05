const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        status: {
            type: String,
            enum: ['to-do', 'in-progress', 'done'],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        desc: {
            type: String,
        }
    },
    {
        timestamps: true,
    } 
);

Task = mongoose.model('Task', taskSchema);

module.exports = Task;