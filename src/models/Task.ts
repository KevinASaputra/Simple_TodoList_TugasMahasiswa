import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  tanggalTugas: Date;
  deadline: Date;
  status: 'ongoing' | 'passed' | 'overdue';
}

const TaskSchema = new Schema<ITask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    tanggalTugas: Date,
    deadline: Date,
    status: {
      type: String,
      enum: ['ongoing', 'passed', 'overdue'],
      default: 'ongoing',
    },
  },
  { timestamps: true },
);

export default mongoose.models.Task ||
  mongoose.model<ITask>('Task', TaskSchema);
