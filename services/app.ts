import express from "express"
import emailService from "./emailService";

const app = express()

app.post("/sendCode", async (req, res) => {
    const email = req.body.email;
    if (!email) return res.status(400).send({ error: "Email was not provided" })
    const code = Math.random().toString().slice(2, 8);
    await emailService.sendCode(email, code)
    res.send(200).send("verification email was sent")
})

const PORT = 4600
app.listen(PORT, () => console.log(`email service at localhost:${PORT}`))