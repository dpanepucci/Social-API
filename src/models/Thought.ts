import { Schema, Document, ObjectId, Types } from 'mongoose';

interface IThought extends Document {
  thoughtId: ObjectId;
  responseBody: string;
  username: string;
  createdAt: Date;
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field  on query.

export default thoughtSchema;
