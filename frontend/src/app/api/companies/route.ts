import { NextResponse } from 'next/server'
import { CompanyDetails } from '@/types/types'

interface Coordinates {
  lng: number
  lat: number
}

export async function GET() {
  const PRTIMES_APIKEY = process.env.NEXT_PUBLIC_PRTIMES_APIKEY!

  const releases_url = 'https://hackathon.stg-prtimes.net/api/releases'

  const queryParams = new URLSearchParams({
    per_page: '20',
    page: '3'
  })

  const urlWithParams = `${releases_url}?${queryParams.toString()}`
  console.log(urlWithParams)
  try {
    // Fetch releases
    const prtimes_req = await fetch(urlWithParams, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + PRTIMES_APIKEY
      }
    })

    const releases: any[] = await prtimes_req.json()

    // releases から　company_ids 収得
    const company_id_list: number[] = releases.map(
      (element) => element.company_id
    )

    //company_id　から　coordinates　収得
    const getCoordinates = async () => {
      try {
        const coordinatePromises = company_id_list.map(async (id) => {
          const coords = await fetch(
            `http://localhost:3000/api/companies/${id}/coordinate`
          )

          if (!coords.ok) {
            console.error(
              `Error fetching coordinates for company ID ${id}: ${coords.statusText}`
            )
            return null // Handle the error appropriately
          }

          const result: Coordinates = await coords.json()
          return result
        })

        const coordinates = await Promise.all(coordinatePromises)
        return coordinates.filter((coord) => coord !== null) // Filter out any null results
      } catch (error) {
        console.error('Error fetching coordinates:', error)
        throw error // Rethrow the error to be caught in the main catch block
      }
    }

    // company_id　から　企業情報収得
    const getCompanyDetails = async () => {
      const detailsPromises = company_id_list.map(async (id) => {
        const companyInfo = await fetch(
          `https://hackathon.stg-prtimes.net/api/companies/${id}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + PRTIMES_APIKEY
            }
          }
        )
        const result: CompanyDetails = await companyInfo.json()
        return result
      })

      const companyDetails = await Promise.all(detailsPromises)
      return companyDetails
    }

    // Fetch 非同期処理
    const [coordinates, companyDetails] = await Promise.all([
      getCoordinates(),
      getCompanyDetails()
    ])

    // response をまとめ
    const combinedResults = coordinates.map((coord, index) => ({
      coordinates: coord,
      // Include additional details if needed
      ...(companyDetails[index] || {})
    }))

    return NextResponse.json(combinedResults)
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.error()
  }
}
