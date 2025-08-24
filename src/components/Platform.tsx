import Image from 'next/image';
import React from 'react';

interface platformType {
    name: string;
    image: string;

}

export const Platform = ( { data }: { data: platformType; } ): React.ReactElement => {
    return <div className='flex flex-col gap-2 justify-center items-center text-white'>
        <Image src={ `/socials${ data.image }.png` } alt={ data.name } width={ 20 } height={ 20 } />
        <h4 className='text-sm font-medium'>{ data.name }</h4>
    </div>;
};