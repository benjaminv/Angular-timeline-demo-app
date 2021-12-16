/* split.js demo */

var split = Split(['#flex-1', '#flex-2'], {
    elementStyle: function (dimension, size, gutterSize) {
        return {
            'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)',
        }
    },
    gutterStyle: function (dimension, gutterSize) {
        return {
            'flex-basis': gutterSize + 'px',
        }
    },
})



/* vis-timeline demo */

var sdt = [{
    "group3": [
        {
        id: 1243,
        treeLevel: 3,
        content: "Level 3 1243"
    }, {
        id: 1525,
        treeLevel: 3,
        content: "Level 3 1525"
    }, {
        id: 1624,
        treeLevel: 3,
        content: "Level 3 1624"
    }, {
        id: 2076,
        treeLevel: 3,
        content: "Level 3 2076"
    }, {
        id: 1345,
        treeLevel: 3,
        content: "Level 3 1345"
    }, {
        id: 2078,
        treeLevel: 3,
        content: "Level 3 2078"
    }, {
        id: 1826,
        treeLevel: 3,
        content: "Level 3 1826"
    }, {
        id: 2107,
        treeLevel: 3,
        content: "Level 3 2107"
    }],
    "groups": [{
        id: 10,
        title: "Group 10",
        content: "Group 10",
        treeLevel: 1,
        nestedGroups: [1, 2, 3, 4, 5, 6]
    }, {
        id: 1,
        content: "North America",
        treeLevel: 2,
        nestedGroups: [1243, 1525, 1624, 1345, 2078, 1826, 2076, 2107]
    }, {
        id: 2,
        treeLevel: 2,
        content: "Latin America"
    }, {
        id: 3,
        treeLevel: 2,
        content: "Europe"
    }, {
        id: 4,
        treeLevel: 2,
        content: "Asia"
    }, {
        id: 5,
        treeLevel: 2,
        content: "Oceania"
    }, {
        id: 6,
        treeLevel: 2,
        content: "Africa"
    }, {
        id: 100,
        title: "Group 100",
        content: "Group 100",
        treeLevel: 1,
        nestedGroups: [101, 102, 103, 104, 105, 106],
        "text": "Totals",
        "EditionId": 0,
        "groupId": 0
    }, {
        id: 101,
        treeLevel: 2,
        content: "North America"
    }, {
        id: 102,
        treeLevel: 2,
        content: "Latin America"
    }, {
        id: 103,
        treeLevel: 2,
        content: "Europe"
    }, {
        id: 104,
        treeLevel: 2,
        content: "Asia"
    }, {
        id: 105,
        treeLevel: 2,
        content: "Oceania"
    }, {
        id: 106,
        treeLevel: 2,
        content: "Africa"
    }],
}];

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let startDay = moment().startOf("month").startOf("week").isoWeekday(1);

// DOM element where the Timeline will be attached
var container = document.getElementById('timeline-master');

// Create a DataSet (allows two way data-binding)
//var items = new vis.DataSet(data.result);

var now = moment().minutes(0).seconds(0).milliseconds(0);
var itemCount = 60;

// create a data set with groups
var groups = new vis.DataSet();

groups.add(sdt[0].groups);
groups.add(sdt[0].group3);

// create a dataset with items
var items = new vis.DataSet();
var groupIds = groups.getIds();
var types = ['box', 'point', 'range', 'background']
for (var i = 0; i < itemCount; i++) {
    var rInt = randomIntFromInterval(1, 30);
    var start = startDay.clone().add(rInt, 'days');
    var end = start.clone().add(24, 'hours');
    var randomGroupId = groupIds[randomIntFromInterval(1, groupIds.length)];
    var type = types[randomIntFromInterval(0, 3)]

    items.add({
        id: i,
        group: randomGroupId,
        content: 'item ' + i + ' ' + rInt,
        start: start,
        end: end,
        type: type
    });
}

// specify options
let options = {
    start: startDay.toDate(),
    end: new Date(1000 * 60 * 60 * 24 + (new Date()).valueOf()),
    horizontalScroll: true,
    zoomKey: 'ctrlKey',
    orientation: 'both',
    zoomMin: 1000 * 60 * 60 * 240
};

// create a Timeline
var timeline = new vis.Timeline(container, items, groups, options);