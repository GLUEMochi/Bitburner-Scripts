/** @param {NS} ns */
export function spider(ns) {
    // +1 to tools for each new kind of port we can open. 
    // This is just to keep from having to write the same script 5 times.
    let tools = 1
    if (ns.fileExists("BruteSSH.exe", "home")) { tools = tools + 1; }
    if (ns.fileExists("FTPCrack.exe", "home")) { tools = tools + 1; }
    if (ns.fileExists("replaySMTP.exe", "home")) { tools = tools + 1; }
    if (ns.fileExists("HTTPWorm.exe", "home")) { tools = tools + 1; }
    if (ns.fileExists("SQLInject.exe", "home")) { tools = tools + 1; }

    // Populate list of all servers
    let serversSeen = ['home']
    for (let i = 0; i < serversSeen.length; i++) {
        let thisScan = ns.scan(serversSeen[i]);
        for (let j = 0; j < thisScan.length; j++) {
            if (serversSeen.indexOf(thisScan[j]) === -1) {
                serversSeen.push(thisScan[j]);
            }
        }
    }
    let servers = serversSeen.toString();
    ns.write("allServers.txt", servers, "w");

    //Split list into separate lists for each number of ports required
    for (let i = 0; i < 6; i++) {
        let serverPorts = [];
        for (let j = 0; j < serversSeen.length; j++) {
            if (ns.getServerNumPortsRequired(serversSeen[j]) == i) {
                serverPorts.push(serversSeen[j]);
            }
        }
        let ports = serverPorts.toString();
        ns.write("Servers_Ports_" + i + ".txt", ports, "w");
    }

    //Populate list of my own purchased servers
    let backbrain = ns.getPurchasedServers().tostring;
    ns.write("purchasedServers.txt", backbrain, "w");

    //Get list of hacked servers
    //Fix this shit to work for my own servers or something, it currently does fuck all
    let hacked = [];
    for (let i = 0; i < serversSeen.length; i++) {
        if (ns.hasRootAccess(serversSeen[i]) == true) {
            hacked.push(serversSeen[i]);
        }
    }

    //Get list of hackable servers.
    let hackable = [];
    let hackLvl = ns.getHackingLevel();

    for (let i = 0; i < tools; i++) {
        ns.print("finding servers with " + i + " ports.")
        let port = ns.read("Servers_Ports_" + i + ".txt");
        let listPort = port.split(",")
        for (let i = 0; i < listPort.length; i++) {
            const serv = listPort[i];
            if (ns.getServerRequiredHackingLevel(serv) <= hackLvl) {
                hackable.push(listPort[i]);
            }
        }
    }

    let hackableList = hackable.toString();
    ns.write("hackableServers.txt", hackableList, "w");


}
export async function main(ns) { }
