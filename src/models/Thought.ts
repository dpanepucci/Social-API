import { Schema, Document, ObjectId, Types, model } from 'mongoose';

//TODO: Create the SubDoc 'Reaction' schema on the Thought model

// Main Schema
interface IThought extends Document {
  thoughtId: ObjectId;
  thoughtText: string;
  username: string;
  createdAt: Date;
  react: IReaction[];
}
// SubDoc
interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}
// SubDoc
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    id: false,
  }
)
// Main Schema
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
    react: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('Thought', thoughtSchema);

Thought.create({ name: 'Reaction', react: reactionSchema })

// TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field  on query.
thoughtSchema
  .virtual('reactionCount')
  .get(function(this:any) {
    return `${this.reactions}`.length;
  })


export default Thought;
