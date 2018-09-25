var sq = require('sqlite3');
sq.verbose();

const tbl_exclude = ['SequelizeMeta', 'sqlite_sequence'];

var db = new sq.Database(__dirname + '/../config/comics.sqlite');

const sqlite2ts = {
    'VARCHAR(255)': 'string',
    'TEXT': 'string',
    'INTEGER': 'number',
    'DATETIME': 'Date',
    'JSON': 'Object'
}

nbTable = 0;

db.each(`select * from sqlite_master where type = 'table'`, function(err, row) {

    if (err) {
        console.error(err);
    } else {
        if (!tbl_exclude.includes(row.tbl_name)) {

            model[row.tbl_name] = [];


            push2model(row.tbl_name, `// begin of definition  ${row.tbl_name} {`)
            push2model(row.tbl_name, `export interface ${row.tbl_name} {`)
            db.each(`PRAGMA table_info(${row.tbl_name})`, (err, tbl_info) => {

                push2model(row.tbl_name, `   ${tbl_info.name}  : ${sqlite2ts[tbl_info.type]};`);
            }, (err) => {
                push2model(row.tbl_name, `} // end of definition ${row.tbl_name}`);
                nbTable--;
                console.log(`table restante : ${nbTable}`);
                if (nbTable == 0) {
                    save();
                }
            });
            //push2model(row.tbl_name, row.tbl_name);
        } else {
            nbTable -= 1;
        }
    }
}, (err, count) => {
    nbTable += count;
    console.log(nbTable);
});

var model = {};

function push2model(tbl, line) {
    if (!model.hasOwnProperty(tbl)) {
        model[tbl] = [];
    }
    model[tbl].push(line);

}

function save() {
    for (tbl in model) {
        for (line of model[tbl]) {
            console.log(line);
        }
    }
}