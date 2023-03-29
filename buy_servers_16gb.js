import { seeker } from "scripts/seeker.js";
/** @param {NS} ns */
export async function main(ns) {
    // How much RAM each purchased server will have. In this case, it'll
    // be 8GB.
    const ram = 16;
	const target = seeker(ns);
    const exa = "exa_mk1.js";
    let i = 0;

    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (i < ns.getPurchasedServerLimit()) {
        
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {

            let hostname = ns.purchaseServer("pserv-" + i, ram);
            ns.scp(exa, hostname);
            ns.exec(exa, hostname, 6, target);
            ++i;
        }
        //Make the script wait for a second before looping again.
        //Removing this line will cause an infinite loop and crash the game.
        await ns.sleep(1000);
    }

}
