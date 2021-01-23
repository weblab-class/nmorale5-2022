import express from "express";
import auth from "./auth";
import socketManager from "./server-socket";
import Stats from "./models/Stats";
import Room from "./models/Room";
const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // Not logged in.
    return res.send({});
  }
  res.send(req.user);
});
router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    const socket = socketManager.getSocketFromSocketID(req.body.socketid);
    if (socket !== undefined) socketManager.addUser(req.user, socket);
  }
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/smiles", auth.ensureLoggedIn, (req, res) => {
  Stats.findOne({userId: req.body.user_id}).then((stats) => res.send(stats.smiles));
})

router.post("/smiles", auth.ensureLoggedIn), (req, res) => {
  Stats.findOne({userId: req.body.user_id}).then((stats) => {
    stats.smiles = req.body.smiles;
    stats.save()
  })
}

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  const msg = `Api route not found: ${req.method} ${req.url}`;
  res.status(404).send({ msg });
});

export default router;
