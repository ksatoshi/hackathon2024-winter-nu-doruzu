import Toggle from '@/components/Toggle'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import { CompanyDetails } from '@/types/types'
import { addMakerToMap } from '@/components/Map'
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

interface ToggleParentProps {
  map: mapboxgl.Map
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
export default function ToggleParent({ map }: ToggleParentProps) {
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
      const companyIdArr: number[] = releases.map(
        (ele: CompanyDetails) => ele.company_id
      )

      for (const companyId of companyIdArr) {
        try {
          const coordinateResponse = await axios
            .get(`/api/companies/${companyId}/coordinate`)
            .then((response) => response.data)

          const longitude: number = coordinateResponse.coordinate[0]
          const latitude: number = coordinateResponse.coordinate[1]

          console.log(longitude)
          console.log(latitude)

          addMakerToMap(map, [longitude, latitude])
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
