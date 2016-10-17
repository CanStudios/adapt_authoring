
// copy.js
var loginModule = require("./login");
var num;
//tests the course editor
casper.test.begin('Testing copying a course', 3, function suite(test) {
    loginModule.login();
    casper.then(function() {
	    this.wait(500, function() {});

    });

    casper.then(function() {
    	casper.test.comment("Testing copy");
    });

    casper.then(function() {
    	casper.capture("./test_frontend/img/copy/01-on home page.png");
    });

    //checks if menu exists and opens it
    casper.then(function() {
        test.assertExists("a[class='open-context-icon open-context-course']", "Edit button exists");
    });

    casper.then(function() {
        this.click("a[class='open-context-icon open-context-course']");
        casper.capture("./test_frontend/img/copy/02-submenu open.png");
        this.click('.context-menu-item:nth-child(3) > a.context-menu-item-open');
        this.wait(2000, function() {
        casper.capture("./test_frontend/img/copy/copy_page_opened.png");
      });

    });

    // casper.then(function() {
    // 	casper.capture("./test_frontend/img/copy/02-submenu open.png");
    // 	test.assertExists("div.context-menu-item:nth-child(2) > a:nth-child(1) > div:nth-child(1) > h5:nth-child(1)", "Submenu is open ");
    // });

    //clicks on the "Copy" item in the submenu
    // casper.then(function() {
    //     var x = require('casper').selectXPath;
		// this.click(x('//h5[text()="Copy"]'));
    // });
    //
    // casper.then(function() {
    //     this.wait(1000, function() {
    //         this.capture("./test_frontend/img/copy/03-copy menu.png");
    //         test.assertExists("#projectDetailTitle", "Copy rename/description page open ");
    //     });
    // });

    //submits the duplicate project without making any changes- name defaults to "Copy of X"
    // casper.then(function() {
    //     this.wait(1000, function() {
		// this.click(".editor-project-edit-sidebar-save");
    //     });
    // });
    //
    // casper.then(function() {
    // 	this.wait(1000, function() {
    // 		casper.capture("./test_frontend/img/copy/04-copy results.png");
    // 	});
    // });

    casper.run(function() {
        test.done();
    });
});
