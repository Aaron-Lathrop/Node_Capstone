'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://demo:demo123@ds151402.mlab.com:51402/interview-prep';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://demo:demo123@ds131973.mlab.com:31973/test-interview-prep';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';