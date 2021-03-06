Package.describe({
    name: 'mud-tinytest',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.3');
    api.addFiles('mud-tinytest.js');
});

Package.onTest(function (api) {
    api.use(['tinytest','test-helpers','underscore']);

    api.addFiles([
       '../../lib/000__.js',
       '../../lib/item.js',
       '../../lib/monster.js',
       '../../lib/room.js',
       '../../lib/player.js',
       '../../lib/dungeon.js',
    ]);
    api.addFiles(['mud-tinytest.js','mud-tinytest-tests.js']);
});
