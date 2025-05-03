import debug from 'debug';
import axios from 'axios';
import crypto from 'crypto';
import { Router } from 'express';
import { APIResponse, signToken } from '../../../services';
import {
    DISCORD_API_URL,
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI,
    BASE_URL,
} from '../../../constants';

const logger = debug('features:socialmedia:controller:core');
const route = Router();

route.get('/auth', async (req, res) => {
    try {
        const authUrl = new URL(`${DISCORD_API_URL}/oauth2/authorize`);
        authUrl.searchParams.append('client_id', DISCORD_CLIENT_ID);
        authUrl.searchParams.append('redirect_uri', DISCORD_REDIRECT_URI);
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append(
            'scope',
            'guilds guilds.members.read email identify'
        );

        const state = crypto.randomBytes(16).toString('hex');
        req.session.discordState = state;
        authUrl.searchParams.append('state', state);

        res.redirect(authUrl.toString());
    } catch (error) {
        logger('Error in auth discord:', error);
        res.status(500).json({
            code: 'features.socialmedia.discord.get.error',
            message: 'Error in auth discord',
            args: error,
            data: {},
        } as APIResponse);
    }
});

route.get('/auth/callback', async (req, res) => {
    try {
        const { code, state } = req.query;
        if (!code) {
            res.status(400).json({
                code: 'features.socialmedia.callback.error',
                message: 'Missing code parameter',
                args: {},
                data: {},
            } as APIResponse);
            return;
        }
        if (state !== req.session.discordState) {
            logger('Estado inválido, possível CSRF');
            res.status(400).json({
                code: 'features.socialmedia.auth.callback.error',
                message: 'Invalid state parameter',
                args: {},
                data: {},
            });
            return;
        }

        const params = new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: DISCORD_REDIRECT_URI,
        });

        const tokenResponse = await axios.post(
            'https://discord.com/api/oauth2/token',
            params,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const { access_token: accessToken } = tokenResponse.data;

        const sessionToken = signToken(accessToken);

        res.cookie('authToken', sessionToken, {
            maxAge: 24 * 60 * 60 * 1000, // 24h
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            path: '/',
        });

        res.header('Access-Control-Allow-Origin', BASE_URL);
        res.header('Access-Control-Allow-Credentials', 'true');

        res.redirect(BASE_URL);
    } catch (error) {
        logger('Error in callback discord:', error);
        res.redirect(BASE_URL);
    }
});

export { route };
