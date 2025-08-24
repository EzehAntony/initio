import React from 'react';
import { Skeleton } from './ui/skeleton';

const CardSkeleton = (): React.ReactElement => {
    return (
        <div className='w-full'>
            <Skeleton className="aspect-square bg-[#333333] rounded-md" />
        </div>
    );
};

export default CardSkeleton;