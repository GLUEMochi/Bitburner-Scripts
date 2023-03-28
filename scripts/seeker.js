/** @param {NS} ns */
export function seeker(ns) {
	//Find the best hacking target
	let hackThresh = ns.getHackingLevel() / 2;
	let candidates = ns.read("hackableServers.txt").split(",");
	let shortlist = [];

	for (let i = 0; i < candidates.length; i++) {
		let candidate = candidates[i];
		if (ns.getServerRequiredHackingLevel(candidate) <= hackThresh) {
			shortlist.push(candidate);
		}
	}
	shortlist.sort(function(a, b){
		if(ns.getServerMaxMoney(a) > ns.getServerMaxMoney(b)) return 1;   
		if(ns.getServerMaxMoney(a) < ns.getServerMaxMoney(b)) return -1;
		return 0;
		});
	let bestTarget = shortlist.pop();
	return bestTarget;
	
}
export async function main(ns) { }
