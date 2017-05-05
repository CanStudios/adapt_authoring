// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {

  var Origin = require('coreJS/app/origin');
  var DashboardView = require('coreJS/dashboard/views/dashboardView');
  var DashboardSidebarView = require('coreJS/dashboard/views/dashboardSidebarView');
  var MyProjectCollection = require('coreJS/project/collections/myProjectCollection');
  var SharedProjectCollection = require('coreJS/project/collections/sharedProjectCollection');
  var TagsCollection = require('coreJS/tags/collections/tagsCollection');

  var ProjectContentModel = require('coreJS/project/models/projectContentModel');
  var ProjectContentCollection = require('coreJS/project/collections/projectContentCollection');

  Origin.on('router:dashboard', function(location, subLocation, action) {

    Origin.tap('dashboard', function() {
    
      Origin.editor = {};
      Origin.editor.data = {};
      
      Origin.trigger('location:title:update', {title: 'Dashboard - viewing my courses'});
      Origin.options.addItems([
        {
          title: window.polyglot.t('app.grid'),
          icon: 'th',
          callbackEvent: 'dashboard:layout:grid',
          value: 'grid',
          group: 'layout',
        }, {
          title: window.polyglot.t('app.list'),
          icon: 'list',
          callbackEvent: 'dashboard:layout:list',
          value: 'list',
          group: 'layout'
        },
        {
          title: window.polyglot.t('app.ascending'),
          icon: 'sort-alpha-asc',
          callbackEvent: 'dashboard:sort:asc',
          value: 'asc',
          group: 'sort'
        }, {
          title: window.polyglot.t('app.descending'),
          icon: 'sort-alpha-desc',
          callbackEvent: 'dashboard:sort:desc',
          value: 'desc',
          group: 'sort'
        }, {
          title: window.polyglot.t('app.recent'),
          icon: 'edit',
          callbackEvent: 'dashboard:sort:updated',
          value: 'updated',
          group: 'sort'
        }
      ]);

      var tagsCollection = new TagsCollection();

      tagsCollection.fetch({
        success: function() {
          Origin.sidebar.addView(new DashboardSidebarView({collection:tagsCollection}).$el);
          var dashboardType = location || 'all';
          Origin.trigger('dashboard:loaded', { type: dashboardType });
        },
        error: function() {
          console.log('Error occured getting the tags collection - try refreshing your page');
        }
      });

    });

  });
  
  Origin.on('dashboard:loaded', function (options) {
    switch (options.type) {
      case 'shared':
        Origin.trigger('location:title:update', {title: 'Dashboard - viewing shared courses'});
        var sharedProjectCollection = new SharedProjectCollection;
        sharedProjectCollection.fetch({
          success: function() {
            sharedProjectCollection.each(function(project) {
              setUpProjectData(project);
            })
          }
        });
        Origin.router.createView(DashboardView, {collection: sharedProjectCollection});
        break;
      case 'all':
        Origin.trigger('location:title:update', {title: 'Dashboard - viewing my courses'});
        var myProjectCollection = new MyProjectCollection;
        myProjectCollection.fetch({
          success: function() {
            myProjectCollection.each(function(project) {
              setUpProjectData(project);
            });
          }
        });
        Origin.router.createView(DashboardView, {collection: myProjectCollection});
      default:
        break;
    }
  });

  Origin.on('globalMenu:dashboard:open', function() {

    Origin.router.navigate('#/dashboard', {trigger: true});

  });

  var globalMenuObject = {
    "location": "global",
    "text": "Dashboard",
    "icon": "fa-home",
    "callbackEvent": "dashboard:open",
    "sortOrder": 1
  };

  Origin.on('app:dataReady login:changed', function() {
    Origin.globalMenu.addItem(globalMenuObject);
  });

  function setUpProjectData(project) {
    Origin.project[project.id] = {};

    Origin.project[project.id].contentObjects = new ProjectContentCollection([], {
      model: ProjectContentModel,
      url: '/api/content/contentobject?_courseId=' + project.id,
      _type: 'contentObjects',
      _projectId: project.id
    });

    Origin.project[project.id].articles = new ProjectContentCollection(null, {
      model: ProjectContentModel,
      url: '/api/content/article?_courseId=' + project.id,
      _type: 'articles',
      _projectId: project.id
    });

    Origin.project[project.id].blocks = new ProjectContentCollection(null, {
      model: ProjectContentModel,
      url: '/api/content/block?_courseId=' + project.id,
      _type: 'blocks',
      _projectId: project.id
    });

    Origin.project[project.id].components = new ProjectContentCollection(null, {
      model: ProjectContentModel,
      url: '/api/content/component?_courseId=' + project.id,
      _type: 'components',
      _projectId: project.id
    });
  };

});
