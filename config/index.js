console.log("config file env is: ", process.env.NODE_ENV);

var config;
if (process.env.NODE_ENV === "production") {
  config = require("./production.config.json");
} else if (process.env.NODE_ENV === "development") {
  config = require("./dev.config.json");
} else {
  config = require("./config.json");
}

export default config;
