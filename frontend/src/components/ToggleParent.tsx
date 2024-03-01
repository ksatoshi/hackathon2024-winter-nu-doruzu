import Toggle from '@/components/Toggle'
import React, { useRef, useState } from 'react'
import axios from 'axios'
import { addMakerToMap } from '@/components/Map'
import { ToggleProps } from '@/types/types'
import Listview from '@/components/Listview'

function getDateInfo(daysToSubtract: number = 0): string {
  const today: Date = new Date()

  today.setDate(today.getDate() - daysToSubtract)

  const year: number = today.getFullYear()
  const month: string = String(today.getMonth() + 1).padStart(2, '0')
  const day: string = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const apiClient = axios.create({
  baseURL: 'https://hackathon.stg-prtimes.net/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRTIMES_APIKEY!}`
  }
})

export interface CompanyRelease {
  company_name: string
  company_id: number
  release_id: number
  title: string
  subtitle: string
  url: string
  lead_paragraph: string
  body: string
  main_image: string
  main_image_fastly: string
  main_category_id: number
  main_category_name: string
  sub_category_id: number
  sub_category_name: string
  release_type: string
  created_at: string
  like: number
}

function determineNumberOfPagesToFetch(value: number): number {
  if (value < 20) {
    return 10
  } else if (value < 50) {
    return 20
  } else if (value < 100) {
    return 40
  } else if (value < 365 / 2) {
    return 50
  } else if (value < 200) {
    return 70
  } else if (value < 300) {
    return 80
  } else {
    return 100
  }
}

// Problem: すでに描画されているマーカーも再描画されてしまう
export default function ToggleParent({ map }: ToggleProps) {
  const [companies, setCompanies] = useState<CompanyRelease[]>([])

  const handleToggleValueChange = async (value: number) => {
    try {
      const subtractedDate: string = getDateInfo(value)
      const response = await apiClient.get('/releases', {
        params: {
          per_page: determineNumberOfPagesToFetch(value),
          from_date: subtractedDate
        }
      })
      const releases = await response.data
      const companyArr: CompanyRelease[] = releases.map(
        (ele: CompanyRelease) => ele
      )

      setCompanies(companyArr)

      for (const company of companies) {
        try {
          const coordinateResponse = await axios
            .get(`/api/companies/${company.company_id}/coordinate`)
            .then((response) => response.data)

          const longitude: number = coordinateResponse.coordinate[0]
          const latitude: number = coordinateResponse.coordinate[1]

          addMakerToMap(map, [longitude, latitude])

        } catch (error) {
          console.error(
            `Error fetching coordinates for company ${company.company_id}: ${error}`
          )
        }
      }
    } catch (error) {
      console.error(`Error fetching data: ${error}!`)
    }
  }

  return (
    <div className="flex bg-transparent">
      <div className="h-1/1 w-4/5 self-start">
        <Toggle onChange={handleToggleValueChange} />
      </div>
      <div className="w-1/5">
        <Listview companies={companies} />
      </div>
    </div>
  )
}
