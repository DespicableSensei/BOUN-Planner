let fs = require("fs");
let all = fs.readFileSync("1819-1.json",{encoding: "UTF-8"});
all = JSON.parse(all);

all.filter(d => d["Code.Sec"] !== "");
all.map(d => {
    delete d["Desc."]
    delete d["Sl."]
    delete d["Required for Dept.(*)"]
    delete d["Departments"]
    delete d["Exam"]
    d.Timestring = d["Days"] + d["Hours"];
    d.Code_Sec = d["Code.Sec"];
    d.Credits = d["Cr."];
    delete d["Code.Sec"]
    delete d["Cr."]
    return d
});

all.map(item => {
    let numberIndex = item["Code_Sec"].match(/\d/);
    let dotIndex = item["Code_Sec"].indexOf('.');
    let returnObject = {dep: item["Code_Sec"].slice(0,numberIndex-1),code: item["Code_Sec"].slice(numberIndex-1,dotIndex), section: item["Code_Sec"].slice(dotIndex+1)}
    item['expobj'] = returnObject;
    return item;
});

all = JSON.stringify(all);
fs.writeFileSync("1819-1c.json",all);