/** @param {NS} ns */
export async function quickHack(ns) {
	const target = "n00dles";
	let moneyThresh = ns.getServerMaxMoney(target) * 0.75;
	let secThresh = ns.getServerMinSecurityLevel(target) + 5;

	if (ns.fileExists("BruteSSH.exe", "home")) {
		ns.brutessh(target);
	}

	ns.nuke(target);

	while (true) {
		if (ns.getServerSecurityLevel(target) > secThresh) {
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			await ns.grow(target);
		} else {
			await ns.hack(target);
		}
	}
}

export async function main(ns) { }
