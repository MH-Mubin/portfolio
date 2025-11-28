import { NextResponse } from 'next/server'
import { fetchGithubStats } from '../../../lib/github-client'

export async function GET(){
  try{
    const data = await fetchGithubStats()
    return NextResponse.json({ success: true, data })
  }catch(e:any){
    return NextResponse.json({ success: false, error: e.message }, { status:500 })
  }
}
