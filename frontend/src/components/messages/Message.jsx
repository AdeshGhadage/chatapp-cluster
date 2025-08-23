import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`flex gap-3 mb-4 ${fromMe ? 'justify-end' : 'justify-start'}`}>
			{!fromMe && (
				<div className='flex-shrink-0'>
					<div className='w-8 h-8 rounded-full overflow-hidden border-2 border-white/20'>
						<img 
							src={profilePic} 
							alt="Profile" 
							className='w-full h-full object-cover'
						/>
					</div>
				</div>
			)}
			
			<div className={`flex flex-col ${fromMe ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
				<div className={`
					px-4 py-3 rounded-2xl backdrop-blur-sm border transition-all duration-200 ${shakeClass}
					${fromMe 
						? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400/30 rounded-br-md' 
						: 'bg-white/10 text-white border-white/20 rounded-bl-md'
					}
				`}>
					<p className='text-sm leading-relaxed break-words'>{message.message}</p>
				</div>
				<div className='mt-1 px-2'>
					<span className='text-xs text-white/50'>{formattedTime}</span>
				</div>
			</div>
			
			{fromMe && (
				<div className='flex-shrink-0'>
					<div className='w-8 h-8 rounded-full overflow-hidden border-2 border-blue-400/30'>
						<img 
							src={profilePic} 
							alt="Profile" 
							className='w-full h-full object-cover'
						/>
					</div>
				</div>
			)}
		</div>
	);
};
export default Message;
