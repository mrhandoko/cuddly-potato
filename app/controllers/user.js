const {
  User
} = require('../models');

const profile = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User Not found.' });
    }

    const authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push(roles[i].name);
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities
      },
      message: 'Get user profile successfully'
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Get user profile failed'
    });
  }
};

module.exports = {
  profile
};
