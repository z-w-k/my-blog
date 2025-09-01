const User = require('../models/userModel');

// 获取所有用户
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAll();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// 根据ID获取用户
const getUserById = async (req, res, next) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// 创建新用户
const createUser = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;
    
    // 简单验证
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: '姓名和邮箱是必填项'
      });
    }
    
    const userId = await User.create({ name, email, age });
    res.status(201).json({
      success: true,
      message: '用户创建成功',
      data: { id: userId }
    });
  } catch (error) {
    next(error);
  }
};

// 更新用户
const updateUser = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;
    const affectedRows = await User.update(req.params.id, { name, email, age });
    
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }
    
    res.json({
      success: true,
      message: '用户更新成功'
    });
  } catch (error) {
    next(error);
  }
};

// 删除用户
const deleteUser = async (req, res, next) => {
  try {
    const affectedRows = await User.delete(req.params.id);
    
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }
    
    res.json({
      success: true,
      message: '用户删除成功'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};