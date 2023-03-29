import { spider } from "scripts/spider.js";
import { seeker } from "scripts/seeker.js";
/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([['server', seeker(ns)]]);
	const target = args._[0];
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
		if (hostname != '') {
			let threadCount = Math.floor((ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)) / exaRAM);

			if (ns.fileExists("BruteSSH.exe", "home")) { ns.brutessh(hostname); }

			if (ns.fileExists("FTPCrack.exe", "home")) { ns.ftpcrack(hostname); }

			ns.nuke(hostname);

			if (threadCount != 0) {

				await ns.scp(exa, hostname);

				ns.exec(exa, hostname, threadCount, target);

				totalThreads.push(threadCount);
			}
		}
	}

	ns.tprint("Exas deployed to " + hosts.length + " servers, targeting " + target);
}
