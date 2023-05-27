import nodemailer from "nodemailer"

class EmailService {
    private readonly transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 465,
        secure: true,
        auth: {
            user: 'johnny81@ethereal.email',
            pass: 'jjEtanJW2BKRgBhFgN'
        }
    })

    public async sendCode(to: string, code: string) {
        const { accepted } = await this.transporter.sendMail({
            to,
            subject: "Reserve it verification email",
            html: `your verification code is ${code}`
        })

        return !!accepted
    }
}

export default new EmailService()