import { Resend } from "resend";
const resendKey = process.env.RESEND_KEY;
const rickiEmail = process.env.RICKI_EMAIL

const resend = new Resend(resendKey);

export async function contactController (req: any, res: any) {
    const { fullName, email, enquiry} = req.body;
    
    const timeout = (ms: Number) => 
        new Promise<never>((_, reject) => setTimeout(() =>  reject(new Error("Timeout"))), ms)

    try {
        const {data, error} = await resend.emails.send({
            from: email,
            to: [rickiEmail || 'callumacourtt@gmail.com'],
            subject: `Enquiry from ${fullName}`,
            html: `<p>${enquiry}</p>`,
            replyTo: email
        });

        if (error) {
            return res.status(500).send({message: "Failed to send email", error});
        }
        return res.status(200).send({message: "Successfully sent email", data});

    } catch (error) {
        return res.status(500).send({message: "An unexpected error occured", error});
    }
}