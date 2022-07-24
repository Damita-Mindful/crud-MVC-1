module.exports = {
    obtain:function (connection, funcion) {
        connection.query("SELECT * FROM books", funcion);
    }, 
    insert:function (connection, data, files, funcion) {
        connection.query("INSERT INTO books ( name, img ) VALUES (?,?)", [data.name, files.filename])
    },
    returnDataId: function (connection, id, funcion) {
        connection.query("SELECT * FROM books WHERE id=?", [id], funcion)
    }, 
    erase: function(connection, id, funcion) {
        connection.query("DELETE FROM books WHERE id=?", [id], funcion)
    }, 
    update: function(connection, data, funcion) {
        connection.query("UPDATE books SET name=? WHERE id=?", [data.name, data.id], funcion)
    },
    updateFile: function(connection, data, file, funcion) {
        connection.query("UPDATE books SET img=? WHERE id=?", [file.filename, data.id], funcion)
    }
}