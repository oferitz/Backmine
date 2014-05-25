{TabModel} = require '../model/TabModel'

exports.TabsCollection = class TabsCollection extends Backbone.Collection

  url: '../src/json/tabs.json'

  model: TabModel

  getTabContent: (id)=>
    return @.at(id)

  setActiveTab: (id)=>
    @.each (model)=>
      model.set 'active', no

    @.at(id).set('active', yes)