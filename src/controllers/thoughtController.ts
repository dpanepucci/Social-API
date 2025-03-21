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

const thoughtController = { getThoughts, getThoughtById, createThought, addReaction };
export default thoughtController;

