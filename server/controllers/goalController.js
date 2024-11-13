// controllers/goalController.js
const Goal = require('../models/Goal');
const Curso = require('../models/Curso');

exports.getGoals = async (req, res, next) => {
    try {
        const goals = await Goal.findAll({
            where: { usuario_id: req.user.id },
            include: [{ model: Curso, attributes: ['nome', 'imagem'] }]
        });
        res.json(goals);
    } catch (err) {
        next(err);
    }
};

exports.createGoal = async (req, res, next) => {
    try {
        const { titulo, curso_id, dia, duracao } = req.body;
        const goal = await Goal.create({
            titulo,
            curso_id,
            dia,
            duracao,
            usuario_id: req.user.id
        });
        res.status(201).json(goal);
    } catch (err) {
        next(err);
    }
};

exports.updateGoal = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { titulo, curso_id, dia, duracao } = req.body;
        const goal = await Goal.findOne({ where: { id, usuario_id: req.user.id } });
        if (!goal) {
            return res.status(404).json({ message: 'Meta não encontrada' });
        }
        goal.titulo = titulo;
        goal.curso_id = curso_id;
        goal.dia = dia;
        goal.duracao = duracao;
        await goal.save();
        res.json(goal);
    } catch (err) {
        next(err);
    }
};

exports.deleteGoal = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Goal.destroy({ where: { id, usuario_id: req.user.id } });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};