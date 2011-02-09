var db = function() {
    this.filename = null;

    function open() {
        // Initialize database access
        var emailAddress = gslayer.state.emailAddress();
        var parts = emailAddress.split('@');
        this.filename = /@gmail\.com$/.test(emailAddress) ?
                emailAddress + '-GoogleMail' :
                emailAddress + '-GoogleMail@' + parts[parts.length -1];

        var database = google.gears.factory.create('beta.database');
        database.open(this.filename);

        return database;
    }
    function close(database) {
        database.close();
    }
    return {
        executeSql: function(query) {
            var database = null;

            try {
                database = open();

                var resultSet = [];
                var rs = database.execute(query);

                while (rs.isValidRow()) {
                    var obj = [];
                    var count = rs.fieldCount();

                    if (count == 1) {
                        // Use this for count, sum, etc queries
                        obj = rs.field(0);
                    }
                    else {
                        for (var i = 0; i < rs.fieldCount(); i++) {
                            var fieldName = rs.fieldName(i);

                            obj[rs.fieldName(i)] = rs.field(i);
                        }
                    }

                    resultSet.push(obj);
                    rs.next();
                }

                return resultSet;
            }
            catch (error) {
                logger.error(error);
            }
            finally {
                if (database != null)
                    close(database);
            }
        }
    }
}();