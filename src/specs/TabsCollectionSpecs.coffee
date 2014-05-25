{TabsCollection} = require '../js/collection/TabsCollection'
{TabModel} = require '../js/model/TabModel'

describe 'Tabs Demo Collection Specs', ->
  tabsCollection = null
  mockData = null
  beforeEach ->
    mockData = getJSONFixture 'tabsDemo.json'
    tabsCollection = new TabsCollection(mockData)


  afterEach ->
    mockData = null
    tabsCollection = null

  describe 'has the correct initial values', ->


    it 'has the correct model', ->
      expect(tabsCollection.models[0] instanceof tabsCollection.model).toBeTruthy()


  describe 'methods', ->
    it 'should be able to get tab content', ->
      id = 1
      # check results
      actual = tabsCollection.getTabContent(id)
      expect(actual instanceof TabModel).toBeTruthy()
      expect(actual.get 'name').toBeDefined()
      expect(actual.get 'logo').toBeDefined()
      expect(actual.get 'details').toBeDefined()

      # make sure the function has been called with expected argument value
      spy = spyOn(tabsCollection, 'getTabContent')
      tabsCollection.getTabContent(id)
      expect(spy).toHaveBeenCalledWith id
      # make 2 more calls
      tabsCollection.getTabContent(0)
      tabsCollection.getTabContent(2)
      # make sure we have the correct total number of calls (good for checking duplicate events calls)
      expect(spy.calls.count()).toEqual 3
      # make sure the args for each call are correct
      expect(spy.calls.argsFor(0)).toEqual [1]
      expect(spy.calls.argsFor(1)).toEqual [0]
      expect(spy.calls.argsFor(2)).toEqual [2]
      # make sure the context (the "this") is correct
      expect(spy.calls.all()[0].object instanceof TabsCollection).toBeTruthy()
      expect(spy.calls.all()[1].object instanceof TabsCollection).toBeTruthy()
      expect(spy.calls.all()[2].object instanceof TabsCollection).toBeTruthy()


    it 'should be able to set active tab', ->
      id = 1
      # check results
      spy = spyOn(tabsCollection, 'setActiveTab').and.callThrough()
      tabsCollection.setActiveTab(id)
      expect(tabsCollection.at(0).get 'active').toBeFalsy()
      expect(tabsCollection.at(1).get 'active').toBeTruthy()
      expect(tabsCollection.at(2).get 'active').toBeFalsy()
      tabsCollection.setActiveTab(0)
      expect(tabsCollection.at(0).get 'active').toBeTruthy()
      expect(tabsCollection.at(1).get 'active').toBeFalsy()
      expect(tabsCollection.at(2).get 'active').toBeFalsy()
      tabsCollection.setActiveTab(2)
      expect(tabsCollection.at(0).get 'active').toBeFalsy()
      expect(tabsCollection.at(1).get 'active').toBeFalsy()
      expect(tabsCollection.at(2).get 'active').toBeTruthy()


      # make sure the function has been called with expected argument value
      expect(spy).toHaveBeenCalledWith id

      # make sure we have the correct total number of calls (good for checking duplicate events calls)
      expect(spy.calls.count()).toEqual 3
      # make sure the args for each call are correct
      expect(spy.calls.argsFor(0)).toEqual [1]
      expect(spy.calls.argsFor(1)).toEqual [0]
      expect(spy.calls.argsFor(2)).toEqual [2]
      # make sure the context (the "this") is correct
      expect(spy.calls.all()[0].object instanceof TabsCollection).toBeTruthy()
      expect(spy.calls.all()[1].object instanceof TabsCollection).toBeTruthy()
      expect(spy.calls.all()[2].object instanceof TabsCollection).toBeTruthy()



