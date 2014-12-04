
/**
 * Module dependencies.
 */

var exec = require('child_process').exec
  , fs = require('fs')
  , path = require('path');

describe('component', function(){
  it('should output help', function(done){
    exec('bin/component', function(err, stdout){
      if (err) return done(err);
      stdout.should.containEql('component <command> [options]');
      stdout.should.containEql('--help');
      stdout.should.containEql('Commands:');
      stdout.should.containEql('install');
      stdout.should.containEql('create');
      stdout.should.containEql('search');
      stdout.should.containEql('info');
      stdout.should.containEql('convert');
      stdout.should.containEql('ls');
      done();
    })
  })
})
