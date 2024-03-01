import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const company_id = params.id

  // requestパラメータを取得
  const search_param = req.nextUrl.searchParams
  const from_date = search_param.get('from_date')
  const to_date = search_param.get('to_date')
  let limit = Number(search_param.get('limit'))

  // limitのデフォルト値として3を設定
  if (limit == null) {
    limit = 3
  }

  const PRTIMES_APIKEY = process.env.PRTIMES_APIKEY

  let releaselist_url: string

  // デフォルトだとfrom_dateが一週間前,to_dateが当日らしいのでここら辺不要かもしれない
  if (from_date != null && to_date == null) {
    releaselist_url =
      'https://hackathon.stg-prtimes.net/api/companies/' +
      company_id +
      '/releases?from_date=' +
      from_date
  } else if (from_date == null && to_date != null) {
    releaselist_url =
      'https://hackathon.stg-prtimes.net/api/companies/' +
      company_id +
      '/releases?to_date=' +
      to_date
  } else if (from_date != null && to_date != null) {
    releaselist_url =
      'https://hackathon.stg-prtimes.net/api/companies/' +
      company_id +
      '/releases?from_date=' +
      from_date +
      '&to_date=' +
      to_date
  } else {
    releaselist_url =
      'https://hackathon.stg-prtimes.net/api/companies/' +
      company_id +
      '/releases'
  }

  console.log('request:' + releaselist_url)

  const releaselist_req = await fetch(releaselist_url, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + PRTIMES_APIKEY
    }
  })

  const releaselist_body = await releaselist_req.json()

  // リリースが該当期間に存在しないときとりあえず空で返す
  if (releaselist_body.length == 0) {
    return NextResponse.json([])
  }

  let result = []

  for (let i = 0; i < limit; i++) {
    result.push(releaselist_body[i])
  }

  return NextResponse.json(result)
}
