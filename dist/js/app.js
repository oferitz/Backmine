;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TabsController;

TabsController = require('./controller/TabsController').TabsController;

(function() {
  Backbone.$ = $;
  return new TabsController();
})();

},{"./controller/TabsController":3}],2:[function(require,module,exports){
var TabModel, TabsCollection, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TabModel = require('../model/TabModel').TabModel;

exports.TabsCollection = TabsCollection = (function(_super) {
  __extends(TabsCollection, _super);

  function TabsCollection() {
    this.setActiveTab = __bind(this.setActiveTab, this);
    this.getTabContent = __bind(this.getTabContent, this);
    _ref = TabsCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TabsCollection.prototype.url = '../src/json/tabs.json';

  TabsCollection.prototype.model = TabModel;

  TabsCollection.prototype.getTabContent = function(id) {
    return this.at(id);
  };

  TabsCollection.prototype.setActiveTab = function(id) {
    var _this = this;
    this.each(function(model) {
      return model.set('active', false);
    });
    return this.at(id).set('active', true);
  };

  return TabsCollection;

})(Backbone.Collection);

},{"../model/TabModel":4}],3:[function(require,module,exports){
var TabsCollection, TabsController, TabsView, template, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TabsView = require('../view/TabsView').TabsView;

TabsCollection = require('../collection/TabsCollection').TabsCollection;

exports.TabsController = TabsController = (function(_super) {
  __extends(TabsController, _super);

  function TabsController() {
    this.initialize = __bind(this.initialize, this);
    _ref = TabsController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TabsController.prototype.initialize = function() {
    var tabsCollection,
      _this = this;
    this.$el = $('.app-container');
    this.$el.append(template());
    tabsCollection = new TabsCollection();
    return tabsCollection.fetch({
      success: function() {
        return _this.tabsDemoView = new TabsView(_this.$('.tabs-container'), {
          tabsCollection: tabsCollection
        });
      }
    });
  };

  return TabsController;

})(Backbone.View);

template = function() {
  return "<div class=\"tabs-container\"></div>";
};

},{"../collection/TabsCollection":2,"../view/TabsView":5}],4:[function(require,module,exports){
var TabModel, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

exports.TabModel = TabModel = (function(_super) {
  __extends(TabModel, _super);

  function TabModel() {
    this.parse = __bind(this.parse, this);
    _ref = TabModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TabModel.prototype.defaults = {
    name: null,
    logo: null,
    details: null,
    active: false
  };

  TabModel.prototype.parse = function(item) {
    var parsedItem;
    parsedItem = {};
    parsedItem.name = item.name;
    parsedItem.logo = item.logo;
    parsedItem.details = _.omit(item, 'name', 'logo');
    return parsedItem;
  };

  return TabModel;

})(Backbone.Model);

},{}],5:[function(require,module,exports){
var TabsView, noDataTemplate, tabContentTemplate, tabItemTemplate, template, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

exports.TabsView = TabsView = (function(_super) {
  __extends(TabsView, _super);

  function TabsView() {
    this.noData = __bind(this.noData, this);
    this._setActiveTab = __bind(this._setActiveTab, this);
    this._getTabContent = __bind(this._getTabContent, this);
    this._onTabSelect = __bind(this._onTabSelect, this);
    this.renderTabs = __bind(this.renderTabs, this);
    this.render = __bind(this.render, this);
    this.initialize = __bind(this.initialize, this);
    _ref = TabsView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  TabsView.prototype.tabsCollection = null;

  TabsView.prototype.element = null;

  TabsView.prototype.className = 'tabs-demo-class';

  TabsView.prototype.events = {
    'click .tabs-list li': '_onTabSelect'
  };

  TabsView.prototype.initialize = function(element, options) {
    this.tabsCollection = options.tabsCollection;
    this.element = element;
    this.listenTo(this.tabsCollection, 'change:active', this._setActiveTab);
    return this.render();
  };

  TabsView.prototype.render = function() {
    this.$el.html(template());
    this.element.append(this.$el);
    return this.renderTabs();
  };

  TabsView.prototype.renderTabs = function() {
    var _this = this;
    console.log(this.tabsCollection);
    if (this.tabsCollection.length) {
      return this.tabsCollection.each(function(model, i) {
        return _this.$('.tabs-list').append(tabItemTemplate(model, i));
      });
    } else {
      return this.noData();
    }
  };

  TabsView.prototype._onTabSelect = function(e) {
    var id;
    id = $(e.currentTarget).attr('data-id');
    this.tabsCollection.setActiveTab(id);
    return this._getTabContent(id);
  };

  TabsView.prototype._getTabContent = function(id) {
    var content;
    content = this.tabsCollection.getTabContent(id);
    return this.$('.tab-content').html(tabContentTemplate(content));
  };

  TabsView.prototype._setActiveTab = function(model) {
    this.$('.tabs-list li').removeClass('active');
    return this.$('.tabs-list li').eq(this.tabsCollection.indexOf(model)).addClass('active');
  };

  TabsView.prototype.noData = function() {
    return this.$('.tabs-list').append(noDataTemplate());
  };

  return TabsView;

})(Backbone.View);

template = function() {
  return "<h1>Tabs Demo View</h1>\n<div class=\"row\">\n  <div class=\"col-md-3\">\n    <ul class=\"tabs-list\"></ul>\n  </div>\n  <div class=\"col-md-9\">\n    <div class=\"tab-content\"></div>\n  </div>\n</div>";
};

tabItemTemplate = function(model, i) {
  var name;
  name = model.get('name');
  return "<li data-id=\"" + i + "\">" + name + "</li>";
};

tabContentTemplate = function(content) {
  var details;
  details = content.get('details');
  return "<div class=\"row\">\n  <div class=\"col-md-3\">\n  <img class=\"logo\" src=\"" + (content.get('logo')) + "\" />\n  </div>\n  <div class=\"col-md-5\">\n    <p class=\"description\">" + details.description + "</p>\n  </div>\n  <div class=\"col-md-4\">\n    <aside>\n      <p><i>Developer:</i> " + details.developer + "</p>\n      <p><i>Initial release:</i> " + details.initial_release + "</p>\n      <p><i>Stable release:</i> " + details.stable_release + "</p>\n      <p><i>Status:</i> " + details.status + "</p>\n      <p><i>Written in:</i> " + details.written_in + "</p>\n      <p><i>Operating system:</i> " + details.operating_system + "</p>\n      <p>\n        <i>Size:</i>\n        <p class=\"inner\">development: " + details.size.development + "</p>\n        <p class=\"inner\">production: " + details.size.production + "</p>\n      </p>\n      <p><i>Type:</i> " + details.type + "</p>\n      <p><i>License:</i> " + details.license + "</p>\n      <p class=\"website\"><i>Website:</i> <a href=\"" + details.website + "\">" + details.website + "</a></p>\n    </aside>\n  </div>\n</div>";
};

noDataTemplate = function() {
  return "<h4>Nothing to show</h4>";
};

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOi9TQU5EQk9YL0pBU01JTkUvd2ViYXBwcy1mZWRzLXVuaXQtdGVzdHMtZXhhbXBsZS9idWlsZC9qcy9hcHAuanMiLCJDOi9TQU5EQk9YL0pBU01JTkUvd2ViYXBwcy1mZWRzLXVuaXQtdGVzdHMtZXhhbXBsZS9idWlsZC9qcy9jb2xsZWN0aW9uL1RhYnNDb2xsZWN0aW9uLmpzIiwiQzovU0FOREJPWC9KQVNNSU5FL3dlYmFwcHMtZmVkcy11bml0LXRlc3RzLWV4YW1wbGUvYnVpbGQvanMvY29udHJvbGxlci9UYWJzQ29udHJvbGxlci5qcyIsIkM6L1NBTkRCT1gvSkFTTUlORS93ZWJhcHBzLWZlZHMtdW5pdC10ZXN0cy1leGFtcGxlL2J1aWxkL2pzL21vZGVsL1RhYk1vZGVsLmpzIiwiQzovU0FOREJPWC9KQVNNSU5FL3dlYmFwcHMtZmVkcy11bml0LXRlc3RzLWV4YW1wbGUvYnVpbGQvanMvdmlldy9UYWJzVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbInZhciBUYWJzQ29udHJvbGxlcjtcblxuVGFic0NvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXIvVGFic0NvbnRyb2xsZXInKS5UYWJzQ29udHJvbGxlcjtcblxuKGZ1bmN0aW9uKCkge1xuICBCYWNrYm9uZS4kID0gJDtcbiAgcmV0dXJuIG5ldyBUYWJzQ29udHJvbGxlcigpO1xufSkoKTtcbiIsInZhciBUYWJNb2RlbCwgVGFic0NvbGxlY3Rpb24sIF9yZWYsXG4gIF9fYmluZCA9IGZ1bmN0aW9uKGZuLCBtZSl7IHJldHVybiBmdW5jdGlvbigpeyByZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyk7IH07IH0sXG4gIF9faGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICBfX2V4dGVuZHMgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKF9faGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfTtcblxuVGFiTW9kZWwgPSByZXF1aXJlKCcuLi9tb2RlbC9UYWJNb2RlbCcpLlRhYk1vZGVsO1xuXG5leHBvcnRzLlRhYnNDb2xsZWN0aW9uID0gVGFic0NvbGxlY3Rpb24gPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gIF9fZXh0ZW5kcyhUYWJzQ29sbGVjdGlvbiwgX3N1cGVyKTtcblxuICBmdW5jdGlvbiBUYWJzQ29sbGVjdGlvbigpIHtcbiAgICB0aGlzLnNldEFjdGl2ZVRhYiA9IF9fYmluZCh0aGlzLnNldEFjdGl2ZVRhYiwgdGhpcyk7XG4gICAgdGhpcy5nZXRUYWJDb250ZW50ID0gX19iaW5kKHRoaXMuZ2V0VGFiQ29udGVudCwgdGhpcyk7XG4gICAgX3JlZiA9IFRhYnNDb2xsZWN0aW9uLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBfcmVmO1xuICB9XG5cbiAgVGFic0NvbGxlY3Rpb24ucHJvdG90eXBlLnVybCA9ICcuLi9zcmMvanNvbi90YWJzLmpzb24nO1xuXG4gIFRhYnNDb2xsZWN0aW9uLnByb3RvdHlwZS5tb2RlbCA9IFRhYk1vZGVsO1xuXG4gIFRhYnNDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRUYWJDb250ZW50ID0gZnVuY3Rpb24oaWQpIHtcbiAgICByZXR1cm4gdGhpcy5hdChpZCk7XG4gIH07XG5cbiAgVGFic0NvbGxlY3Rpb24ucHJvdG90eXBlLnNldEFjdGl2ZVRhYiA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24obW9kZWwpIHtcbiAgICAgIHJldHVybiBtb2RlbC5zZXQoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5hdChpZCkuc2V0KCdhY3RpdmUnLCB0cnVlKTtcbiAgfTtcblxuICByZXR1cm4gVGFic0NvbGxlY3Rpb247XG5cbn0pKEJhY2tib25lLkNvbGxlY3Rpb24pO1xuIiwidmFyIFRhYnNDb2xsZWN0aW9uLCBUYWJzQ29udHJvbGxlciwgVGFic1ZpZXcsIHRlbXBsYXRlLCBfcmVmLFxuICBfX2JpbmQgPSBmdW5jdGlvbihmbiwgbWUpeyByZXR1cm4gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9OyB9LFxuICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgX19leHRlbmRzID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChfX2hhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH07XG5cblRhYnNWaWV3ID0gcmVxdWlyZSgnLi4vdmlldy9UYWJzVmlldycpLlRhYnNWaWV3O1xuXG5UYWJzQ29sbGVjdGlvbiA9IHJlcXVpcmUoJy4uL2NvbGxlY3Rpb24vVGFic0NvbGxlY3Rpb24nKS5UYWJzQ29sbGVjdGlvbjtcblxuZXhwb3J0cy5UYWJzQ29udHJvbGxlciA9IFRhYnNDb250cm9sbGVyID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICBfX2V4dGVuZHMoVGFic0NvbnRyb2xsZXIsIF9zdXBlcik7XG5cbiAgZnVuY3Rpb24gVGFic0NvbnRyb2xsZXIoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplID0gX19iaW5kKHRoaXMuaW5pdGlhbGl6ZSwgdGhpcyk7XG4gICAgX3JlZiA9IFRhYnNDb250cm9sbGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBfcmVmO1xuICB9XG5cbiAgVGFic0NvbnRyb2xsZXIucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGFic0NvbGxlY3Rpb24sXG4gICAgICBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy4kZWwgPSAkKCcuYXBwLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuJGVsLmFwcGVuZCh0ZW1wbGF0ZSgpKTtcbiAgICB0YWJzQ29sbGVjdGlvbiA9IG5ldyBUYWJzQ29sbGVjdGlvbigpO1xuICAgIHJldHVybiB0YWJzQ29sbGVjdGlvbi5mZXRjaCh7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnRhYnNEZW1vVmlldyA9IG5ldyBUYWJzVmlldyhfdGhpcy4kKCcudGFicy1jb250YWluZXInKSwge1xuICAgICAgICAgIHRhYnNDb2xsZWN0aW9uOiB0YWJzQ29sbGVjdGlvblxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gVGFic0NvbnRyb2xsZXI7XG5cbn0pKEJhY2tib25lLlZpZXcpO1xuXG50ZW1wbGF0ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJ0YWJzLWNvbnRhaW5lclxcXCI+PC9kaXY+XCI7XG59O1xuIiwidmFyIFRhYk1vZGVsLCBfcmVmLFxuICBfX2JpbmQgPSBmdW5jdGlvbihmbiwgbWUpeyByZXR1cm4gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9OyB9LFxuICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgX19leHRlbmRzID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChfX2hhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH07XG5cbmV4cG9ydHMuVGFiTW9kZWwgPSBUYWJNb2RlbCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgX19leHRlbmRzKFRhYk1vZGVsLCBfc3VwZXIpO1xuXG4gIGZ1bmN0aW9uIFRhYk1vZGVsKCkge1xuICAgIHRoaXMucGFyc2UgPSBfX2JpbmQodGhpcy5wYXJzZSwgdGhpcyk7XG4gICAgX3JlZiA9IFRhYk1vZGVsLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBfcmVmO1xuICB9XG5cbiAgVGFiTW9kZWwucHJvdG90eXBlLmRlZmF1bHRzID0ge1xuICAgIG5hbWU6IG51bGwsXG4gICAgbG9nbzogbnVsbCxcbiAgICBkZXRhaWxzOiBudWxsLFxuICAgIGFjdGl2ZTogZmFsc2VcbiAgfTtcblxuICBUYWJNb2RlbC5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgdmFyIHBhcnNlZEl0ZW07XG4gICAgcGFyc2VkSXRlbSA9IHt9O1xuICAgIHBhcnNlZEl0ZW0ubmFtZSA9IGl0ZW0ubmFtZTtcbiAgICBwYXJzZWRJdGVtLmxvZ28gPSBpdGVtLmxvZ287XG4gICAgcGFyc2VkSXRlbS5kZXRhaWxzID0gXy5vbWl0KGl0ZW0sICduYW1lJywgJ2xvZ28nKTtcbiAgICByZXR1cm4gcGFyc2VkSXRlbTtcbiAgfTtcblxuICByZXR1cm4gVGFiTW9kZWw7XG5cbn0pKEJhY2tib25lLk1vZGVsKTtcbiIsInZhciBUYWJzVmlldywgbm9EYXRhVGVtcGxhdGUsIHRhYkNvbnRlbnRUZW1wbGF0ZSwgdGFiSXRlbVRlbXBsYXRlLCB0ZW1wbGF0ZSwgX3JlZixcbiAgX19iaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfSxcbiAgX19oYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gIF9fZXh0ZW5kcyA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoX19oYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9O1xuXG5leHBvcnRzLlRhYnNWaWV3ID0gVGFic1ZpZXcgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gIF9fZXh0ZW5kcyhUYWJzVmlldywgX3N1cGVyKTtcblxuICBmdW5jdGlvbiBUYWJzVmlldygpIHtcbiAgICB0aGlzLm5vRGF0YSA9IF9fYmluZCh0aGlzLm5vRGF0YSwgdGhpcyk7XG4gICAgdGhpcy5fc2V0QWN0aXZlVGFiID0gX19iaW5kKHRoaXMuX3NldEFjdGl2ZVRhYiwgdGhpcyk7XG4gICAgdGhpcy5fZ2V0VGFiQ29udGVudCA9IF9fYmluZCh0aGlzLl9nZXRUYWJDb250ZW50LCB0aGlzKTtcbiAgICB0aGlzLl9vblRhYlNlbGVjdCA9IF9fYmluZCh0aGlzLl9vblRhYlNlbGVjdCwgdGhpcyk7XG4gICAgdGhpcy5yZW5kZXJUYWJzID0gX19iaW5kKHRoaXMucmVuZGVyVGFicywgdGhpcyk7XG4gICAgdGhpcy5yZW5kZXIgPSBfX2JpbmQodGhpcy5yZW5kZXIsIHRoaXMpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZSA9IF9fYmluZCh0aGlzLmluaXRpYWxpemUsIHRoaXMpO1xuICAgIF9yZWYgPSBUYWJzVmlldy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gX3JlZjtcbiAgfVxuXG4gIFRhYnNWaWV3LnByb3RvdHlwZS50YWJzQ29sbGVjdGlvbiA9IG51bGw7XG5cbiAgVGFic1ZpZXcucHJvdG90eXBlLmVsZW1lbnQgPSBudWxsO1xuXG4gIFRhYnNWaWV3LnByb3RvdHlwZS5jbGFzc05hbWUgPSAndGFicy1kZW1vLWNsYXNzJztcblxuICBUYWJzVmlldy5wcm90b3R5cGUuZXZlbnRzID0ge1xuICAgICdjbGljayAudGFicy1saXN0IGxpJzogJ19vblRhYlNlbGVjdCdcbiAgfTtcblxuICBUYWJzVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnRhYnNDb2xsZWN0aW9uID0gb3B0aW9ucy50YWJzQ29sbGVjdGlvbjtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy50YWJzQ29sbGVjdGlvbiwgJ2NoYW5nZTphY3RpdmUnLCB0aGlzLl9zZXRBY3RpdmVUYWIpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlcigpO1xuICB9O1xuXG4gIFRhYnNWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRlbC5odG1sKHRlbXBsYXRlKCkpO1xuICAgIHRoaXMuZWxlbWVudC5hcHBlbmQodGhpcy4kZWwpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlclRhYnMoKTtcbiAgfTtcblxuICBUYWJzVmlldy5wcm90b3R5cGUucmVuZGVyVGFicyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgY29uc29sZS5sb2codGhpcy50YWJzQ29sbGVjdGlvbik7XG4gICAgaWYgKHRoaXMudGFic0NvbGxlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YWJzQ29sbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKG1vZGVsLCBpKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy4kKCcudGFicy1saXN0JykuYXBwZW5kKHRhYkl0ZW1UZW1wbGF0ZShtb2RlbCwgaSkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm5vRGF0YSgpO1xuICAgIH1cbiAgfTtcblxuICBUYWJzVmlldy5wcm90b3R5cGUuX29uVGFiU2VsZWN0ID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciBpZDtcbiAgICBpZCA9ICQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdkYXRhLWlkJyk7XG4gICAgdGhpcy50YWJzQ29sbGVjdGlvbi5zZXRBY3RpdmVUYWIoaWQpO1xuICAgIHJldHVybiB0aGlzLl9nZXRUYWJDb250ZW50KGlkKTtcbiAgfTtcblxuICBUYWJzVmlldy5wcm90b3R5cGUuX2dldFRhYkNvbnRlbnQgPSBmdW5jdGlvbihpZCkge1xuICAgIHZhciBjb250ZW50O1xuICAgIGNvbnRlbnQgPSB0aGlzLnRhYnNDb2xsZWN0aW9uLmdldFRhYkNvbnRlbnQoaWQpO1xuICAgIHJldHVybiB0aGlzLiQoJy50YWItY29udGVudCcpLmh0bWwodGFiQ29udGVudFRlbXBsYXRlKGNvbnRlbnQpKTtcbiAgfTtcblxuICBUYWJzVmlldy5wcm90b3R5cGUuX3NldEFjdGl2ZVRhYiA9IGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgdGhpcy4kKCcudGFicy1saXN0IGxpJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHJldHVybiB0aGlzLiQoJy50YWJzLWxpc3QgbGknKS5lcSh0aGlzLnRhYnNDb2xsZWN0aW9uLmluZGV4T2YobW9kZWwpKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gIH07XG5cbiAgVGFic1ZpZXcucHJvdG90eXBlLm5vRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLiQoJy50YWJzLWxpc3QnKS5hcHBlbmQobm9EYXRhVGVtcGxhdGUoKSk7XG4gIH07XG5cbiAgcmV0dXJuIFRhYnNWaWV3O1xuXG59KShCYWNrYm9uZS5WaWV3KTtcblxudGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFwiPGgxPlRhYnMgRGVtbyBWaWV3PC9oMT5cXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTNcXFwiPlxcbiAgICA8dWwgY2xhc3M9XFxcInRhYnMtbGlzdFxcXCI+PC91bD5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTlcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ0YWItY29udGVudFxcXCI+PC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cIjtcbn07XG5cbnRhYkl0ZW1UZW1wbGF0ZSA9IGZ1bmN0aW9uKG1vZGVsLCBpKSB7XG4gIHZhciBuYW1lO1xuICBuYW1lID0gbW9kZWwuZ2V0KCduYW1lJyk7XG4gIHJldHVybiBcIjxsaSBkYXRhLWlkPVxcXCJcIiArIGkgKyBcIlxcXCI+XCIgKyBuYW1lICsgXCI8L2xpPlwiO1xufTtcblxudGFiQ29udGVudFRlbXBsYXRlID0gZnVuY3Rpb24oY29udGVudCkge1xuICB2YXIgZGV0YWlscztcbiAgZGV0YWlscyA9IGNvbnRlbnQuZ2V0KCdkZXRhaWxzJyk7XG4gIHJldHVybiBcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtM1xcXCI+XFxuICA8aW1nIGNsYXNzPVxcXCJsb2dvXFxcIiBzcmM9XFxcIlwiICsgKGNvbnRlbnQuZ2V0KCdsb2dvJykpICsgXCJcXFwiIC8+XFxuICA8L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XFxcImNvbC1tZC01XFxcIj5cXG4gICAgPHAgY2xhc3M9XFxcImRlc2NyaXB0aW9uXFxcIj5cIiArIGRldGFpbHMuZGVzY3JpcHRpb24gKyBcIjwvcD5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTRcXFwiPlxcbiAgICA8YXNpZGU+XFxuICAgICAgPHA+PGk+RGV2ZWxvcGVyOjwvaT4gXCIgKyBkZXRhaWxzLmRldmVsb3BlciArIFwiPC9wPlxcbiAgICAgIDxwPjxpPkluaXRpYWwgcmVsZWFzZTo8L2k+IFwiICsgZGV0YWlscy5pbml0aWFsX3JlbGVhc2UgKyBcIjwvcD5cXG4gICAgICA8cD48aT5TdGFibGUgcmVsZWFzZTo8L2k+IFwiICsgZGV0YWlscy5zdGFibGVfcmVsZWFzZSArIFwiPC9wPlxcbiAgICAgIDxwPjxpPlN0YXR1czo8L2k+IFwiICsgZGV0YWlscy5zdGF0dXMgKyBcIjwvcD5cXG4gICAgICA8cD48aT5Xcml0dGVuIGluOjwvaT4gXCIgKyBkZXRhaWxzLndyaXR0ZW5faW4gKyBcIjwvcD5cXG4gICAgICA8cD48aT5PcGVyYXRpbmcgc3lzdGVtOjwvaT4gXCIgKyBkZXRhaWxzLm9wZXJhdGluZ19zeXN0ZW0gKyBcIjwvcD5cXG4gICAgICA8cD5cXG4gICAgICAgIDxpPlNpemU6PC9pPlxcbiAgICAgICAgPHAgY2xhc3M9XFxcImlubmVyXFxcIj5kZXZlbG9wbWVudDogXCIgKyBkZXRhaWxzLnNpemUuZGV2ZWxvcG1lbnQgKyBcIjwvcD5cXG4gICAgICAgIDxwIGNsYXNzPVxcXCJpbm5lclxcXCI+cHJvZHVjdGlvbjogXCIgKyBkZXRhaWxzLnNpemUucHJvZHVjdGlvbiArIFwiPC9wPlxcbiAgICAgIDwvcD5cXG4gICAgICA8cD48aT5UeXBlOjwvaT4gXCIgKyBkZXRhaWxzLnR5cGUgKyBcIjwvcD5cXG4gICAgICA8cD48aT5MaWNlbnNlOjwvaT4gXCIgKyBkZXRhaWxzLmxpY2Vuc2UgKyBcIjwvcD5cXG4gICAgICA8cCBjbGFzcz1cXFwid2Vic2l0ZVxcXCI+PGk+V2Vic2l0ZTo8L2k+IDxhIGhyZWY9XFxcIlwiICsgZGV0YWlscy53ZWJzaXRlICsgXCJcXFwiPlwiICsgZGV0YWlscy53ZWJzaXRlICsgXCI8L2E+PC9wPlxcbiAgICA8L2FzaWRlPlxcbiAgPC9kaXY+XFxuPC9kaXY+XCI7XG59O1xuXG5ub0RhdGFUZW1wbGF0ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXCI8aDQ+Tm90aGluZyB0byBzaG93PC9oND5cIjtcbn07XG4iXX0=
;