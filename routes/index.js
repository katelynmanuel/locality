const express = require('express');
const passport = require('passport');
const Vue = require('vue');
var slicksort = require('vue-slicksort');
var ContainerMixin = slicksort.ContainerMixin;
var ElementMixin = slicksort.ElementMixin;
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
// Loading dotenv file. 
require('dotenv').config();


/* GET Index page. */
router.get('/', function (req, res) {
	res.render('index', { title: 'Locality: Find You Neighborhood' });
});

router.get('/login', passport.authenticate('auth0', {
	scope: 'openid email profile'
}), function (req, res) {
	res.redirect('/');
});

router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/callback',
	passport.authenticate('auth0', {
		failureRedirect: '/failure'
	}),
	function (req, res) {
		req.user.randomField = 'Some SHit';
		res.redirect(req.session.returnTo || '/users');
	}
);

router.get('/failure', function (req, res) {
	var error = req.flash('error');
	var error_description = req.flash('error_description');
	req.logout();
	res.render('failure', {
		error: error[0],
		error_description: error_description[0],
	});
});

router.get('/user', ensureLoggedIn, function (req, res) {
	res.render('user', {
		user: req.user,
		userProfile: JSON.stringify(req.user, null, '  ')
	});
});

router.get('/home', function (req, res) {
	res.render('home', { title: 'Locality: Find Your Neighborhood' });
});


module.exports = router;
