"use client";

import Head from "next/head";
import { doLogin } from "@/services/Web3Service";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	
	const { push } = useRouter();
	const [message, setMessage] = useState("");

	function btnLoginClick(){
		setMessage("Conectando com a MetaMask... Aguarde...");
		doLogin()
			.then(wallet => push("/timeline"))
			.catch(err => {
				console.log(err);
				setMessage(err.message);
			})
	}
	
	return (
    <>
      <Head>
        <title>CyberThoughts | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="fonts.css"/>
      </Head>
      <div className="container">
        <div className="row flex-lg-row-reverse align-items-center g-4 py-4">
          <div className="col-10 col-sm-8 col-lg-6">
            <img className="a" src="/Cyborg1.png" width="500" height="500" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-1 fw-bold">CyberThoughts</h1>
            <p className="lead"><font size="6">Tome um tempo para si</font></p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" className="btn btn-dark px-3"  onClick={btnLoginClick}>
                <img src="/Metadraw.png" width="64" className="me-3"/>
					<pm><font size="3">Conectar com a MetaMask</font></pm>
              </button>
            </div>
            <pm className="message"><font size="3">{message}</font></pm>
          </div>
        </div>
      </div>
    </>
  )
}