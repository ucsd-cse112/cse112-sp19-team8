module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['test/testCarousel.js',
      'test/testCoreHello.js',
      'test/testRippleButton.js',
      'test/testTimelineItem.js',
      'test/testTimeline.js',
      'public/Carousel/carousel.js',
      'public/CoreHello/core_hello.js',
      'public/RippleButton/ripple_button.js',
      'public/Timeline/timeline.js',
      'public/Timeline/timeline-item.js'],
    reporters: ['progress'],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity
  })
}
