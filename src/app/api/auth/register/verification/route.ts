import { hashSync, genSaltSync } from 'bcryptjs'
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import verification from '@/models/verification'

export async function POST(req: Request) {
    try {
        await dbConnect()

        const { mobileNumber } = (await req.json()) as {
            mobileNumber: string
        }

        const generatedCode = String(Math.round(Math.random() * 10000) + 1001)
        const censoredMobileNumber = `${mobileNumber.slice(0, 4)}*${mobileNumber.slice(-2)}`

        const hashedCode = hashSync(generatedCode, genSaltSync(10))

        await verification.create({
            mobileNumber: censoredMobileNumber,
            code: hashedCode,
        })

        console.log('code', generatedCode);

        return NextResponse.json({
            message: 'verification code sent'
        })
    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ status: 500, message: error.message })
    }
}
