import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='p-4 flex-1 overflow-auto custom-scrollbar h-full min-h-0'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && (
				<div className='space-y-4'>
					{[...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
				</div>
			)}
			
			{!loading && messages.length === 0 && (
				<div className='flex items-center justify-center h-full min-h-[400px]'>
					<div className='text-center space-y-3'>
						<div className='w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto'>
							<span className='text-2xl'>💬</span>
						</div>
						<p className='text-white/60 text-lg'>No messages yet</p>
						<p className='text-white/40 text-sm'>Send a message to start the conversation</p>
					</div>
				</div>
			)}
		</div>
	);
};
export default Messages;

// STARTER CODE SNIPPET
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 		</div>
// 	);
// };
// export default Messages;
