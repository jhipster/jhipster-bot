'use strict';

var expect = require('chai').expect;
var assert = require('assert');
var api = require('../../lib/api/api');
var request = require('supertest');

describe('Publisher Router', () => {
    describe('When trying to publish when not authenticated', () => {
        it('POST /publisher/directory send an error 500', () => {
            var body = {};
            request(api)
                .post('/publisher/directory')
                .send()
                .expect(500)
        });
    });
});