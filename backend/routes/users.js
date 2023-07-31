const router = require('express').Router();
const validation = require('../middlewares/validation');
const {
  getUsers, getUsersId, updateAvatar, updateProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validation.checkUserId, getUsersId);
router.patch('/me', validation.checkProfile, updateProfile);
router.patch('/me/avatar', validation.checkAvatar, updateAvatar);

module.exports = router;
