/** @param {NS} ns */
export async function main(ns) {
	ns.tail();
	const target = "joesguns";

	ns.nuke(target);
	ns.scp("exa_mk1.js",target);
	ns.exec("exa_mk1.js",target,6,"joesguns");

}
