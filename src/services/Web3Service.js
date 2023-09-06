import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x17D601aD4453547CbA35C3A903DbF479CDe953AC";

export async function doLogin() {
    if (!window.ethereum) throw new Error("MetaMask Não Encontrada");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error("Carteira Não Permitida ou Encontrada");

    localStorage.setItem("wallet", accounts[0]);

    return accounts[0];
}

function getContract() {
    if (!window.ethereum) throw new Error("MetaMask Não Encontrada");

    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");

    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addCyberThought(text) {
    const contract = getContract();
    return contract.methods.addCyberThought(text).send();
}

export async function changeUsername(newName) {
    const contract = getContract();
    return contract.methods.changeName(newName).send();
}

export async function changePhoto(newName) {
    const contract = getContract();
    return contract.methods.addPhoto(newName).send();
}

export async function getLastCyberThoughts(page) {
    const contract = getContract();
    const cyber_thoughts = await contract.methods.getLastCyberThought(page).call();
    return cyber_thoughts.map(t => { return { ...t } }).filter(t => t.text != "");
}