{TabsView} = require '../view/TabsView'
{TabsCollection} = require '../collection/TabsCollection'

exports.TabsController = class TabsController extends Backbone.View


  initialize: =>
    @$el = $('.app-container')
    @$el.append template()
    tabsCollection = new TabsCollection()
    tabsCollection.fetch
      success: =>
        @tabsDemoView = new TabsView(@$('.tabs-container'), {tabsCollection: tabsCollection})

template = ->
  """
  <div class="tabs-container"></div>
  """