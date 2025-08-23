const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className='space-y-2'>
			<label className='text-white font-medium flex items-center gap-2'>
				<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' />
				</svg>
				Gender
			</label>
			<div className='flex gap-4'>
				<label className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-all duration-300 ${
					selectedGender === "male" 
						? "border-blue-500 bg-blue-500/20 text-blue-300" 
						: "border-white/20 bg-white/5 text-gray-300 hover:bg-white/10"
				}`}>
					<input
						type='radio'
						name='gender'
						className='hidden'
						checked={selectedGender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
					<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
						selectedGender === "male" ? "border-blue-500" : "border-gray-400"
					}`}>
						{selectedGender === "male" && (
							<div className='w-2 h-2 rounded-full bg-blue-500'></div>
						)}
					</div>
					<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.5 2A5.5 5.5 0 003 7.5v9A5.5 5.5 0 008.5 22h7a5.5 5.5 0 005.5-5.5v-9A5.5 5.5 0 0015.5 2h-7z' />
					</svg>
					<span className='font-medium'>Male</span>
				</label>
				
				<label className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl border transition-all duration-300 ${
					selectedGender === "female" 
						? "border-pink-500 bg-pink-500/20 text-pink-300" 
						: "border-white/20 bg-white/5 text-gray-300 hover:bg-white/10"
				}`}>
					<input
						type='radio'
						name='gender'
						className='hidden'
						checked={selectedGender === "female"}
						onChange={() => onCheckboxChange("female")}
					/>
					<div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
						selectedGender === "female" ? "border-pink-500" : "border-gray-400"
					}`}>
						{selectedGender === "female" && (
							<div className='w-2 h-2 rounded-full bg-pink-500'></div>
						)}
					</div>
					<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l9-5-9-5-9 5 9 5z' />
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14v6l9-5-9-5-9 5 9 5z' />
					</svg>
					<span className='font-medium'>Female</span>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;