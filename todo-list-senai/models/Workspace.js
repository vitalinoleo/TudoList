//criando a pagina para colocar os grupos do trabalho
import mongoose from 'mongoose';


const WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const task = mongoose.models.Workspace || mongoose.model('Workspace', WorkspaceSchema);

export default Task;
