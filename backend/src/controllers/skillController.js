const Skill = require("../models/Skill");

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Public
const createSkill = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Skill name is required" });
  }

  try {
    // Check for duplicate skill
    const existingSkill = await Skill.findOne({ name: name.trim() });
    if (existingSkill) {
      return res.status(400).json({ message: "Skill already exists" });
    }

    const skill = await Skill.create({ name: name.trim() });

    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a skill by ID
// @route   GET /api/skills/:id
// @access  Public
const getSkillById = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(skill);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Public
const updateSkill = async (req, res, next) => {
  const { name } = req.body;

  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (name) skill.name = name.trim();

    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Public
const deleteSkill = async (req, res, next) => {
    try {
      const skill = await Skill.findById(req.params.id);
  
      if (!skill) {
        return res.status(404).json({ message: "Skill not found" });
      }
  
      // Use deleteOne to remove the skill
      await Skill.deleteOne({ _id: skill._id });
  
      res.json({ message: "Skill deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  

module.exports = { createSkill, getAllSkills, getSkillById, updateSkill, deleteSkill };
