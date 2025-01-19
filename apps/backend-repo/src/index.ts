import { log } from "@repo/logger";
import { createApp } from "./core/app";

const port = process.env.PORT || 5001;
const app = createApp();

app.listen(port, () => {
  log(`Backend server running on port ${port}`);
});
