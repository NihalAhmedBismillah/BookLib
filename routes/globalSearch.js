const globalSearch = require("../controller/globalSearch");

module.exports = (app) => {

    app.route('/api/v1/globalsearchtext')
        .get(globalSearch.getGlobalSearchResult)
    app.route('/api/v1/globalsearchautotext')
        .get(globalSearch.getGlobalSearchAutoComplete)
    app.route('/api/v1/globalsearchpostcodeaddress')
        .get(globalSearch.getAddressPostCodeSearchAutoComplete)
    app.route('/api/v1/globalsearchaddresswithquery')
        .get(globalSearch.getAddressWithQuery)
    app.route('/api/v1/globalsearchaddress')
        .get(globalSearch.getAddressAutoComplete)

}