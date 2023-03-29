import { spider } from "scripts/spider.js";
import { seeker } from "scripts/seeker.js";
/** @param {NS} ns */
export async function main(ns) {
	spider(ns);
	let bestTarget = seeker(ns);

	ns.tprint("----------------------");
	ns.tprint("> Current best target is: "+bestTarget);
	ns.tprint("----------------------");
	ns.tprint("Target max money: "+ns.formatNumber(ns.getServerMaxMoney(bestTarget)));
	ns.tprint("Target min security: "+ns.formatNumber(ns.getServerMaxMoney(bestTarget)));
	ns.tprint("Required Hacking level: "+ns.getServerRequiredHackingLevel(bestTarget));

}
