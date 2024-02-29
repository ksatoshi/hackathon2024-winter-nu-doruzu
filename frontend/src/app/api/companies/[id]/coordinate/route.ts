import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const PRTIMES_APIKEY = process.env.PRTIMES_APIKEY

  const MAPBOX_APIKEY = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  const company_id = params.id
  const companydetail_url =
    'https://hackathon.stg-prtimes.net/api/companies/' + company_id

  let prtimes_req = await fetch(companydetail_url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + PRTIMES_APIKEY
    }
  })

  let companydetail_origin = await prtimes_req.json()
  let company_address = companydetail_origin['address']

  const geocoding_url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(company_address) +
    '.json?access_token=' +
    MAPBOX_APIKEY

  let mapbox_req = await fetch(geocoding_url)
  let geocoding_origin = await mapbox_req.json()

  let coordinate = geocoding_origin['features'][0]['geometry']['coordinates']
  console.log(coordinate)

  let result = { coordinate: [coordinate[0], coordinate[1]] }

  return NextResponse.json(result)
}
