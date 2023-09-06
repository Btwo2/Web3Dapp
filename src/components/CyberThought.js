import { generateAvatarURL } from "@cfx-kit/wallet-avatar"

export default function CyberThought(props){
    return (
        <>
            <div className="cyberthought">
				<a href="./">
					<img className="cyberthought_author_logo" 
						src={
							props.data.photo
								? props.data.photo
								:generateAvatarURL(props.data.author)
						}
					/>
				</a>
                <div>
                    <div className="cyberthought_header">
                        <div className="cyberthought_author_name">
                            {props.data.name}
                        </div>
                        <div className="cyberthought_author_slug">
                            @{props.data.author}
                        </div>
                    </div>
                    <div className="cyberthought_publish_time">
                        at {new Date(Number(props.data.time) * 1000).toLocaleString()}
                    </div>
                    <div>
                        <p>{props.data.text}</p>
                    </div>
                </div>
            </div>
        </>
    )
}