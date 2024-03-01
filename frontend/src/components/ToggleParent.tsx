import Toggle from '@/components/Toggle'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import { CompanyDetails } from '@/types/types'

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
    Authorization:
      'Bearer 37aaaf2e5398eec3521ca0408f9e0817999d81e014c000a3e65b55e6a807060c'
  }
})

interface ToggleParentProps {
  map: mapboxgl.Map
}

export default function ToggleParent({ map }: ToggleParentProps) {
  const handleToggleValueChange = async (value: number) => {
    try {
      const subtractedDate: string = getDateInfo(value)
      const response = await apiClient.get('/releases', {
        params: {
          per_page: 10,
          from_date: subtractedDate
        }
      })
      const releases = await response.data
      const companyIdArr: number[] = releases.map(
        (ele: CompanyDetails) => ele.company_id
      )

      for (const companyId of companyIdArr) {
        try {
          const coordinateResponse = await axios.get(
            `/api/companies/[${companyId}]/coordinate`
          )
        } catch (error) {
          console.error(
            `Error fetching coordinates for company ${companyId}: ${error}`
          )
        }
      }
    } catch (error) {
      console.error(`Error fetching data: ${error}!`)
    }
  }

  return <Toggle onChange={handleToggleValueChange} />
}
