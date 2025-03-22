import Thought from "../models/Thought.js";

// Controller functions
interface Request {
    params: Record<string, any>;
    body: any;
}

interface Response {
    status: (code: number) => Response;
    json: (data: any) => void;
}
// get all Thoughts
const getThoughts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

interface GetThoughtByIdRequest extends Request {
    params: {
        thoughtId: string;
    };
}
// get Thoughts by request
const getThoughtById = async (req: GetThoughtByIdRequest, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

interface CreateThoughtRequest extends Request {
    body: {
        text: string;
        username: string;
    };
}
// create a Thought
const createThought = async (req: CreateThoughtRequest, res: Response): Promise<void> => {
  try {
    const newThought = await Thought.create(req.body);
    res.status(201).json(newThought);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

interface AddReactionRequest extends Request {
    params: {
        thoughtId: string;
    };
    body: {
        reactionBody: string;
        username: string;
    };
}
// add Reaction to thought
const addReaction = async (req: AddReactionRequest, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

interface UpdateThoughtRequest extends Request {
  params: {
    thoughtId: string;
  };
  body: {
    text?: string; 
    username?: string;
  };
}

// Update a Thought
const updateThought = async (req: UpdateThoughtRequest, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body, 
      { new: true, runValidators: true } 
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json({ message: 'Thought updated successfully!', updatedThought });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

interface DeleteReactionRequest extends Request {
  params: {
    thoughtId: string;
    reactionId: string;
  };
}

// Delete a reaction from a thought
const deleteReaction = async (req: DeleteReactionRequest, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Remove the reaction with the specified reactionId
      { new: true } 
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json({ message: 'Reaction deleted successfully!', thought });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// exporting all thought controllers
const thoughtController = { getThoughts, getThoughtById, createThought, addReaction, updateThought, deleteReaction };
export default thoughtController;

