import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req: any) {
  const { from_date } = req.params

  try {
    const headers = {
      Authorization: `Bearer 37aaaf2e5398eec3521ca0408f9e0817999d81e014c000a3e65b55e6a807060c`,
      'Content-Type': 'application/json'
    }

    const response = await axios.get(
      `https://hackathon.stg-prtimes.net/api/releases`,
      {
        params: {
          from_date: from_date
        },
        headers: headers
      }
    )

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error: ', error)
    return NextResponse.error()
  }
}
