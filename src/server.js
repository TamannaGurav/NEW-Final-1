const app = require("./app");
const { PORT } = require("./config/serverConfig");

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
