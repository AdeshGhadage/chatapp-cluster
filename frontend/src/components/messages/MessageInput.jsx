import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message.trim()) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form onSubmit={handleSubmit} className='w-full'>
			<div className='relative flex items-center gap-2'>
				<div className='flex-1 relative'>
					<input
						type='text'
						className='w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 rounded-full px-6 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200'
						placeholder='Type a message...'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						disabled={loading}
					/>
					<button
						type='button'
						className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors duration-200'
					>
						<HiOutlineEmojiHappy className='w-5 h-5' />
					</button>
				</div>
				
				<button
					type='submit'
					disabled={loading || !message.trim()}
					className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/25'
				>
					{loading ? (
						<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
					) : (
						<BsSend className='w-5 h-5' />
					)}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
