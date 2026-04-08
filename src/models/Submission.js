const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    keywords: [String],
    fileUrl: {
        type: String,
        required: true
    },
    fileName: String,
    status: {
        type: String,
        enum: ["pending", "under_review", "accepted", "rejected"],
        default: "pending"
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);