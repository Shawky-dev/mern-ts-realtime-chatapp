"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => {
    res.send('signup');
});
router.post('/login', (req, res) => {
    res.send('login');
});
router.get('/logout', (req, res) => {
    res.send('logout');
});
