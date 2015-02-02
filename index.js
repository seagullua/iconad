/**
 * Created by Andriy on 02.02.2015.
 */

var argv = require('minimist')(process.argv.slice(2));
var iconad = require('./iconad');

var platforms = {
    "android": iconad.createAndroidIcons,
    "ios": iconad.createIOSIcons
};

if(argv._.length != 2 || !argv.p) {
    console.error("USAGE: iconad -p android img.png output_folder");
    process.exit(1);
} else {
    var used_platform = argv.p;
    if(!(used_platform in platforms)) {
        console.error("Supported platforms are: ", Object.keys(platforms).join(', '));
        process.exit(1);
    } else {
        var fn = platforms[used_platform];
        fn(argv._[0], argv._[1], function(err){
            if(err) {
                console.error(err);
                process.exit(1);
            } else {
                process.exit(0);
            }
        });
    }


}

