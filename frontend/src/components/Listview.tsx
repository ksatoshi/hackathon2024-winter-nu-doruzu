import React from 'react';

const data = ["List_1", "List_2", "List_3", "List_4"];

function Listview() {
  return (
    <div className='max-h-screen overflow-y-auto'>
      {data.map((d, index) => (
        <ListItem key={d} name={d} />
      ))}
    </div>
  );
}

function ListItem({ name }: { name: string }) {
  return (
    <div className="max-w-md w-full lg:flex">
 
      <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          
          <div className="text-black font-bold text-xl mb-2">{name}
          
          </div>
          <p className="text-black ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
    
        </div>

      </div>
    </div>
  );
}

export default Listview;
