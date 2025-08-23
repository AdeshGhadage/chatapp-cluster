const MessageSkeleton = () => {
	return (
		<div className='space-y-4'>
			{/* Incoming message skeleton */}
			<div className='flex gap-3 justify-start mb-4'>
				<div className='flex-shrink-0'>
					<div className='w-8 h-8 bg-white/10 rounded-full animate-pulse'></div>
				</div>
				<div className='flex flex-col items-start max-w-xs'>
					<div className='bg-white/10 rounded-2xl rounded-bl-md px-4 py-3 animate-pulse'>
						<div className='h-4 bg-white/20 rounded w-32 mb-1'></div>
						<div className='h-4 bg-white/20 rounded w-24'></div>
					</div>
					<div className='mt-1 px-2'>
						<div className='h-3 bg-white/10 rounded w-12 animate-pulse'></div>
					</div>
				</div>
			</div>

			{/* Outgoing message skeleton */}
			<div className='flex gap-3 justify-end mb-4'>
				<div className='flex flex-col items-end max-w-xs'>
					<div className='bg-blue-500/30 rounded-2xl rounded-br-md px-4 py-3 animate-pulse'>
						<div className='h-4 bg-white/20 rounded w-28'></div>
					</div>
					<div className='mt-1 px-2'>
						<div className='h-3 bg-white/10 rounded w-12 animate-pulse'></div>
					</div>
				</div>
				<div className='flex-shrink-0'>
					<div className='w-8 h-8 bg-blue-400/20 rounded-full animate-pulse'></div>
				</div>
			</div>
		</div>
	);
};
export default MessageSkeleton;
