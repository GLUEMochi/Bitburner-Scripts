/** @param {NS} ns */
export async function main(ns) {
	let servers = ns.getPurchasedServers();
	ns.tprint("!! WIPING ALL PURCHASED SERVERS !!")
	for (let i = 0; i < servers.length; i++) {
		let serv = servers[i];
		ns.killall(serv);
	}
	await ns.sleep(1000);
	ns.tprint("About to delete all servers. You have 5 seconds to kill this script to avoid this.")
	await ns.sleep(5000);
	for (let i = 0; i < servers.length; i++) {
		let serv = servers[i];
		ns.deleteServer(serv);
	}
	await ns.sleep(1000);
	ns.tprint("All servers deleted.");
}
