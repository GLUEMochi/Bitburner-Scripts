import { spider } from "scripts/spider.js";
import { seeker } from "scripts/seeker.js";
/** @param {NS} ns */
export async function main(ns) {
	let nextTarget = seeker(ns);
	let targetMaxMoney = ns.formatNumber(ns.getServerMaxMoney(nextTarget));
	let targetMoney = ns.formatNumber(ns.getServerMoneyAvailable(nextTarget));
	let targetRam = ns.getServerMaxRam(nextTarget);
	let targetPorts = ns.getServerNumPortsRequired(nextTarget);
	spider(ns);
	ns.tail();
	ns.disableLog('ALL');
	let hosts = ns.read("hackableServers.txt").split(",");
	ns.tprint("Cancelling all currently running scripts...");
	for (let i = 0; i < hosts.length; i++) {
		let hostname = hosts[i];
		ns.killall(hostname);		
	}
	await ns.sleep(1000);
	ns.tprint("Success! All scripts cleared.");
	ns.tprint("Finding current best target...");
	ns.tprint("Target Found.");
	ns.tprint("--------------------");
	ns.tprint("  Host:"+nextTarget);
	ns.tprint("  $----- "+targetMoney+" / "+targetMaxMoney);
	ns.tprint("  RAM--- "+targetRam);
	ns.tprint("  Ports- "+targetPorts);
}
