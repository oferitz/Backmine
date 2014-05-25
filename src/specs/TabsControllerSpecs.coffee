{TabsController} = require '../js/controller/TabsController'
{TabsCollection} = require '../js/collection/TabsCollection'

describe 'Tabs Controller Specs', ->

  mockResponse = null
  controller = null
  fixture = null

  beforeEach ->
    fixture = $('#html-fixtures')
    mockResponse = JSON.stringify getJSONFixture 'tabsDemo.json'

  afterEach ->
    fixture.empty()
    mockResponse = null

  it 'create the view after successful fetch', ->
    ajaxSpy = spyOn(Backbone, 'sync').and.callFake (type,context,response)->
      response.success(mockResponse)

    controller = new TabsController()
    expect(ajaxSpy).toHaveBeenCalled()
    expect(ajaxSpy.calls.mostRecent().object instanceof TabsCollection).toBeTruthy()
    expect(controller.tabsDemoView).toBeDefined()
    expect(controller.tabsDemoView).not.toBeNull()





