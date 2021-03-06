/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('all feeds has a URL and URL is not empty', function() {
           for (let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('all feeds has a name and name is not empty', function() {
           for (let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {
      /* Test that ensures the menu element is
       * hidden by default.
       */
       it('Menu element is hidden by default', function() {
         const body = $('body');
         expect(body.hasClass('menu-hidden')).toBe(true);
       });

       /* Test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('Menu display when clicked, hide when clicked again', function () {
          const body = $('body');
          const menu = $('.menu-icon-link');
          menu.click();
          expect(body.hasClass('menu-hidden')).toBe(false);
          menu.click();
          expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function () {

      beforeEach(function(done) {
        loadFeed(0, done);
      });

      /* Test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
       it('When loadFeed, there is .entry in .feed', function() {
         const feed = document.querySelector('.feed');
         expect(feed.children.length > 0).toBe(true);
       });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      const feed = document.querySelector('.feed');
      let feedAfterFirstLoad = [];
      let feedAfterSecondLoad = [];

      beforeEach(function (done) {
        loadFeed(0, function() {
          Array.from(feed.children).forEach(function(entry) {
            feedAfterFirstLoad.push(entry.innerText);
          });
          loadFeed(1, function() {
            Array.from(feed.children).forEach(function(entry) {
              feedAfterSecondLoad.push(entry.innerText);
            });
            done();
          });
        });

      });

      /* Test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       it('when a new feed is loaded, content changes', function() {
         expect(feedAfterFirstLoad).not.toEqual(feedAfterSecondLoad);
       });
    });
}());
