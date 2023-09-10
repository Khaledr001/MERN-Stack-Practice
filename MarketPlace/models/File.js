const mongoose = require('mongoose');


const FileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        path: {
            typr: String,
        },
    },
    {
        timestamps: true,
    }
);

File = mongoose.model('File', FileSchema);

module.exports = File;