module.exports = {
    snapshotToArray: snapshotToArray,
}

function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
        var item = JSON.parse(childSnapshot.val());
        item.key = childSnapshot.key;
        console.log(item.key);
        returnArr.push(item);
    });

    return returnArr;
};