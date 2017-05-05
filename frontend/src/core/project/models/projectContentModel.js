// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {

  var Backbone = require('backbone');
  var Origin = require('coreJS/app/origin');

  var ProjectContentModel = Backbone.Model.extend({

    initialize: function(attrs, options) {
      this._id = attrs._id;
      this._projectId = attrs._projectId;

      switch (attrs._type) {
        case 'page':
          this._children = 'articles';
          break;
        case 'article':
          this._children = 'blocks';
          break;
        case 'block':
          this._children = 'components';
          break;
        case 'component':
          this._children = false;
          break;
      }
    },

    getChildren: function() {
      if (Origin.project[this._projectId][this._children]) {
        var children = Origin.project[this._projectId][this._children].where({_parentId: this._id});
        var childrenCollection = new Backbone.Collection(children);
        return childrenCollection;
      } else {
        return null;
      }
    }

  });

  return ProjectContentModel;
});