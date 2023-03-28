import { spider } from "scripts/spider.js";
/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog('ALL');
	spider(ns);
	let hackableList = ns.read("hackableServers.txt");
	let hackedList = ns.read("hackedServers.txt");
	let hackable = hackableList.split(",");
	let hacked = hackedList.split(",");
	


	ns.tprint("Updating...");
	await ns.sleep(1000);
	ns.tprint("[------------]");
	await ns.sleep(150);
	ns.tprint("[||----------]");
	await ns.sleep(150);
	ns.tprint("[||||--------]");
	await ns.sleep(150);
	ns.tprint("[||||||------]");
	await ns.sleep(150);
	ns.tprint("[||||||||----]");
	await ns.sleep(150);
	ns.tprint("[||||||||||--]");
	await ns.sleep(150);
	ns.tprint("[||||||||||||]");
	await ns.sleep(150);

	ns.tprint("Server lists Updated. Opening detailed analysis.\n");
	ns.tail();

	
	
	ns.print("---------------")
	ns.print("> Hacking Level: " + ns.getHackingLevel() + "\n");
	//Hacked
	for (let i = 0; i < hacked.length; i++) {
		let serv = hacked[i];
		let money = ns.getServerMoneyAvailable(serv);
		let maxMoney = ns.getServerMaxMoney(serv);
		let sec = ns.getServerSecurityLevel(serv);
		let secmin = ns.getServerMinSecurityLevel(serv);
		let ram = ns.getServerMaxRam(serv);
		ns.print(serv + "\n");
		ns.print("RAM- "+ ns.formatRam(ram));
		if(ns.getServerMaxMoney(serv)!=0){
		ns.print("$--- " + " $"+ns.formatNumber(money) + " / " +" $"+ns.formatNumber(maxMoney));
		ns.print("Sec- " + ns.formatNumber(sec) + " / "+ns.formatNumber(secmin));
		ns.print(ns.formatPercent((money/maxMoney)));
		}
	}
	//Hackable
}
