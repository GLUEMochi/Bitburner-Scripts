/** @param {NS} ns */
export function spider(ns) {
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

    //Get list of accessible servers
    let hacked = [];
    for (let i = 0; i < serversSeen.length; i++) {
        if (ns.hasRootAccess(serversSeen[i]) == true) {
            hacked.push(serversSeen[i]);
        }
    }

    let hackedList = hacked.toString();
    ns.write("hackedServers.txt", hackedList, "w");

    //Get list of hackable servers.
    let hackable = [];
    let hackLvl = ns.getHackingLevel();

    let port0 = ns.read("Servers_Ports_0.txt");
    let listPort0 = port0.split(",");

    for (let i = 0; i < listPort0.length; i++) {
        const serv = listPort0[i];
        if (ns.getServerRequiredHackingLevel(serv) <= hackLvl) {
            hackable.push(listPort0[i]);
        }

    }

    if (ns.fileExists("bruteSSH.exe", "home")) {

        let port1 = ns.read("Servers_Ports_1.txt");
        let listPort1 = port1.split(",")

        for (let i = 0; i < listPort1.length; i++) {
            const serv = listPort1[i];
            if (ns.getServerRequiredHackingLevel(serv) <= hackLvl) {
                hackable.push(listPort1[i]);
            }
        }
    }
    
    let hackableList = hackable.toString();
    ns.write("hackableServers.txt", hackableList, "w");


}
export async function main(ns) { }
