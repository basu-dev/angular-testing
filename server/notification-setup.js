const webpush = require("web-push");

const vapidKeys = {
  publicKey:
    "BMGvFXXYcamGRO9NAusAx-o8Boea4sJmHczP8P-n83IkdNcxlKCpyg-Cu4ptSI7FUq8E5aWk02y44LgAfL7tGv8",
  privateKey: "Yf3FT6r0tXVwHDdgqHLFW813fV-fg3n29T9-3UO5CZ0",
};

// webpush.setGCMAPIKey('< GCM API Key Here>');
webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

USERS = [];

function subscribe(req, res) {
  let sub = req.body;
  let endPoint = sub.endpoint;
  if (USERS.some((user) => user.endpoint == endPoint)) {
    console.log(USERS);
    res.send(sub);
  } else {
    USERS.push(sub);
    res.send(sub);
  }
}

function sendNotification(req, res) {
  let notification = {
    notification: {
      body: "Body",
      title: "Title",
    },
  };
  Promise.all(
    USERS.map((user) =>
      webpush.sendNotification(user, JSON.stringify(notification))
    )
  )
    .then((a) => {
      console.log("Success", a);
      res.send(true);
    })
    .catch((e) => {
      console.log("Error", e);
      res.status(500);
    });
}

module.exports = {
  subscribe,
  sendNotification,
};
