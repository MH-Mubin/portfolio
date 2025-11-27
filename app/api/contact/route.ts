import { NextResponse } from 'next/server'
import { query } from '../../../../lib/db'
import { sendContactEmail } from '../../../../lib/email'

export async function POST(request: Request){
  try{
    const body = await request.json()
    const { name, email, message } = body
    if(!name || !email || !message || message.length < 10) return NextResponse.json({ success:false, message:'invalid' }, { status:400 })

    // Save to DB
    await query('INSERT INTO contact_submissions (name,email,message) VALUES ($1,$2,$3)', [name,email,message])

    // Send notification email
    try{
      await sendContactEmail({ name, email, message })
    }catch(e){ console.error('email send failed', e) }

    return NextResponse.json({ success:true, message:'submitted' })
  }catch(err:any){
    console.error(err)
    return NextResponse.json({ success:false, message:err.message||'error' }, { status:500 })
  }
}
