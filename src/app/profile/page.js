"use client";

import Head from "next/head";
import { doLogin, changePhoto } from "@/services/Web3Service";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
	
	const { push } = useRouter();
	const [text, setText] = useState("");
	const [message, setMessage] = useState("");

	function btnLoginClick(){
		setMessage("Atualizando foto de perfil... Aguarde...");
		doLogin()
			.then(wallet => {
				push("/timeline");
				
			})
			.catch(err => {
				console.log(err);
				setMessage(err.message);
			})
	}
	
	return (
		<>
			<Head>
					<title>CyberThoughts | Profile</title>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
			</Head>
			<div className="top">
				<div className="left">
					<img className="b" src="/Cyborg1.png" width="100" height="100"/>
				</div>
				<h1>
					CyberThoughts
				</h1>
				<p> Tome um tempo para si </p>
			</div>
			<br/>
			<br/>
			<br/>
			<label className="center"> Mudar foto de perfil
				<input id="resposta" className="form-control my-3" value={text} placeholder="Link da sua nova foto " onChange={evt => setText(evt.target.value)}/>
			</label>
			<div className="center ">
				<input type="button" onClick={ btnLoginClick} className="btn btn-dark" value="Enviar"/>
				<span className="message">
					<font size="3">{message}</font>
				</span>
			</div>
		</>	
  )
}