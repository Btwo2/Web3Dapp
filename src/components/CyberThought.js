import { generateAvatarURL } from "@cfx-kit/wallet-avatar"
import { doLogin, changePhoto } from "@/services/Web3Service";
import { useRouter } from "next/navigation";

export default function CyberThought(props){
	
	const { push } = useRouter();
	
	const address = String(localStorage.wallet);
	
	function openPopup(){
		const popclose = document.getElementById("popclose");
		const popup = document.getElementById("popup");	
		document.getElementById("actual_image").src = props.data.photo ? props.data.photo : generateAvatarURL(props.data.author);
		popup.classList.add("open_popup");
		popclose.classList.add("open_popup_back");
		const change_photo = document.getElementById("change_photo");
		if( String(props.data.author).toLowerCase() === String(localStorage.wallet)){
			change_photo.classList.add("owner");
		}
		else{
			change_photo.classList.remove("owner");
		}
	}
	
	function isImage(url) {
		return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
	}
	
	function closePopup1(){
		const popclose = document.getElementById("popclose");
		const popup2 = document.getElementById("popup2");
		const popup = document.getElementById("popup");	
		popup.classList.remove("open_popup");
		popclose.classList.remove("open_popup_back");
		popup2.classList.remove("open-popup2");
		
	}
	
	function closePopup(){
		const newlink = document.getElementById("newphoto");
		const popclose = document.getElementById("popclose");
		const popup2 = document.getElementById("popup2");
		const popup = document.getElementById("popup");	
		if (newlink.value === ""){ 
			popup.classList.remove("open_popup")
			popclose.classList.remove("open_popup_back");
		}
		else{
			if (isImage(newlink.value)){
				document.getElementById("imagenew").src = newlink.value;
				document.getElementById("preview_image").src = document.getElementById("actual_image").src;
				popup.classList.remove("open_popup");
				popup2.classList.add("open-popup2");
			}
			else{
				newlink.placeholder = "Link Inválido";
				newlink.value = "";
			}
		}
	}
	
	function closePopup2(){
		const newlink = document.getElementById("newphoto");
		const popclose = document.getElementById("popclose");
		popup2.classList.remove("open-popup2");
		popclose.classList.remove("open_popup_back");
		changePhoto(newlink.value)
			.then(result => {
				location.reload();
			})
			.catch(err => {
				console.error(err);
			})
	}
	
	function closePopup3(){
		const popclose = document.getElementById("popclose");
		const popup2 = document.getElementById("popup2");
		popup2.classList.remove("open-popup2");
		popclose.classList.remove("open_popup_back");
	} 
	
	
    return (
        <>
            <div className="cyberthought">
				<img 
					type="button" 
					onClick={ openPopup } 
					className="cyberthought_author_logo" 
					src={ props.data.photo 
						? props.data.photo 
						: generateAvatarURL(props.data.author)
					}
				/>
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
					<div className="popup_back" id="popclose" onClick={ closePopup1 }></div>
					<div className="popup" id="popup">
						<img className="popup_image0" id="actual_image"/>
						<br/>
						<p> Que inspiração! <br/> Uma foto incrível né !? </p>
						<div className="text_container" id="change_photo">
							<input type="button" onClick={ closePopup } className="btn btn-dark btn3" value="Trocar" />
							<textarea className="word_field" id="newphoto" type="text" name="name" placeholder=" Link para nova foto "/>
						</div>
						
					</div>
					<div className="popup2" id="popup2">
						<div className="row">
							<div className="column">
								<img className="popup_image" id="preview_image"/>
							</div>
							<div className="column">
								<img className="popup_arrow" src="./arrow.png"/>
							</div>
							<div className="column">
								<img className="popup_image" id="imagenew" />
							</div>
						</div>
						<br/>
						<div>
							<input type="button" onClick={ closePopup2 } className="btn btn-dark btn1" value="Mudar foto"/>
							<input type="button" onClick={ closePopup3 } className="btn btn-dark btn2" value="Cancelar"/>
						</div>
					</div>
                </div>
            </div>
        </>
    )
}



/*<input id="newphoto" type="text" name="newphoto" value="<%= doc.name %>"/>

<div className="center">
	<div class="box box1">This box uses opacity</div>
</div> */
