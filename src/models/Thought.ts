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
      virtuals: true,
    },
    id: false,
  }
);
// TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field  on query.
thoughtSchema
  .virtual('reactionCount')
  .get(function(this:any) {
    return `${this.reactions}`.length;
  })


export default thoughtSchema;

//TODO: Create the SubDoc 'Reaction' schema on the Thought model.