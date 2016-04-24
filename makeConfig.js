var fs = require('fs');

json = [[0, '036'], [0, '038'], [0, '043'], [0, '050'], [0, '042'], [0, '046'], [0, '039'], [0, '049']];
json = JSON.stringify(json);

fs.writeFile('./midiConfig.json', json, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('success');
  }
});
