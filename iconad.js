/**
 * Created by Andriy on 02.02.2015.
 */
var fs = require('fs-extra');
var async = require('async');
var path = require('path');
var gm = require('gm').subClass({ imageMagick: true });

/**
 * Checks whether right parameters are given
 * @param image
 * @param output_folder
 */
function checkParams(image, output_folder, callback) {
    fs.stat(image, function(err, stat){
        if(err) return callback(err);

        if(!stat.isFile()) {
            return callback(new Error(image + " should be a file"));
        }

        fs.stat(output_folder, function(err, stat){
            if(err) return callback(err);

            if(!stat.isDirectory()) {
                return callback(new Error(output_folder + " should be a directory"));
            }
            return callback(null);
        });
    });
}


function produceIcons(image, output_folder, sizes, callback) {
    function produceIcon(size, callback) {
        var dir = path.join(output_folder, size.name);
        fs.ensureDir(path.dirname(dir), function(err){
            if(err) return callback(err);

            var width = size.size;
            gm(image).thumb(width, width, dir, 100, callback)
        });
    }

    checkParams(image, output_folder, function(err){
        if(err) return callback(err);

        async.eachSeries(sizes, produceIcon, callback);
    });
}

function createAndroidIcons(image, output_folder, callback) {
    var sizes = [
        {
            "size": 72,
            "name": "drawable-hdpi/icon.png"
        },
        {
            "size": 32,
            "name": "drawable-ldpi/icon.png"
        },
        {
            "size": 48,
            "name": "drawable-mdpi/icon.png"
        },
        {
            "size": 96,
            "name": "drawable-xhdpi/icon.png"
        }
    ];
    produceIcons(image, output_folder, sizes, callback);
}

function createIOSIcons(image, output_folder, callback) {
    var sizes = [
        {
            "size": 57,
            "name": "Icon-57.png"
        },
        {
            "size": 72,
            "name": "Icon-72.png"
        },
        {
            "size": 76,
            "name": "Icon-76.png"
        },
        {
            "size": 114,
            "name": "Icon-114.png"
        },
        {
            "size": 120,
            "name": "Icon-120.png"
        },
        {
            "size": 144,
            "name": "Icon-144.png"
        },
        {
            "size": 152,
            "name": "Icon-152.png"
        }
    ];
    produceIcons(image, output_folder, sizes, callback);
}

exports.createAndroidIcons = createAndroidIcons;
exports.createIOSIcons = createIOSIcons;