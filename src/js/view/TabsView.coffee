exports.TabsView = class TabsView extends Backbone.View

  tabsCollection: null
  element: null
  className: 'tabs-demo-class'

  events:
    'click .tabs-list li': '_onTabSelect'

  initialize: (element,options)=>
    @tabsCollection  =  options.tabsCollection
    @element = element
    @listenTo @tabsCollection, 'change:active', @_setActiveTab
    @render()

  render: =>
    @$el.html template()
    @element.append @$el
    @renderTabs()


  renderTabs: =>
    console.log @tabsCollection
    if @tabsCollection.length
      @tabsCollection.each (model, i)=>
        @$('.tabs-list').append(tabItemTemplate(model,i))
    else
      @noData()


  _onTabSelect: (e)=>
    id = $(e.currentTarget).attr('data-id')
    @tabsCollection.setActiveTab id
    @_getTabContent id


  _getTabContent: (id)=>
    content = @tabsCollection.getTabContent id
    @$('.tab-content').html(tabContentTemplate(content))

  _setActiveTab: (model)=>
    @$('.tabs-list li').removeClass('active')
    @$('.tabs-list li').eq(@tabsCollection.indexOf(model)).addClass('active')

  noData: =>
    @$('.tabs-list').append(noDataTemplate())

template = ->
  """
  <h1>Tabs Demo View</h1>
  <div class="row">
    <div class="col-md-3">
      <ul class="tabs-list"></ul>
    </div>
    <div class="col-md-9">
      <div class="tab-content"></div>
    </div>
  </div>
  """

tabItemTemplate = (model, i)->
  name = model.get 'name'
  """
  <li data-id="#{i}">#{name}</li>
  """

tabContentTemplate = (content)->
  details = content.get 'details'
  """
  <div class="row">
    <div class="col-md-3">
    <img class="logo" src="#{content.get 'logo'}" />
    </div>
    <div class="col-md-5">
      <p class="description">#{details.description}</p>
    </div>
    <div class="col-md-4">
      <aside>
        <p><i>Developer:</i> #{details.developer}</p>
        <p><i>Initial release:</i> #{details.initial_release}</p>
        <p><i>Stable release:</i> #{details.stable_release}</p>
        <p><i>Status:</i> #{details.status}</p>
        <p><i>Written in:</i> #{details.written_in}</p>
        <p><i>Operating system:</i> #{details.operating_system}</p>
        <p>
          <i>Size:</i>
          <p class="inner">development: #{details.size.development}</p>
          <p class="inner">production: #{details.size.production}</p>
        </p>
        <p><i>Type:</i> #{details.type}</p>
        <p><i>License:</i> #{details.license}</p>
        <p class="website"><i>Website:</i> <a href="#{details.website}">#{details.website}</a></p>
      </aside>
    </div>
  </div>
  """

noDataTemplate = ->
  """
  <h4>Nothing to show</h4>
  """