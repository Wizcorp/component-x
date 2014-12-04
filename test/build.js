
/**
 * Module dependencies.
 */

var exec = require('child_process').exec
  , bin = __dirname + '/../bin/component'
  , path = require('path')
  , fs = require('fs')
  , vm = require('vm')

describe('component build', function(){
  it('should build', function(done){
    exec('cd test/fixtures/path && ' + bin + '-build -v', function(err, stdout){
      if (err) return done(err);
      stdout.should.containEql('build/build.js');
      stdout.should.containEql('duration');
      stdout.should.containEql('css');
      stdout.should.containEql('js');

      var js = fs.readFileSync('test/fixtures/path/build/build.js', 'utf8');
      var ret = vm.runInNewContext(js + '; require("foo")');
      ret.should.equal('baz');

      var ret = vm.runInNewContext(js + '; require("baz")');
      ret.should.equal('baz');

      done();
    })
  })

  it('should require middleware with relative path', function(done){
    exec('cd test/fixtures/path && ' + bin + '-build -v -u ../plugin', function(err, stdout){
      if (err) return done(err);
      stdout.should.containEql('middleware fired!');
      done();
    })
  })

  it('should require middleware with absolute path', function(done){
    var plugin = path.join(__dirname, 'fixtures', 'plugin');
    exec('cd test/fixtures/path && ' + bin + '-build -v -u ' + plugin, function(err, stdout){
      if (err) return done(err);
      stdout.should.containEql('middleware fired!');
      done();
    })
  })

  it('should exclude the js file if no scripts, and the css file if no styles', function(done){
    exec('cd test/fixtures/no-js-css && ' + bin + '-build -v', function(err, stdout){
      if (err) return done(err);
      stdout.should.not.containEql('js :');
      stdout.should.not.containEql('css :');
      done();
    });
  });
})
