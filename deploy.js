import { spider } from "scripts/spider.js";
import { seeker } from "scripts/seeker.js";
/** @param {NS} ns */
export async function main(ns) {
	spider(ns);
	ns.tail();
	ns.disableLog('ALL');
	const target = seeker(ns);
	const exa = "exa_mk1.js";
	let totalThreads = [];
	var exaRAM = ns.getScriptRam(exa);
	let hosts = ns.read("hackableServers.txt").split(",");

	for (let i = 0; i < hosts.length; i++) {
		let hostname = hosts[i];
		let threadCount = Math.floor((ns.getServerMaxRam(hostname)-ns.getServerUsedRam(hostname)) / exaRAM);
		
		ns.killall(hostname);
		
		if(ns.fileExists("BruteSSH.exe","home")){ns.brutessh(hostname);}
		
		ns.nuke(hostname);
		
		await ns.scp(exa, hostname);

		ns.exec(exa, hostname, threadCount, target);

		totalThreads.push(threadCount);

		
	}
	ns.tprint("All current scripts killed, exas deployed to "+target+".");
}
