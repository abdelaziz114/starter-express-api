const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('/workspaces/starter-express-api/src/DB/test.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err);
});


sql = "alter table plats add COLUMN name varchar(256)";
db.run(sql)


/*
db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
    });
});

*/