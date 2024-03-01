/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'

type company_info = {
  address: string
  capital: number
  company_id: number
  company_name: string
  description: string
  foundation_date: string
  industry: string
  ipo_type: string
  phone: string
  president_name: string
  twitter_screen_name: string
  url: string
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

function Listview() {
  const [data, setData] = useState<company_info[]>([])
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  )
  const [selectedCompanyName, setSelectedCompanyName] = useState<String | null>(
    null
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/companies') // Next BackendからFetch
        console.log(response.data)
        setData(response.data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
  }, [])

  const handleItemClick = (companyId: number, companyName: string) => {
    console.log('Clicked company_id:', companyId)
    setSelectedCompanyId(companyId)
    setSelectedCompanyName(companyName)
  }

  return (
    <div className="flex max-h-screen overflow-y-hidden ">
      <div className="">
        {selectedCompanyId !== null && (
          <SelectedCompanyInfo
            selectedCompanyId={selectedCompanyId}
            selectedCompanyName={selectedCompanyName}
            onClose={() => {
              setSelectedCompanyId(null)
              setSelectedCompanyName(null)
            }}
          />
        )}
      </div>

      <div className=" overflow-y-auto" style={{ overflowY: 'scroll' }}>
        {data.map((d, index) => (
          <ListItem key={d.company_id} {...d} onItemClick={handleItemClick} />
        ))}
      </div>
    </div>
  )
}

type ListItemProps = {
  company_id: number
  company_name: string
  description: string
  address: string
  industry: string
  onItemClick: (companyId: number, company_name: string) => void
}

function ListItem({
  company_id,
  company_name,
  description,
  address,
  industry,
  onItemClick
}: ListItemProps) {
  return (
    <div
      className="max-w-2xl w-full cursor-pointer"
      onClick={() => onItemClick(company_id, company_name)}
    >
      <div className=" p-4 flex flex-col justify-between leading-normal  hover:bg-zinc-800">
        <div className="mb-6">
          <div>
            <p className="text-white font-bold text-xl mb-2 ">{company_name}</p>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                />
              </svg>
              <p className="text-white text-sm mb-2">{address}</p>
            </div>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
              </svg>
              <p className="text-white text-sm mb-2">{industry}</p>
            </div>

            <p className="text-white">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SelectedCompanyInfoProps {
  selectedCompanyId: number | null
  selectedCompanyName: String | null
  onClose: () => void
}

type ReleaseInfoProps = {
  like: number
  created_at: String
  url: Url
  main_category_name: String
  main_image: string | undefined
  release_id: number
  title: string
}

const SelectedCompanyInfo: React.FC<SelectedCompanyInfoProps> = ({
  selectedCompanyId,
  selectedCompanyName,
  onClose
}) => {
  const [releases, setReleases] = useState([])
  const [mainCategoryName, setmainCategoryName] = useState<String | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `/companies/${selectedCompanyId}/releases`
        )

        setReleases(response.data)
        setmainCategoryName(response.data[0].main_category_name)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    if (selectedCompanyId !== null) {
      fetchData()
    }
  }, [selectedCompanyId])

  return (
    <div className="p-4 max-w-2xl w-full bg-zinc-800 max-h-screen h-full">
      <button
        onClick={onClose}
        className="border border-red-400 px-4 py-2 mb-5 font-bold rounded-md hover:bg-red-400 hover:border-black"
      >
        Close
      </button>

      <p className="mb-1 text-xs font-bold border border-[#ebdbb2] max-w-fit px-2 rounded-md text-[#ebdbb2]">
        {mainCategoryName}
      </p>
      <h1 className="text-xl font-bold mb-4">{selectedCompanyName} </h1>

      {releases.length > 0 ? (
        releases.map((release: ReleaseInfoProps) => (
          <Link
            href={release.url}
            target="_blank"
            key={release.release_id}
            className="flex mb-4 gap-2 hover:bg-zinc-700 "
          >
            <img
              src={release.main_image}
              alt="main_image"
              className="max-w-40 max-h-40 min-h-28"
            />
            <div className="flex flex-col justify-between ">
              <p>{release.title}</p>
              <div className="px-2 py-1 flex justify-end gap-1 align-baseline ">
                <p className="text-xs text-end ">{release.like}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>

                <p className="text-xs text-end ">{release.created_at}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No releases available for this company</p>
      )}
    </div>
  )
}

export default Listview
