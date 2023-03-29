import { spider } from "scripts/spider.js";
import { seeker } from "scripts/seeker.js";
/** @param {NS} ns */
export async function main(ns) {
	const args = ns.flags([['server', seeker(ns)]]);
	const target = args._[0];
	spider(ns);
	ns.tail();
	ns.disableLog('ALL');
	const exa = "exa_mk1.js";
	let totalThreads = [];
	var exaRAM = ns.getScriptRam(exa);
	let hosts = ns.getPurchasedServers();

	for (let i = 0; i < hosts.length; i++) {
		let hostname = hosts[i];
		ns.killall(hostname);
	}
		ns.tprint("All servers cleared.");
	for (let i = 0; i < hosts.length; i++) {
		let hostname = hosts[i];
		ns.print(hostname);
		if (hostname != '') {
			let threadCount = Math.floor((ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname)) / exaRAM);

			if (ns.fileExists("BruteSSH.exe", "home")) { ns.brutessh(hostname); }

			if (ns.fileExists("FTPCrack.exe", "home")) { ns.ftpcrack(hostname); }

			ns.nuke(hostname);

			if (threadCount != 0) {

				await ns.scp(exa, hostname);
				ns.print("Launched to " + hostname);
				ns.exec(exa, hostname, threadCount, target);

				totalThreads.push(threadCount);
			}
		}

	}
	ns.tprint("All servers now targeting " + target);
}
