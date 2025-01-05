import Joi from "joi";

const todoSchema=Joi.object({
    title: Joi.string().min(3).max(20).required(),
    description:Joi.string().max(200).required(),
    status: Joi.string().required(),
    createdAt:Joi.date().default(Date.now()),
});


const validateTodo = (req, res, next) => {
    const { error } = todoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export default validateTodo;