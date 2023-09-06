"use client";

import Head from "next/head";
import NewCyberThought from "@/components/NewCyberThought"
import CyberThought from "@/components/CyberThought";
import { getLastCyberThoughts } from "@/services/Web3Service";

import { useState, useEffect } from "react";

export default function Timeline() {
	
    const [cyberthoughts, setCyberThoughts] = useState([]);
    const [page, nextPage] = useState(1);

    async function cyberThought(page = 1) {
        try {
            const results = await getLastCyberThoughts(page);
            if (page > 1) {
                cyberthoughts.push(...results);
            }
            else{
                setCyberThoughts(results);
				nextPage(prevPage => prevPage + 1);
			}
        }
        catch (err) {
            console.error(err);
        }
    }
	
    useEffect(() => {
		if(cyberthoughts.length % 5 === 0) cyberThought(page);
    }, [page])
	
	function btnLoadMoreClick() {
        nextPage(prevPage => prevPage + 1);
    }
	
    return (
        <>
            <Head>
                <title>CyberThoughts | Timeline</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </Head>
            <div className="container">
                <div className="row">
                    <div className="layout">
                        <NewCyberThought />
                        {
                            cyberthoughts && cyberthoughts.length
                                ? (
									cyberthoughts.map(t => 
											<CyberThought key={Number(t.time)} data={t} />
									)
										
								)
								: <p>Nada para ver aqui. Faça o primeiro CyberThought.</p>
                        }
                        {
                             cyberthoughts.length > 0 && cyberthoughts.length % 5 === 0
                                ? (
                                    <div className="center">
                                        <input type="button" className="btn btn-dark" value="Mais CyberThoughts" onClick={btnLoadMoreClick} />
                                    </div>
                                )
                                : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
