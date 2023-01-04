import express from "express";
import winston from "winston";
//iniciando express
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  throw new Error("Error message test");
});

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
