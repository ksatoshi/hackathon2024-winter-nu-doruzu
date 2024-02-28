import React from 'react';

type company_info = {
  address: string;
  capital: number;
  company_id: number;
  company_name: string;
  description: string;
  foundation_date: string;
  industry: string;
  ipo_type: string;
  phone: string;
  president_name: string;
  twitter_screen_name: string;
  url: string;
};


async function Listview() {
  const data : company_info[]= await getdata()
 
  return (
    <div className='max-h-screen overflow-y-auto'>
      {data.map((d, index) => (
        <ListItem key={d.company_id} {...d} />
      ))}
    </div>
  );
}

function ListItem({ company_name, description, address, industry }: company_info) {
  return (
    <div className="max-w-md w-full ">
      <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-6">
          <div>
            <p className="text-black font-bold text-xl mb-2">{company_name}</p>
            <p className="text-gray-700 text-sm mb-2">{address}</p>
            <p className="text-gray-700 text-sm mb-2">{industry}</p>
          </div>
          <p className="text-black">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

async function getdata(){

  const res = await fetch("https://hackathon.stg-prtimes.net/api/companies?per_page=10&page=1", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer 37aaaf2e5398eec3521ca0408f9e0817999d81e014c000a3e65b55e6a807060c`
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

return res.json()
}

export default Listview;
