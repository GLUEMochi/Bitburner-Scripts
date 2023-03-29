import { spider } from "scripts/spider.js";
import { seeker } from "scripts/seeker.js";
/** @param {NS} ns */
export async function main(ns) {
	let hackable = ns.read("hackableServers.txt").split(",");
	ns.disableLog('ALL')
	spider(ns);
	let bestTarget = seeker(ns);

	ns.tprint("----------------------");
	ns.tprint("> Current best target is: " + bestTarget);
	ns.tprint("----------------------");
	ns.tprint("Target max money: " + ns.formatNumber(ns.getServerMaxMoney(bestTarget)));
	ns.tprint("Target min security: " + ns.formatNumber(ns.getServerMinSecurityLevel(bestTarget)));
	ns.tprint("Required Hacking level: " + ns.getServerRequiredHackingLevel(bestTarget));
	ns.tprint("----------------------");
	ns.tprint("Opening list of all hackable servers.");
	ns.tail();
	ns.print("---");
	ns.print("---");
	ns.print("---");
	for (let i = 0; i < hackable.length; i++) {
		let secdiff = ns.formatNumber(ns.getServerSecurityLevel(hackable[i]) - ns.getServerMinSecurityLevel(hackable[i]));
		ns.print(" " + hackable[i] + " [RAM: " + ns.getServerMaxRam(hackable[i]) + "GB, Money: $" + ns.formatNumber(ns.getServerMoneyAvailable(hackable[i])) + " / $" + ns.formatNumber(ns.getServerMaxMoney(hackable[i])) + ", Sec: +" + secdiff + "]");
	}
	ns.print("---");
}
