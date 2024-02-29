import Toggle from '@/components/Toggle'
import axios from 'axios'

function getDateInfo(daysToSubtract: number = 0): string {
  const today: Date = new Date()

  today.setDate(today.getDate() - daysToSubtract)

  const year: number = today.getFullYear()
  const month: string = String(today.getMonth() + 1).padStart(2, '0')
  const day: string = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default function ToggleParent() {
  const handleToggleValueChange = async (value: number) => {
    try {
      const subtractedDate: string = getDateInfo(value)
      const response = await axios.get(`/api/releases`, {
        params: {
          from_date: subtractedDate
        }
      })
    } catch (error) {
      console.error(`Error fetching data: ${error}`)
    }
  }

  return (
    <>
      <Toggle onChange={handleToggleValueChange} />
    </>
  )
}
