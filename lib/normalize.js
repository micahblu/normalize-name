
exports.normalize = function(filename, opts){
	
	var normalized = filename.trim();

	if(opts === null || opts === ''){
		return filename;
	}
	if(opts.replace){
		var replace = [], regex;
		opts.replace.forEach(function(replacePattern){

			replace = replacePattern.split("|");
				
			regex = new RegExp(replace[0], "g");

			normalized = normalized.replace(regex, replace[1] || '');
		});
	}

	if(opts.capitalize === 'first'){
		normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);
	}else if(opts.capitalize === 'all'){

		var tmp = '';
		normalized.split(' ').forEach(function(word){
			tmp += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
		});
		normalized = tmp.trim();
	}

	return normalized;
}