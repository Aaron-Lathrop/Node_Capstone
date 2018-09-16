'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://mongodb://<dbuser>:<dbpassword>@ds151402.mlab.com:51402/interview-prep';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-interview-app';
exports.PORT = process.env.PORT || 8080;