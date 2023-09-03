import { hashSync, genSaltSync } from 'bcryptjs'
import { NextResponse } from 'next/server'
import User from '@/models/user'

const sendVerificationCodeViaSMS = async (mobile: string, password: string) => {
    const payload = {
        'mobile': mobile,
        'templateId': 100000,
        'parameters': [
            {
                'name': 'Code',
                'value': password
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
        const { mobileNumber } = (await req.json()) as {
            mobileNumber: string
        }

        const randomNewPassword = Math.random().toString(36).slice(2, 10)

        const hashedNewPassword = hashSync(randomNewPassword, genSaltSync(10))

        const user = await User.findOneAndUpdate({
            mobileNumber: mobileNumber
        }, {
            password: hashedNewPassword
        })

        user.save()

        const smsRes = await sendVerificationCodeViaSMS(mobileNumber, randomNewPassword)

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
