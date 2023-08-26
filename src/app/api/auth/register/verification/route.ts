import { hashSync, genSaltSync } from 'bcryptjs'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import verification from '@/models/verification'

const sendVerificationCodeViaSMS = async (mobile: string, code: string) => {
    const payload = {
        'mobile': mobile,
        'templateId': 100000,
        'parameters': [
            {
                'name': 'Code',
                'value': code
            }
        ]
    }

    const res = await fetch('https://api.sms.ir/v1/send/verify', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': `${process.env.SMS_ACCESS_KEY}`,
        }
    })

    return res.json()
}

export async function POST(req: Request) {
    try {
        await dbConnect()

        const { mobileNumber } = (await req.json()) as {
            mobileNumber: string
        }

        const generatedCode = String(Math.round(Math.random() * 10000) + 10001)
        const censoredMobileNumber = `${mobileNumber.slice(0, 4)}*${mobileNumber.slice(-2)}`

        const hashedCode = hashSync(generatedCode, genSaltSync(10))

        await verification.create({
            mobileNumber: censoredMobileNumber,
            code: hashedCode,
        })

        // console.log('generatedCode', generatedCode);

        const smsRes = await sendVerificationCodeViaSMS(mobileNumber, generatedCode)

        if (smsRes.status !== 1) return NextResponse.json({
            message: 'smsError'
        })
        else 
        return NextResponse.json({
            message: 'codeSent'
        })

    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ status: 500, message: error.message })
    }
}
