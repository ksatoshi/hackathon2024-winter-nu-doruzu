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
      <div className=' overflow-y-auto'>

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
      <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-6">
          <div>
            <p className="text-black font-bold text-xl mb-2">{company_name}</p>
            <p className="text-gray-700 text-sm mb-2">{address}</p>
            <p className="text-gray-700 text-sm mb-2">{industry}</p>
          </div>
          <p className="text-black">{description}</p>
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


