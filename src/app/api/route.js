import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    address: '大阪府大阪市西区新町1-25-8',
    capital: 300,
    company_id: 27579,
    company_name: '株式会社ASIAN RADTEACOMPANY',
    description: '',
    foundation_date: '2020-11',
    industry: '商業（卸売業、小売業）',
    ipo_type: '未上場',
    phone: '06-6535-8535',
    president_name: '重野由佳',
    twitter_screen_name: '',
    url: 'https://asianradafters.com',
    coordinate: [135.521908, 34.596]
  })
}
