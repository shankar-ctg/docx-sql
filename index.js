const mammoth = require('mammoth');
const fs = require('fs');

// Word ফাইল থেকে টেক্সট এক্সট্রাক্ট করা
mammoth.extractRawText({path: "file.docx"})
    .then(function(result) {
        const text = result.value; // টেক্সট এক্সট্রাক্ট করা হলো
        // SQL ফর্ম্যাটে কনভার্ট করা
        const sqlInsertQuery = convertTextToSQL(text);
        // SQL ফাইল সেভ করা
        fs.writeFileSync("output.sql", sqlInsertQuery);
    })
    .catch(function(err) {
        console.log(err);
    });

// টেক্সট থেকে SQL ইনসার্ট স্টেটমেন্ট তৈরী করা
function convertTextToSQL(text) {
    const rows = text.split("\n"); // প্রতি লাইনের জন্য আলাদা করা
    let sql = "INSERT INTO your_table_name (column1, column2) VALUES ";
    const values = rows.map(row => {
        const columns = row.split("\t"); // ধরে নেওয়া হয়েছে যে, প্রতি কলামের ডাটা ট্যাব দিয়ে আলাদা করা
        return `('${columns[0]}', '${columns[1]}')`;
    }).join(", ");
    sql += values + ";";
    return sql;
}
