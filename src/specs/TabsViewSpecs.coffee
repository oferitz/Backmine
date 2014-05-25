{TabsView} = require '../js/view/TabsView'
{TabsCollection} =  require '../js/collection/TabsCollection'

describe 'Tabs Demo View Specs', ->
  tabsCollection = null
  mockData = null
  fixture = null


  beforeEach ->
    mockData = getJSONFixture 'tabsDemoParsed.json'
    tabsCollection = new TabsCollection(mockData)
    fixture = $('#html-fixtures')

  afterEach ->
    tabsCollection = null
    fixture.empty()


  describe 'When creating new view', ->
    it 'should have DOM elements', ->
      view = new TabsView(fixture, tabsCollection: tabsCollection)
      expect(view.$el).toBeDefined()


    it 'should call render tabs', ->
      view = new TabsView(fixture, tabsCollection: tabsCollection)
      spy = spyOn(view, 'renderTabs')
      view.render()
      expect(spy).toHaveBeenCalled()


    it 'should render tabs correctly', ->
      view = new TabsView(fixture, tabsCollection: tabsCollection)
      expect(view.$el.find('.tabs-list li').length).toEqual tabsCollection.length

      view.$el.find('.tabs-list li').each (i)->
        $li = $(this)
        expect($li.data('id')).toBe i
        expect($li).toContainText tabsCollection.at(i).get('name')

    it 'should support no data', ->
      view = new TabsView(fixture, tabsCollection: new Backbone.Collection)
      spy = spyOn(view, 'noData')
      view.render()
      expect(spy).toHaveBeenCalled()


  describe 'Selecting tab', ->

    it '_onTabSelect should call tabsCollection.setActiveTab with correct id', ->
      view = new TabsView(fixture, tabsCollection: tabsCollection)

      tab0 = view.$el.find('.tabs-list li').eq(0)
      tab1 = view.$el.find('.tabs-list li').eq(1)
      tab2 = view.$el.find('.tabs-list li').eq(2)

      spy = spyOn(tabsCollection, 'setActiveTab')
      tab0.click()
      # make 2 more calls
      tab1.click()
      tab2.click()
      # make sure we have the correct total number of calls (good for checking duplicate events calls)
      expect(spy.calls.count()).toEqual 3
      # make sure the args for each call are correct
      expect(spy.calls.argsFor(0)).toEqual ['0']
      expect(spy.calls.argsFor(1)).toEqual ['1']
      expect(spy.calls.argsFor(2)).toEqual ['2']


    it '_onTabSelect should call _getTabContent with correct id', ->
      view = new TabsView(fixture, tabsCollection: tabsCollection)

      tab0 = view.$el.find('.tabs-list li').eq(0)
      tab1 = view.$el.find('.tabs-list li').eq(1)
      tab2 = view.$el.find('.tabs-list li').eq(2)

      spy = spyOn(view, '_getTabContent')
      tab0.click()
      tab1.click()
      tab2.click()
      # make sure we have the correct total number of calls (good for checking duplicate events calls)
      expect(spy.calls.count()).toEqual 3
      # make sure the args for each call are correct
      expect(spy.calls.argsFor(0)).toEqual ['0']
      expect(spy.calls.argsFor(1)).toEqual ['1']
      expect(spy.calls.argsFor(2)).toEqual ['2']



  describe 'getting tab content', ->
    it 'should render the selected tab content', ->
      view = new TabsView(fixture, tabsCollection: tabsCollection)
      prevContent = view.$el.find('p.website a').text()
      view._getTabContent 0
      currentContent = view.$el.find('p.website a').text()
      expect(currentContent).not.toEqual prevContent
      expect(currentContent).toEqual tabsCollection.at(0).get('details').website
      prevContent = currentContent

      view._getTabContent 1
      currentContent = view.$el.find('p.website a').text()
      expect(currentContent).not.toEqual prevContent
      expect(currentContent).toEqual tabsCollection.at(1).get('details').website


  describe 'setting active tab', ->
    it 'should set correctly the active tab', ->
      index = 1
      view = new TabsView(fixture, tabsCollection: tabsCollection)
      model = tabsCollection.at(index)
      view._setActiveTab model
      elm = view.$el.find('.tabs-list li').eq(index)
      expect(elm.siblings()).not.toHaveClass('active')
      expect(elm).toHaveClass('active')