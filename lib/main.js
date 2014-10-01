(function(){

	var fs = require('fs');
	var norm = require('./normalize');
	var dir = process.argv[2];

	var flags = {};
	process.argv.forEach(function(arg){
		if(arg.charAt(0) == '-'){
			flags[arg.substr(1, arg.indexOf("=")-1)] = arg.substr(arg.indexOf("=")+1);
		}
	});

	if(dir === "" || dir == null){
		console.log('Please enter a path');
		return false;
	}
	fs.exists(dir, function(exists){

		if(!exists) {
			console.log("Invalid path");
			return false;
		}
		var path = flags.dir ? flags.dir : dir;
		fs.exists(path, function(exists){
			if(!exists){
				fs.mkdir(path, function(e){
					console.log(e);
				});
			}
		});

		if(fs.lstatSync(dir).isDirectory()){
			var files = fs.readdirSync(dir), newfilenamem;

		  for(var i in files){
		    if(!files.hasOwnProperty(i)) continue;
		    if(flags.exclude && flags.exclude.split(",").indexOf(files[i]) > -1) continue;
		  	rename(dir + files[i], path + '/' + normalize(files[i]));
		  }
		}else{
			var filename = dir.substr(dir.lastIndexOf("/")+1);
			newfilename = normalize(path+'/'+filename);
		}
	});

	function rename(existing, newname){
		console.log('renameing ' + existing + ' to ' + newname);
		fs.rename(existing, newname, function(err) {
	    if ( err ) console.log('ERROR: ' + err);
		});
	}

	function normalize(filename){
		var replace = flags.replace ? flags.replace.split(',') : null;
		return norm.normalize(filename, {
		    	replace: replace,
		    	capitalize: flags.cap || 'none',
		    	uppercase: true
		    });
	}

}).call(this);