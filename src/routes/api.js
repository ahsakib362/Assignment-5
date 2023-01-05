const express = require('express');
const profileController = require("../controllers/profileController");
const ToDoListController = require("../controllers/ToDoListController");
const AuthVerifyMiddleware = require('../middleware/authVarifyMiddleware');

const router = express.Router();


router.post("/CreateProfile",profileController.CreateProfile);
router.post("/UserLogin",profileController.UserLogin);

router.get("/SelectProfile",AuthVerifyMiddleware,profileController.SelectProfile);
router.post("/UpdateProfile",AuthVerifyMiddleware,profileController.UpdateProfile);



router.post("/CreateToDo",AuthVerifyMiddleware,ToDoListController.CreateToDo);
router.get("/SelectToDo",AuthVerifyMiddleware,ToDoListController.SelectToDo);
router.post("/UpdateToDo",AuthVerifyMiddleware,ToDoListController.UpdateToDo);
router.post("/RemoveToDo",AuthVerifyMiddleware,ToDoListController.RemoveToDo);
router.post("/UpdateStatusToDo",AuthVerifyMiddleware,ToDoListController.UpdateStatusToDo);
router.post("/SelectToDoByStatus",AuthVerifyMiddleware,ToDoListController.SelectToDoByStatus);
router.post("/SelectToDoByDate",AuthVerifyMiddleware,ToDoListController.SelectToDoByDate);







module.exports = router;

