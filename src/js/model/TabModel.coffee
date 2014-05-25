exports.TabModel = class TabModel extends Backbone.Model

  defaults:
    name: null
    logo: null
    details: null
    active: no

  parse: (item)=>
    parsedItem = {}
    parsedItem.name = item.name
    parsedItem.logo = item.logo
    parsedItem.details = _.omit item, 'name', 'logo'
    return parsedItem