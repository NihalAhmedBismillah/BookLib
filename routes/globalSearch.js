const globalSearch = require("../controller/globalSearch");

module.exports = (app) => {
    
    app.route('/api/v1/globalsearchtext')
        .get(globalSearch.getGlobalSearchResult)
    app.route('/api/v1/globalsearchautotext')
        .get(globalSearch.getGlobalSearchAutoComplete)

}