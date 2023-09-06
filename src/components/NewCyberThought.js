"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addCyberThought } from "@/services/Web3Service";

export default function NewCyberThought(){
	
	const [text, setText] = useState("");
	const [message, setMessage] = useState("");
    const { push } = useRouter();
	
	function btnPublishClick() {
		if(text === ""){
			alert("Pô, me conta alguma coisa");
			return false;
		}
        setMessage("Registrando na blockchain... Aguarde...");
        addCyberThought(text)
            .then(result => {
                setMessage("Registro enviado. Aguarde um minuto para atualizar.");
				location.reload();
            })
            .catch(err => {
                setMessage(err.message);
                console.error(err);
            })
    }
	
	 useEffect(() => {
        const wallet = localStorage.getItem("wallet");
        if (!wallet)	//if wallet not logged
            push("/");	//return to inicial page to do login
    }, [])
	
	
	return  (
		<>
			<div className="top">
				<div className="left">
					<img className="b" src="/Cyborg1.png" width="100" height="100"/>
				</div>
				<h1>
					CyberThoughts
				</h1>
				<p> Tome um tempo para si </p>
				<textarea id="resposta" className="form-control my-3" value={text} placeholder=" A emoção, a alegria, a dor... cada detalhe importa! " onChange={evt => setText(evt.target.value)}>
				</textarea>
				<div>
					<input type="button" onClick={ btnPublishClick} className="btn btn-dark" value="Enviar"/>
					<span className="message">
                        <font size="3">{message}</font>
                    </span>
				</div>
			</div>
		</>				
	)
}