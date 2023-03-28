import { spider } from "scripts/spider.js";
/** @param {NS} ns */
export async function main(ns) {

	spider(ns);

	let hackable = [];
	let hackLvl = ns.getHackingLevel();

	let port0 = ns.read("Servers_Ports_0.txt");
	let listPort0 = port0.split(",");

	for (i = 0; i < listPort0.length; i++) {
		const serv = listPort0[i];
		if (ns.getServerRequiredHackingLevel(serv) <= hackLvl) {
			hackable.push(listPort0[i]);
		}

	}

	if (ns.fileExists("bruteSSH.exe", "home")) {

		let port1 = ns.read("Servers_Ports_1.txt");
		let listPort1 = port1.split(",")

		for (i = 0; i < listPort1.length; i++) {
			const serv = listPort1[i];
			if (ns.getServerRequiredHackingLevel(serv) <= hackLvl) {
				hackable.push(listPort1[i]);
			}
		}
	}




}
