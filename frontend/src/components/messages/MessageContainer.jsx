import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='flex-1 flex flex-col h-full'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Modern Header */}
					<div className='bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-tr-2xl flex-shrink-0'>
						<div className='flex items-center gap-3'>
							<div className='avatar online'>
								<div className='w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden'>
									<img 
										src={selectedConversation.profilePic} 
										alt={selectedConversation.fullName}
										className='w-full h-full object-cover'
									/>
								</div>
							</div>
							<div>
								<h3 className='text-white font-semibold text-lg'>{selectedConversation.fullName}</h3>
								<p className='text-white/60 text-sm'>Online</p>
							</div>
						</div>
					</div>
					
					{/* Messages Area */}
					<div className='flex-1 bg-white/5 backdrop-blur-md border-x border-white/20 overflow-hidden min-h-0'>
						<Messages />
					</div>
					
					{/* Message Input */}
					<div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-br-2xl p-4 flex-shrink-0'>
						<MessageInput />
					</div>
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl'>
			<div className='px-8 py-12 text-center flex flex-col items-center gap-6'>
				<div className='w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20'>
					<TiMessages className='text-5xl text-white/80' />
				</div>
				<div className='space-y-2'>
					<h2 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>
						Welcome back, {authUser.fullName}! 👋
					</h2>
					<p className='text-white/60 text-lg'>Select a conversation to start chatting</p>
					<p className='text-white/40 text-sm'>Choose from your contacts on the left to begin messaging</p>
				</div>
			</div>
		</div>
	);
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>Pran Kishor</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;
