require('dotenv').config();
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);


base('tasks').create({
  "Task": "case study of Project",
  "Importance": "High",
  "State": "next week",
  "Deadline": "2019-01-02T12:55:00.000Z",
  "Project": [
    "reckytrVM9slfFUyB"
  ]
}, function(err, record) {
    if (err) { console.error(err); return; }
    console.log(record.getId());
});


base('tasks').create({
  "Task": "tests from flick scripts",
  "Importance": "Low"
}, function(err, record) {
    if (err) { console.error(err); return; }
    console.log(record.getId());
});
