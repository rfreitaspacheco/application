import express from "express";
import winston from "winston";
//iniciando express
const app = express();

app.use(express.json());

const { printf, combine, label, timestamp } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}] ${label}: ${message}`;
});

const logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-log.log" }),
  ],
  format: combine(label({ label: "my-app" }), timestamp(), myFormat),
});

logger.error("Error log");
logger.warn("War log");
logger.info("Info log");
logger.verbose("Verbose log");
logger.debug("debug log");
logger.silly("Silly log");
logger.log("info", "Hello with parameter!");

app.get("/", (req, res) => {
  throw new Error("Error message test");
});
/*
app.use((err, req, res, next) => {
  console.log("Error 1");
  res.status(500).send("Ocorreu um erro");
});


app.all("/testAll", (req, res) => {
  res.send(req.method);
});

app.get("/teste?", (_req, res) => {
  res.send("/teste");
});

app.get("/teste+", (_, res) => {
  res.send("/teste2");
});

app.get("/one*share", (_, res) => {
  res.send("/teste3");
});

app.get("/testParam/:id", (req, res) => {
  res.send(req.params.id);
});

//query string
app.get("/testQuery", (req, res) => {
  res.send(req.query);
});
*/
app.listen(3000, () => {
  console.log("Api started");
});
