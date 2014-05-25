{TabModel} = require '../js/model/TabModel'

describe 'Tab Demo Model Specs', ->
  tabModel = null
  mockData = null
  beforeEach ->
    tabModel = new TabModel()
    mockData = getJSONFixture 'tabsDemo.json'

  afterEach ->
    tabModel = null

  it 'should parse correctly', ->
    parsed = tabModel.parse(mockData[0])
    expect(parsed).toBeDefined()
    expect(_.isObject parsed).toBeTruthy()
    keys = Object.keys(parsed)
    expect(keys.length).toEqual 3
    expect(_.difference(keys, ['name','logo', 'details']).length).toEqual 0


