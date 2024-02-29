'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/companies', {
          params: {
            per_page: 10,
            page: 1
          }
        })
        setData(response.data)

      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
  }, [])

  const handleItemClick = (companyId: number) => {

    console.log("Clicked company_id:", companyId);
    setSelectedCompanyId(companyId);
  };

  return (
    <div className='flex max-h-screen overflow-y-hidden '>
      <div className="">
        {selectedCompanyId !== null && (
          <SelectedCompanyInfo selectedCompanyId={selectedCompanyId} onClose={() => setSelectedCompanyId(null)} />
        )}
      </div>
      <div className=' overflow-y-auto' style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}>

        {data.map((d, index) => (
          <ListItem key={d.company_id} {...d} onItemClick={handleItemClick} />
        ))}
      </div>
    </div>
  );
}

type ListItemProps = {
  company_id: number
  company_name: string
  description: string
  address: string
  industry: string
  onItemClick: (companyId: number) => void
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
      className="max-w-md w-full cursor-pointer"
      onClick={() => onItemClick(company_id)}
    >
      <div className=" p-4 flex flex-col justify-between leading-normal  hover:bg-slate-800">
        <div className="mb-6">
          <div>
            <p className="text-white font-bold text-xl mb-2 ">{company_name}</p>
            <div className='flex gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
              </svg>
              <p className="text-white text-sm mb-2">{address}</p>
            </div>
            <div className='flex gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
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



type SelectedCompanyInfoProps = {
  selectedCompanyId: number | null;
  onClose: () => void;
};

const SelectedCompanyInfo: React.FC<SelectedCompanyInfoProps> = ({ selectedCompanyId, onClose }) => {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/companies/${selectedCompanyId}/releases`);
        //const response = await apiClient.get(`/companies/113690/releases`);

        console.log(response.data);
        setReleases(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (selectedCompanyId !== null) {
      fetchData();
    }
  }, [selectedCompanyId]);

  return (
    <div className="p-4 text-red-500 max-w-sm">
      <button onClick={onClose} className='border border-red-400 px-4 py-2 font-bold'>Close</button>

      {releases.length > 0 ? (
        releases.map((release) => (
          <div key={release.release_id} className="release-tile">
            <p>{release.title}</p>
          </div>
        ))
      ) : (
        <p>No releases available for this company</p>
      )}
    </div>
  );
};


export default Listview;


