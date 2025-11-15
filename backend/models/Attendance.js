import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['present', 'absent', 'late'], required: true },
  pointsEarned: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);