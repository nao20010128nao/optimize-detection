const chash = require("create-hash");

function sha256(blob) {
    return new Promise((resolve, reject) => {
        try {
            resolve(chash("sha256").update(blob).digest("hex"));
        } catch (e) {
            reject(e);
        }
    });
}

function fileList() {
    return fetch("checksums.txt")
        .then(x => x.text())
        .then(x => x.split("\n").filter(x => x))
        .then(x => x.map(y => y.split("  ")).map(y => ({ "hash": y[0], "file": y[1] })));
}

module.exports = { sha256, fileList };
